package com.criptonote.Crypto;

import android.content.Context;
import android.util.Base64;

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


    // 1024 * 512 = 0.5MB
    public static final int BUFFER_SIZE = 1024 * 512;


    public static SecretKeySpec generateKey(byte[] password) throws Exception {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] hashPassword = messageDigest.digest(password);
        return new SecretKeySpec(hashPassword, "AES");
    }


    public static Cipher createCipher(SecretKeySpec key, int operation) throws Exception {
        IvParameterSpec iv = new IvParameterSpec(new byte[16]);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
        cipher.init(operation, key, iv);
        return cipher;
    }

    public static Cipher createEncryptCipher(SecretKeySpec key) throws Exception {
        return createCipher(key, Cipher.ENCRYPT_MODE);
    }

    public static Cipher createDecryptCipher(SecretKeySpec key) throws Exception {
        return createCipher(key, Cipher.DECRYPT_MODE);
    }


    public static String getFileExtension(String filePath) {
        String fileName = new File(filePath).getName();
        String[] splitedFileName = fileName.split("\\.");
        return "." + splitedFileName[splitedFileName.length - 1];
    }


    public static String encryptString(String text, String password) throws Exception {
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


    public static String encryptFile(Context context, String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = createEncryptCipher(generateKey(bytePassword));

        String extension = getFileExtension(filePath);
        String fileOutputPath = new File(context.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherInputStream cipherInputStream = new CipherInputStream(fileInputStream, cipher)) {
                    byte[] dataRead = new byte[BUFFER_SIZE];
                    int len = cipherInputStream.read(dataRead);
                    while (len > 0) {
                        fileOutputStream.write(dataRead, 0, len);
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

    public static String decryptFile(Context context, String filePath, String password) throws Exception {
        if (password.equals("")) {
            throw new Exception("Password argument cannot be an empty String");
        }

        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        Cipher cipher = createDecryptCipher(generateKey(bytePassword));

        String extension = getFileExtension(filePath);
        String fileOutputPath = new File(context.getCacheDir(), UUID.randomUUID().toString() + extension).toString();

        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            try (FileOutputStream fileOutputStream = new FileOutputStream(fileOutputPath, true)) {
                try (CipherOutputStream cipherOutputStream = new CipherOutputStream(fileOutputStream, cipher)) {
                    byte[] dataRead = new byte[BUFFER_SIZE];
                    int len = fileInputStream.read(dataRead);
                    while (len > 0) {
                        cipherOutputStream.write(dataRead, 0, len);
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
