package com.criptonote.Crypto;

import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.crypto.SecretKey;


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


    @ReactMethod
    public void encrypt(String text, String password, Promise promise) {
        byte[] byteText = text.getBytes();
        byte[] bytePassword = password.getBytes();

        // Generate key
        SecretKey key = null;
        try {
            key = Crypto.generateKey(bytePassword);
        } catch (Exception e) {
            promise.reject("Error", "Couldn't generate key. Message: " + e.getMessage());
        }

        // Encrypt
        String encryptedText = null;
        try {
            encryptedText = Crypto.encrypt(byteText, key);
        } catch (Exception e) {
            promise.reject("Error", "Couldn't encrypt text. Message: " + e.getMessage());
        }

        promise.resolve(encryptedText);
    }

    @ReactMethod
    public void decrypt(String text, String password, Promise promise) {
        byte[] byteEncryptedText = Base64.decode(text, Base64.NO_WRAP);
        byte[] bytePassword = password.getBytes();

        // Generate key
        SecretKey key = null;
        try {
            key = Crypto.generateKey(bytePassword);
        } catch (Exception e) {
            promise.reject("Error", "Couldn't generate key. Message: " + e.getMessage());
        }

        // Decrypt
        String decryptedText = null;
        try {
            decryptedText = Crypto.decrypt(byteEncryptedText, key);
        } catch (Exception e) {
            promise.reject("Error", "Couldn't decrypt text. Message: " + e.getMessage());
        }

        promise.resolve(decryptedText);
    }


    @ReactMethod
    public void test(String text, String password) throws Exception {
        String encryptedText = returnEncrypt(text, password);
        System.out.println("ENCRYPT: \"" + encryptedText + "\"");

        String decryptedText = returnDecrypt(encryptedText, password);
        System.out.println("DECRYPT: \"" + decryptedText + "\"");

        System.out.println("RESULT: \"" + text.equals(decryptedText) + "\"");
    }


    private String returnEncrypt(String text, String password) throws Exception {
        byte[] byteText = text.getBytes();
        byte[] bytePassword = password.getBytes();

        // Generate key
        SecretKey key = Crypto.generateKey(bytePassword);

        // Encrypt
        return Crypto.encrypt(byteText, key);
    }

    private String returnDecrypt(String text, String password) throws Exception {
        byte[] byteText = text.getBytes();
        byte[] bytePassword = password.getBytes();

        // Generate key
        SecretKey key = Crypto.generateKey(bytePassword);

        // Decrypt
        return Crypto.decrypt(byteText, key);
    }
}
