package com.criptonote.Crypto;

import android.content.Context;
import android.os.AsyncTask;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;


public class CryptoTask extends AsyncTask<CryptoTask.Params, long[], Void> {


    public static class Params {
        public Context context;
        public String filePath;
        public String password;
        public int operation;
        public OnEncryptionProgress onProgress;
        public OnEncryptionComplete onComplete;
        public OnEncryptionError onError;

        public static final int OPERATION_ENCRYPT = 0;
        public static final int OPERATION_DECRYPT = 1;

        public interface OnEncryptionProgress {
            void onEncryptionProgress(long current, long total);
        }

        public interface OnEncryptionComplete {
            void onEncryptionComplete(String fileOutputPath);
        }

        public interface OnEncryptionError {
            void onEncryptionError(String message);
        }
    }


    private final AtomicBoolean stopTask = new AtomicBoolean(false);
    private Params mParams;


    @Override
    protected Void doInBackground(Params... params) {
        mParams = params[0];

        new Thread(() -> {
            try {
                String fileOutputPath;
                switch (mParams.operation) {
                    case Params.OPERATION_ENCRYPT:
                        fileOutputPath = encryptFileAsync(mParams.filePath, mParams.password);
                        break;
                    case Params.OPERATION_DECRYPT:
                        fileOutputPath = decryptFileAsync(mParams.filePath, mParams.password);
                        break;
                    default:
                        throw new Exception("Invalid value for operation mode");
                }
                mParams.onComplete.onEncryptionComplete(fileOutputPath);
            } catch (Exception e) {
                e.printStackTrace();
                mParams.onError.onEncryptionError(e.getMessage());
            }
        }).start();

        return null;
    }

    @Override
    protected void onProgressUpdate(long[]... values) {
        super.onProgressUpdate(values);
        mParams.onProgress.onEncryptionProgress(values[0][0], values[0][1]);
    }


    public void stop() {
        stopTask.set(true);
    }


    private String encryptFileAsync(String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = Crypto.createEncryptCipher(Crypto.generateKey(bytePassword));

        String extension = Crypto.getFileExtension(filePath);
        String fileOutputPath = new File(mParams.context.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherInputStream cipherInputStream = new CipherInputStream(fileInputStream, cipher)) {
                    File fileInput = new File(filePath);
                    long current = 0;
                    long total = fileInput.length();

                    byte[] dataRead = new byte[16];
                    int len = cipherInputStream.read(dataRead);
                    while (len != -1) {
                        if (stopTask.get()) {
                            throw new Exception("File encryption interrupted");
                        }

                        fileOutputStream.write(dataRead);
                        current += len;
                        publishProgress(new long[] {current, total});
                        len = cipherInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        }
    }

    private String decryptFileAsync(String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = Crypto.createDecryptCipher(Crypto.generateKey(bytePassword));

        String extension = Crypto.getFileExtension(filePath);
        String fileOutputPath = new File(mParams.context.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherInputStream cipherInputStream = new CipherInputStream(fileInputStream, cipher)) {
                    File fileInput = new File(filePath);
                    long current = 0;
                    long total = fileInput.length();

                    byte[] dataRead = new byte[16];
                    int len = cipherInputStream.read(dataRead);
                    while (len != -1) {
                        if (stopTask.get()) {
                            throw new Exception("File decryption interrupted");
                        }

                        fileOutputStream.write(dataRead);
                        current += len;
                        publishProgress(new long[] {current, total});
                        len = cipherInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        }
    }
}
