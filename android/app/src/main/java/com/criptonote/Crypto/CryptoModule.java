package com.criptonote.Crypto;

import android.annotation.SuppressLint;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;


public class CryptoModule extends ReactContextBaseJavaModule {


    String REACT_CLASS = "Crypto";

    ReactContext mReactContext;


    CryptoModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        mReactContext = reactApplicationContext;
    }


    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }


    private SecretKey generateKey(byte[] password) throws Exception {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] hashPassword = messageDigest.digest(password);
        return new SecretKeySpec(hashPassword, "AES");
    }


    @ReactMethod
    public void encryptString(String text, String password, Promise promise) throws Exception {
        byte[] byteText = text.getBytes(StandardCharsets.UTF_8);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        // Generate key
        SecretKey key = generateKey(bytePassword);

        // Encrypt
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] byteEncryptedText = cipher.doFinal(byteText);
        String encryptedText = Base64.encodeToString(byteEncryptedText, Base64.DEFAULT);

        promise.resolve(encryptedText);
    }

    @ReactMethod
    public void decryptString(String text, String password, Promise promise) throws Exception {
        byte[] byteEncryptedText = Base64.decode(text, Base64.DEFAULT);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        // Generate key
        SecretKey key = generateKey(bytePassword);

        // Decrypt
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] byteDecryptedText = cipher.doFinal(byteEncryptedText);
        String decryptedText = new String(byteDecryptedText, StandardCharsets.UTF_8);

        promise.resolve(decryptedText);
    }


    @ReactMethod
    public void testString(String text, String password) throws Exception {
        String encryptedText = returnEncrypt(text, password);
        Log.w("ALERTA", "ENCRYPT: \"" + encryptedText + "\"");

        String decryptedText = returnDecrypt(encryptedText, password);
        Log.w("ALERTA", "DECRYPT: \"" + decryptedText + "\"");

        Log.w("ALERTA", "RESULT: \"" + text.equals(decryptedText) + "\"");
    }


    private String returnEncrypt(String text, String password) throws Exception {
        byte[] byteText = text.getBytes(StandardCharsets.UTF_8);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        // Generate key
        SecretKey key = generateKey(bytePassword);

        // Encrypt
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] byteEncryptedText = cipher.doFinal(byteText);
        return Base64.encodeToString(byteEncryptedText, Base64.DEFAULT);
    }

    private String returnDecrypt(String text, String password) throws Exception {
        byte[] byteEncryptedText = Base64.decode(text, Base64.DEFAULT);
        byte[] bytePassword = password.getBytes(StandardCharsets.UTF_8);

        // Generate key
        SecretKey key = generateKey(bytePassword);

        // Decrypt
        @SuppressLint("GetInstance")
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] byteDecryptedText = cipher.doFinal(byteEncryptedText);
        return new String(byteDecryptedText, StandardCharsets.UTF_8);
    }
}
