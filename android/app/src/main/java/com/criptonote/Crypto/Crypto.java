package com.criptonote.Crypto;

import android.content.Context;
import android.util.Base64;

import androidx.annotation.Nullable;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.UUID;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class Crypto {


    public static final int BUFFER_SIZE = 1024 * 1024 * 5; // 5MB


    private @Nullable Context mContext = null;
    private @Nullable OnFileEncryptionIteration mOnFileEncryptionIteration = null;


    public void setContext(Context context) {
        mContext = context;
    }

    public void setOnFileEncryptionIteration(OnFileEncryptionIteration onFileEncryptionIteration) {
        mOnFileEncryptionIteration = onFileEncryptionIteration;
    }


    private static SecretKeySpec generateKey(byte[] password) throws Exception {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] hashedPassword = messageDigest.digest(password);
        return new SecretKeySpec(hashedPassword, "AES");
    }


    private static Cipher createCipher(SecretKeySpec key, int operation) throws Exception {
        IvParameterSpec iv = new IvParameterSpec(new byte[16]);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(operation, key, iv);
        return cipher;
    }

    private static Cipher createEncryptCipher(SecretKeySpec key) throws Exception {
        return createCipher(key, Cipher.ENCRYPT_MODE);
    }

    private static Cipher createDecryptCipher(SecretKeySpec key) throws Exception {
        return createCipher(key, Cipher.DECRYPT_MODE);
    }


    private static String getFileExtension(String filePath) {
        String fileName = new File(filePath).getName();
        String[] splitFileName = fileName.split("\\.");
        return "." + splitFileName[splitFileName.length - 1];
    }


    public static String sha256(String text) throws Exception {
        byte[] byteText = text.getBytes(StandardCharsets.UTF_8);

        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] hashedPassword = messageDigest.digest(byteText);

        return new String(hashedPassword);
    }


    public static String encryptString(String text, String password) throws Exception {
        if (text.equals("")) {
            return text;
        }

        if (password.equals("")) {
            return text;
        }

        byte[] byteText = text.getBytes(StandardCharsets.UTF_8);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec key = generateKey(bytePassword);
        Cipher cipher = createEncryptCipher(key);

        byte[] byteEncryptedText = cipher.doFinal(byteText);
        return Base64.encodeToString(byteEncryptedText, Base64.NO_WRAP);
    }

    public static String decryptString(String text, String password) throws Exception {
        if (text.equals("")) {
            return text;
        }

        if (password.equals("")) {
            return text;
        }

        byte[] byteText = Base64.decode(text, Base64.NO_WRAP);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec key = generateKey(bytePassword);
        Cipher cipher = createDecryptCipher(key);

        byte[] byteDecryptedText = cipher.doFinal(byteText);
        return new String(byteDecryptedText, StandardCharsets.UTF_8);
    }


    public @Nullable String encryptFile(String filePath, String password) throws Exception {
        if (mContext == null) {
            throw new Exception("Context is not set");
        }
        File fileFromFilePath = new File(filePath);
        if (!fileFromFilePath.exists()) {
            throw new Exception("File in filePath does not exists");
        }
        if (!fileFromFilePath.isFile()) {
            throw new Exception("filePath is not a file");
        }
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec key = generateKey(bytePassword);
        Cipher cipher = createEncryptCipher(key);

        String extension = getFileExtension(filePath);
        String fileOutputPath = new File(mContext.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        boolean shouldStop = false;
        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherInputStream cipherInputStream = new CipherInputStream(fileInputStream, cipher)) {
                    byte[] dataRead = new byte[BUFFER_SIZE];
                    int len = cipherInputStream.read(dataRead);

                    while (len > 0) {
                        if (mOnFileEncryptionIteration != null) {
                            shouldStop = mOnFileEncryptionIteration.shouldStop();
                        }
                        if (shouldStop) {
                            break;
                        }

                        fileOutputStream.write(dataRead, 0, len);
                        len = cipherInputStream.read(dataRead);
                    }
                }
            }

            if (shouldStop) {
                new File(fileOutputPath).delete();
                return null;
            }

            return fileOutputPath;
        } catch (Exception e) {
            new File(fileOutputPath).delete();
            throw e;
        }
    }

    public @Nullable String decryptFile(String filePath, String password) throws Exception {
        if (mContext == null) {
            throw new Exception("Context is not set");
        }
        File fileFromFilePath = new File(filePath);
        if (!fileFromFilePath.exists()) {
            throw new Exception("File in filePath does not exists");
        }
        if (!fileFromFilePath.isFile()) {
            throw new Exception("filePath is not a file");
        }
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        SecretKeySpec key = generateKey(bytePassword);
        Cipher cipher = createDecryptCipher(key);

        String extension = getFileExtension(filePath);
        String fileOutputPath = new File(mContext.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        boolean shouldStop = false;
        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {
                    byte[] dataRead = new byte[BUFFER_SIZE];
                    int len = fileInputStream.read(dataRead);

                    while (len > 0) {
                        if (mOnFileEncryptionIteration != null) {
                            shouldStop = mOnFileEncryptionIteration.shouldStop();
                        }
                        if (shouldStop) {
                            break;
                        }

                        cipherOutputStream.write(dataRead, 0, len);
                        len = fileInputStream.read(dataRead);
                    }
                }
            }

            if (shouldStop) {
                new File(fileOutputPath).delete();
                return null;
            }

            return fileOutputPath;
        } catch (Exception e) {
            new File(fileOutputPath).delete();
            throw e;
        }
    }
}


interface OnFileEncryptionIteration {
    boolean shouldStop();
}
