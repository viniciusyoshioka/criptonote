package com.criptonote.Crypto;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;


public class CryptoModule extends ReactContextBaseJavaModule {


    private static final String MODULE_NAME = "Crypto";

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
    public void encryptString(String text, String password, Promise promise) {
        try {
            String encryptedText = Crypto.encryptString(text, password);
            promise.resolve(encryptedText);
        } catch (Exception e) {
            promise.reject("Error", "Error encrypting text. " + e.getMessage());
        }
    }

    @ReactMethod
    public void decryptString(String text, String password, Promise promise) {
        try {
            String decryptedText = Crypto.decryptString(text, password);
            promise.resolve(decryptedText);
        } catch (Exception e) {
            promise.reject("Error", "Error decrypting text. " + e.getMessage());
        }
    }

    @ReactMethod
    public void testString(String text, String password, Promise promise) throws Exception {
        String encryptedText = Crypto.encryptString(text, password);
        Log.w("ALERTA", "ENCRYPT: \"" + encryptedText + "\"");

        String decryptedText = Crypto.decryptString(encryptedText, password);
        Log.w("ALERTA", "DECRYPT: \"" + decryptedText + "\"");

        Log.w("ALERTA", "RESULT: \"" + text.equals(decryptedText) + "\"");
        promise.resolve(text.equals(decryptedText));
    }


    @ReactMethod
    public void testFile(String filePath, String password, Promise promise) throws Exception {
        Log.w("ALERTA", "testFile - file1 -> file2");
        String file2 = Crypto.encryptFile(mReactApplicationContext, filePath, password);

        Log.w("ALERTA", "testFile - file2 -> file3");
        String file3 = Crypto.decryptFile(mReactApplicationContext, file2, password);

        Log.w("ALERTA", "testFile pronto");

        WritableMap response = Arguments.createMap();
        response.putString("encryptedFilePath", file2);
        response.putString("decryptedFilePath", file3);
        promise.resolve(response);
    }


    @ReactMethod
    public void stopAllEncryptionService() {
        mReactApplicationContext.stopService(new Intent(mReactApplicationContext, CryptoService.class));
    }

    @ReactMethod
    public void encryptFileService(String inputPath, String outputPath, String password, @Nullable ReadableMap options) {
        boolean deleteOriginalFile = false;
        if (options != null) {
            deleteOriginalFile = options.getBoolean("deleteOriginalFile");
        }

        Intent intent = new Intent(mReactApplicationContext, CryptoService.class);
        intent.setAction(CryptoService.ACTION_ENCRYPT);
        intent.putExtra("inputPath", inputPath);
        intent.putExtra("outputPath", outputPath);
        intent.putExtra("password", password);
        intent.putExtra("deleteOriginalFile", deleteOriginalFile);

        mReactApplicationContext.startService(intent);
    }

    @ReactMethod
    public void decryptFileService(String inputPath, String outputPath, String password, @Nullable ReadableMap options) {
        boolean deleteOriginalFile = false;
        if (options != null) {
            deleteOriginalFile = options.getBoolean("deleteOriginalFile");
        }

        Intent intent = new Intent(mReactApplicationContext, CryptoService.class);
        intent.setAction(CryptoService.ACTION_DECRYPT);
        intent.putExtra("inputPath", inputPath);
        intent.putExtra("outputPath", outputPath);
        intent.putExtra("password", password);
        intent.putExtra("deleteOriginalFile", deleteOriginalFile);

        mReactApplicationContext.startService(intent);
    }
}
