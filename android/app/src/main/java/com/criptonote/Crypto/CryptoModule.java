package com.criptonote.Crypto;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class CryptoModule extends ReactContextBaseJavaModule {


    private static final String MODULE_NAME = "ReactNativeCryptoModule";

    private final ReactApplicationContext mReactApplicationContext;


    CryptoModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        mReactApplicationContext = reactApplicationContext;
    }


    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }


    @ReactMethod
    public void sha256(String text, Promise promise) {
        try {
            String hashedText = Crypto.sha256(text);
            promise.resolve(hashedText);
        } catch (Exception e) {
            promise.reject(MODULE_NAME, "Error hashing string: " + e.getMessage());
        }
    }


    @ReactMethod
    public void encryptString(String text, String password, Promise promise) {
        try {
            String encryptedText = Crypto.encryptString(text, password);
            promise.resolve(encryptedText);
        } catch (Exception e) {
            promise.reject(MODULE_NAME, "Error encrypting string: " + e.getMessage());
        }
    }

    @ReactMethod
    public void decryptString(String text, String password, Promise promise) {
        try {
            String decryptedText = Crypto.decryptString(text, password);
            promise.resolve(decryptedText);
        } catch (Exception e) {
            promise.reject(MODULE_NAME, "Error decrypting string: " + e.getMessage());
        }
    }


    @ReactMethod
    public void stopAllEncryptionService() {
        Intent stopIntent = new Intent(mReactApplicationContext, CryptoService.class);
        mReactApplicationContext.stopService(stopIntent);
    }

    @ReactMethod
    public void encryptFileService(ReadableMap options) {
        String fileName = options.getString("fileName");
        String sourcePath = options.getString("sourcePath");
        String destinationPath = options.getString("destinationPath");
        String password = options.getString("password");
        boolean deleteOriginalFile = options.getBoolean("deleteOriginalFile");

        Intent intent = new Intent(mReactApplicationContext, CryptoService.class);
        intent.setAction(CryptoService.ACTION_ENCRYPT);
        intent.putExtra("fileName", fileName);
        intent.putExtra("sourcePath", sourcePath);
        intent.putExtra("destinationPath", destinationPath);
        intent.putExtra("password", password);
        intent.putExtra("deleteOriginalFile", deleteOriginalFile);

        mReactApplicationContext.startService(intent);
    }

    @ReactMethod
    public void decryptFileService(ReadableMap options) {
        String fileName = options.getString("fileName");
        String sourcePath = options.getString("sourcePath");
        String destinationPath = options.getString("destinationPath");
        String password = options.getString("password");
        boolean deleteOriginalFile = options.getBoolean("deleteOriginalFile");

        Intent intent = new Intent(mReactApplicationContext, CryptoService.class);
        intent.setAction(CryptoService.ACTION_DECRYPT);
        intent.putExtra("fileName", fileName);
        intent.putExtra("sourcePath", sourcePath);
        intent.putExtra("destinationPath", destinationPath);
        intent.putExtra("password", password);
        intent.putExtra("deleteOriginalFile", deleteOriginalFile);

        mReactApplicationContext.startService(intent);
    }
}
