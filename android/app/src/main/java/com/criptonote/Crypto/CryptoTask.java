package com.criptonote.Crypto;

import android.os.AsyncTask;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;


public class CryptoTask extends AsyncTask<CryptoTaskParams, long[], Void> {


    private final AtomicBoolean stopTask = new AtomicBoolean(false);
    private CryptoTaskParams mParams;


    @Override
    protected Void doInBackground(CryptoTaskParams... params) {
        mParams = params[0];

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String fileOutputPath;
                    switch (mParams.operation) {
                        case CryptoTaskParams.OPERATION_ENCRYPT:
                            fileOutputPath = encryptFile(mParams.filePath, mParams.password);
                            break;
                        case CryptoTaskParams.OPERATION_DECRYPT:
                            fileOutputPath = decryptFile(mParams.filePath, mParams.password);
                            break;
                        default:
                            throw new Exception("Unknown value for encryption operation");
                    }
                    mParams.onComplete.onEncryptionComplete(fileOutputPath);
                } catch (Exception e) {
                    e.printStackTrace();
                    mParams.onError.onEncryptionError(e.getMessage());
                }
            }
        }).start();

        return null;
    }

    @Override
    protected void onProgressUpdate(long[]... values) {
        mParams.onProgress.onEncryptionProgress(values[0][0], values[0][1]);
    }


    public void stop() {
        stopTask.set(true);
    }


    private String encryptFile(String filePath, String password) throws Exception {
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

                    byte[] dataRead = new byte[Crypto.BUFFER_SIZE];
                    int len = cipherInputStream.read(dataRead);
                    while (len > 0) {
                        if (stopTask.get()) {
                            throw new Exception("File encryption interrupted");
                        }

                        fileOutputStream.write(dataRead, 0, len);
                        current += len;
                        publishProgress(new long[] {current, total});
                        len = cipherInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        } catch (Exception e) {
            File fileOutput = new File(fileOutputPath);
            fileOutput.delete();
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
        String fileOutputPath = new File(mParams.context.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {
                    File fileInput = new File(filePath);
                    long current = 0;
                    long total = fileInput.length();

                    byte[] dataRead = new byte[Crypto.BUFFER_SIZE];
                    int len = fileInputStream.read(dataRead);
                    while (len > 0) {
                        if (stopTask.get()) {
                            throw new Exception("File encryption interrupted");
                        }

                        cipherOutputStream.write(dataRead, 0, len);
                        current += len;
                        publishProgress(new long[] {current, total});
                        len = fileInputStream.read(dataRead);
                    }

                    return fileOutputPath;
                }
            }
        } catch (Exception e) {
            File fileOutput = new File(fileOutputPath);
            fileOutput.delete();
            throw e;
        }
    }
}
