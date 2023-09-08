package com.criptonote.Crypto;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationManagerCompat;

import com.criptonote.R;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;


public class CryptoService extends Service {


    public static final String TAG = "CryptoService";
    public static final String ACTION_ENCRYPT = "com.criptonote.Crypto.CryptoService.ENCRYPT";
    public static final String ACTION_DECRYPT = "com.criptonote.Crypto.CryptoService.DECRYPT";
    public static final String ACTION_STOP = "com.criptonote.Crypto.CryptoService.STOP";


    private NotificationManagerCompat mNotificationManagerCompat;
    private static final int NOTIFICATION_ID_ENCRYPTION = 1;
    private static final String CHANNEL_ID_ENCRYPTION_SERVICE = "CHANNEL_ENCRYPTION_SERVICE";

    private final AtomicBoolean mStopEncryption = new AtomicBoolean(false);


    // TODO add internationalization
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void createNotificationChannels() {
        NotificationChannel channelEncryptionService = new NotificationChannel(
                CHANNEL_ID_ENCRYPTION_SERVICE,
                "Serviço de criptografia",
                NotificationManager.IMPORTANCE_DEFAULT);
        channelEncryptionService.setVibrationPattern(new long[]{0L});
    }

    // TODO add internationalization
    // TODO update notification icon
    private Notification createServiceNotification(String intentAction, String fileName) {
        Intent intent = new Intent(this, CryptoService.class);
        intent.setAction(ACTION_STOP);

        PendingIntent pendingIntent = PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Action action = new Notification.Action(0, "Cancelar", pendingIntent);

        String title = "";
        if (intentAction.equals(ACTION_ENCRYPT)) {
            title = "Criptografando arquivo";
        } else {
            title = "Descriptografando arquivo";
        }

        Notification.Builder encryptionServiceNotification = new Notification.Builder(getApplicationContext())
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(fileName)
                .setProgress(0, 0, true)
                .addAction(action)
                .setVibrate(new long[]{0L})
                .setOngoing(true);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            encryptionServiceNotification.setChannelId(CHANNEL_ID_ENCRYPTION_SERVICE);
        }

        return encryptionServiceNotification.build();
    }

    // TODO update notification icon
    private void sentResponseNotification(String title, String text) {
        Notification.Builder responseNotification = new Notification.Builder(getApplicationContext())
                .setContentTitle(title)
                .setContentText(text)
                .setSmallIcon(R.mipmap.ic_launcher);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            responseNotification.setChannelId(CHANNEL_ID_ENCRYPTION_SERVICE);
        }

        mNotificationManagerCompat.notify(UUID.randomUUID().hashCode(), responseNotification.build());
    }


    private String getFileName(String filePath) {
        return new File(filePath).getName();
    }

    private void moveFile(String source, String destiny) throws Exception {
        File fileSource = new File(source);
        FileInputStream fileInputStream = new FileInputStream(fileSource);
        FileOutputStream fileOutputStream = new FileOutputStream(destiny);
        fileInputStream.getChannel().transferTo(0, fileSource.length(), fileOutputStream.getChannel());
        fileSource.delete();
    }

    private void stop() {
        mStopEncryption.set(true);
        stopForeground(true);
        stopSelf();
    }


    // TODO add internationalization
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        mNotificationManagerCompat = NotificationManagerCompat.from(getApplicationContext());
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            this.createNotificationChannels();
        }

        String action = intent.getAction();
        if (action == null) {
            Log.w(TAG, "onStartCommand received null action");
            sentResponseNotification("Erro no serviço de criptografia", "Não foi possível inicar o serviço de criptografia, há dados inválidos");
            return START_NOT_STICKY;
        }

        String inputPath = intent.getStringExtra("inputPath");
        String outputPath = intent.getStringExtra("outputPath");
        String password = intent.getStringExtra("password");
        boolean deleteOriginalFile = intent.getBooleanExtra("deleteOriginalFile", true);

        if (inputPath == null || outputPath == null || password == null) {
            Log.w(TAG, "onStartCommand received null values in the intent");
            sentResponseNotification("Erro no serviço de criptografia", "Não foi possível inicar o serviço de criptografia, há dados faltando");
            return START_NOT_STICKY;
        }

        String inputFileName = getFileName(inputPath);
        Notification serviceNotification = this.createServiceNotification(action, inputFileName);
        startForeground(NOTIFICATION_ID_ENCRYPTION, serviceNotification);

        Crypto crypto = new Crypto();
        crypto.setContext(getApplicationContext());
        crypto.setOnFileEncryptionIteration(new OnFileEncryptionIteration() {
            @Override
            public boolean shouldStop() {
                return mStopEncryption.get();
            }
        });

        switch (action) {
            case ACTION_ENCRYPT:
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            @Nullable String outputEncryptedFile = crypto.encryptFile(inputPath, password);
                            String fileName = getFileName(inputPath);

                            if (outputEncryptedFile == null) {
                                sentResponseNotification("Criptografia cancelada", fileName);
                                stop();
                                return;
                            }

                            moveFile(outputEncryptedFile, outputPath);
                            if (deleteOriginalFile) {
                                new File(inputPath).delete();
                            }

                            sentResponseNotification("Criptografia concluída", fileName);
                            stop();
                        } catch (Exception e) {
                            Log.e(TAG, "Error in file encryption thread: " + e.getMessage());

                            String fileName = getFileName(inputPath);
                            sentResponseNotification("Erro criptografando arquivo", fileName);
                            stop();
                        }
                    }
                }).start();
                break;
            case ACTION_DECRYPT:
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            @Nullable String outputDecryptedFile = crypto.decryptFile(inputPath, password);
                            String fileName = getFileName(inputPath);

                            if (outputDecryptedFile == null) {
                                sentResponseNotification("Descriptografia cancelada", fileName);
                                stop();
                                return;
                            }

                            moveFile(outputDecryptedFile, outputPath);
                            if (deleteOriginalFile) {
                                new File(inputPath).delete();
                            }

                            sentResponseNotification("Descriptografia concluída", fileName);
                            stop();
                        } catch (Exception e) {
                            Log.e(TAG, "Error in file decryption thread: " + e.getMessage());

                            String fileName = getFileName(inputPath);
                            sentResponseNotification("Erro descriptografando arquivo", fileName);
                            stop();
                        }
                    }
                }).start();
                break;
        }

        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
