package com.criptonote.Crypto;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationManagerCompat;

import com.criptonote.R;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;


public class CryptoService extends Service {


    public static final String ACTION_ENCRYPT = "com.criptonote.Crypto.CryptoService.ENCRYPT";
    public static final String ACTION_DECRYPT = "com.criptonote.Crypto.CryptoService.DECRYPT";
    public static final String ACTION_STOP = "com.criptonote.Crypto.CryptoService.STOP";

    private static final int NOTIFICATION_ID_ENCRYPTING = 1;
    private static final int NOTIFICATION_ID_RESPONSE = 2;

    private NotificationManagerCompat notificationManagerCompat;
    private Notification.Builder serviceNotification;
    private final AtomicBoolean stopEncryption = new AtomicBoolean(false);


    private void createServiceNotification(String intentAction) {
        Intent intent = new Intent(this, CryptoService.class);
        intent.setAction(ACTION_STOP);
        PendingIntent pendingIntent = PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification.Action action = new Notification.Action(0, "Cancelar", pendingIntent);

        String text;
        if (intentAction.equals(ACTION_ENCRYPT)) {
            text = "Criptografando arquivo";
        } else {
            text = "Descriptografando arquivo";
        }

        serviceNotification = new Notification.Builder(getApplicationContext())
                .setSmallIcon(R.mipmap.ic_launcher) // TODO
                .setContentTitle("CriptoNote")
                .setContentText(text)
                .setProgress(0, 0, true)
                .addAction(action)
                .setOngoing(true);
    }

    private void sentResponseNotification(String text) {
        Notification responseNotification = new Notification.Builder(getApplicationContext())
                .setContentTitle("CriptoNote")
                .setContentText(text)
                .setSmallIcon(R.mipmap.ic_launcher) // TODO
                .build();

        notificationManagerCompat.notify(NOTIFICATION_ID_RESPONSE, responseNotification);
    }


    private String encryptFile(String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = Crypto.createEncryptCipher(Crypto.generateKey(bytePassword));

        String extension = Crypto.getFileExtension(filePath);
        String fileOutputPath = new File(
                getApplicationContext().getCacheDir(),
                UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherInputStream cipherInputStream = new CipherInputStream(fileInputStream, cipher)) {
                    byte[] dataRead = new byte[Crypto.BUFFER_SIZE];
                    int len = cipherInputStream.read(dataRead);
                    while (len > 0) {
                        if (stopEncryption.get()) {
                            return fileOutputPath;
                        }

                        fileOutputStream.write(dataRead, 0, len);
                        len = cipherInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        } catch (Exception e) {
            new File(fileOutputPath).delete();
            throw e;
        }
    }

    private String decryptFile(String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = Crypto.createDecryptCipher(Crypto.generateKey(bytePassword));

        String extension = Crypto.getFileExtension(filePath);
        String fileOutputPath = new File(
                getApplicationContext().getCacheDir(),
                UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {
                    byte[] dataRead = new byte[Crypto.BUFFER_SIZE];
                    int len = fileInputStream.read(dataRead);
                    while (len > 0) {
                        if (stopEncryption.get()) {
                            return fileOutputPath;
                        }

                        cipherOutputStream.write(dataRead, 0, len);
                        len = fileInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        } catch (Exception e) {
            new File(fileOutputPath).delete();
            throw e;
        }
    }


    private void moveFile(String source, String destiny) throws Exception {
        File fileSource = new File(source);
        FileInputStream fileInputStream = new FileInputStream(fileSource);
        FileOutputStream fileOutputStream = new FileOutputStream(destiny);
        fileInputStream.getChannel().transferTo(0, fileSource.length(), fileOutputStream.getChannel());
        fileSource.delete();
    }

    private void stop() {
        stopEncryption.set(true);
        stopForeground(true);
        stopSelf();
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent.getAction();

        if (action.equals(ACTION_STOP)) {
            stop();
            return START_STICKY;
        }

        String inputPath = intent.getStringExtra("inputPath");
        String outputPath = intent.getStringExtra("outputPath");
        String password = intent.getStringExtra("password");
        boolean deleteOriginalFile = intent.getBooleanExtra("deleteOriginalFile", false);

        notificationManagerCompat = NotificationManagerCompat.from(getApplicationContext());
        createServiceNotification(action);
        startForeground(NOTIFICATION_ID_ENCRYPTING, serviceNotification.build());

        switch (action) {
            case ACTION_ENCRYPT:
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            String outputEncryptedFile = encryptFile(inputPath, password);
                            if (stopEncryption.get()) {
                                new File(outputEncryptedFile).delete();
                                return;
                            }
                            moveFile(outputEncryptedFile, outputPath);
                            if (deleteOriginalFile) {
                                new File(inputPath).delete();
                            }

                            sentResponseNotification("Criptografia concluída");
                            stopForeground(true);
                            stopSelf();
                        } catch (Exception e) {
                            sentResponseNotification("Falha durante criptografia");
                            stopForeground(true);
                            stopSelf();
                        }
                    }
                }).start();
                break;
            case ACTION_DECRYPT:
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            String outputDecryptedFile = decryptFile(inputPath, password);
                            if (stopEncryption.get()) {
                                new File(outputDecryptedFile).delete();
                                return;
                            }
                            moveFile(outputDecryptedFile, outputPath);
                            if (deleteOriginalFile) {
                                new File(inputPath).delete();
                            }

                            sentResponseNotification("Descriptografia concluída");
                            stopForeground(true);
                            stopSelf();
                        } catch (Exception e) {
                            sentResponseNotification("Falha durante descriptografia");
                            stopForeground(true);
                            stopSelf();
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
