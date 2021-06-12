package com.criptonote.Crypto;

import android.annotation.SuppressLint;
import android.util.Base64;

import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class Crypto {

    public static SecretKey generateKey(byte[] password) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] hashPassword = messageDigest.digest(password);
        return new SecretKeySpec(hashPassword, "AES");
    }

    public static IvParameterSpec generateIv(byte[] iv) {
        return new IvParameterSpec(iv);
    }

    public static String encrypt(byte[] text, SecretKey key) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] byteEncryptedText = cipher.doFinal(text);
        return Base64.encodeToString(byteEncryptedText, Base64.NO_WRAP);
    }

    public static String decrypt(byte[] text, SecretKey key) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] byteDecryptedText = cipher.doFinal(text);
        return Base64.encodeToString(byteDecryptedText, Base64.NO_WRAP);
    }
}
