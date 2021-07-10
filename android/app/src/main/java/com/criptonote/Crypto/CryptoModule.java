package com.criptonote.Crypto;

import android.util.Log;
import android.util.SparseArray;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;


public class CryptoModule extends ReactContextBaseJavaModule {


    private static final String MODULE_NAME = "Crypto";
    private static final String ON_FILE_ENCRYPT_PROGRESS = "onFileEncryptProgress";
    private static final String ON_FILE_DECRYPT_PROGRESS = "onFileDecryptProgress";
    private static final String ON_FILE_ENCRYPT_COMPLETE = "onFileEncryptComplete";
    private static final String ON_FILE_DECRYPT_COMPLETE = "onFileDecryptComplete";
    private static final String ON_FILE_ENCRYPT_ERROR = "onFileEncryptError";
    private static final String ON_FILE_DECRYPT_ERROR = "onFileDecryptError";

    private final ReactApplicationContext mReactApplicationContext;
    private final SparseArray<CryptoTask> cryptoTaskList = new SparseArray<>();


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
    public void encryptFile(String filePath, String password, Promise promise) {
        try {
            String fileOutputPath = Crypto.encryptFile(mReactApplicationContext, filePath, password);
            promise.resolve(fileOutputPath);
        } catch (Exception e) {
            promise.reject("Error", "Error encrypting file. " + e.getMessage());
        }
    }

    @ReactMethod
    public void decryptFile(String filePath, String password, Promise promise) {
        try {
            String fileOutputPath = Crypto.decryptFile(mReactApplicationContext, filePath, password);
            promise.resolve(fileOutputPath);
        } catch (Exception e) {
            promise.reject("Error", "Error decrypting file. " + e.getMessage());
        }
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
    public void stopFileEncryptionTask(int taskId) {
        CryptoTask cryptoTask = cryptoTaskList.get(taskId);
        if (cryptoTask != null) {
            cryptoTask.stop();
        }
    }


    @ReactMethod
    public void encryptFileTask(int taskId, String filePath, String password, Promise promise) {
        CryptoTaskParams cryptoTaskParams = new CryptoTaskParams();
        cryptoTaskParams.context = mReactApplicationContext;
        cryptoTaskParams.filePath = filePath;
        cryptoTaskParams.password = password;
        cryptoTaskParams.operation = CryptoTaskParams.OPERATION_ENCRYPT;
        cryptoTaskParams.onProgress = new CryptoTaskParams.OnEncryptionProgress() {
            @Override
            public void onEncryptionProgress(long current, long total) {
                WritableMap onEncryptionProgressResponse = Arguments.createMap();
                onEncryptionProgressResponse.putInt("current", (int) current);
                onEncryptionProgressResponse.putInt("total", (int) total);
                mReactApplicationContext
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_ENCRYPT_PROGRESS, onEncryptionProgressResponse);
            }
        };
        cryptoTaskParams.onComplete = new CryptoTaskParams.OnEncryptionComplete() {
            @Override
            public void onEncryptionComplete(String fileOutputPath) {
                cryptoTaskList.remove(taskId);
                mReactApplicationContext
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_ENCRYPT_COMPLETE, fileOutputPath);
            }
        };
        cryptoTaskParams.onError = new CryptoTaskParams.OnEncryptionError() {
            @Override
            public void onEncryptionError(String message) {
                cryptoTaskList.remove(taskId);
                mReactApplicationContext
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_ENCRYPT_ERROR, message);
            }
        };

        if (cryptoTaskList.get(taskId) == null) {
            CryptoTask cryptoTask = new CryptoTask();
            cryptoTask.execute(cryptoTaskParams);

            cryptoTaskList.put(taskId, cryptoTask);

            promise.resolve(null);
        } else {
            promise.reject("Error", "Already exists a task with the same id: " + taskId);
        }
    }

    @ReactMethod
    public void decryptFileTask(int taskId, String filePath, String password, Promise promise) {
        CryptoTaskParams cryptoTaskParams = new CryptoTaskParams();
        cryptoTaskParams.context = mReactApplicationContext;
        cryptoTaskParams.filePath = filePath;
        cryptoTaskParams.password = password;
        cryptoTaskParams.operation = CryptoTaskParams.OPERATION_DECRYPT;
        cryptoTaskParams.onProgress = new CryptoTaskParams.OnEncryptionProgress() {
            @Override
            public void onEncryptionProgress(long current, long total) {
                WritableMap onEncryptionProgressResponse = Arguments.createMap();
                onEncryptionProgressResponse.putInt("current", (int) current);
                onEncryptionProgressResponse.putInt("total", (int) total);
                getReactApplicationContext()
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_DECRYPT_PROGRESS, onEncryptionProgressResponse);
            }
        };
        cryptoTaskParams.onComplete = new CryptoTaskParams.OnEncryptionComplete() {
            @Override
            public void onEncryptionComplete(String fileOutputPath) {
                cryptoTaskList.remove(taskId);
                getReactApplicationContext()
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_DECRYPT_COMPLETE, fileOutputPath);
            }
        };
        cryptoTaskParams.onError = new CryptoTaskParams.OnEncryptionError() {
            @Override
            public void onEncryptionError(String message) {
                cryptoTaskList.remove(taskId);
                getReactApplicationContext()
                        .getJSModule(RCTNativeAppEventEmitter.class)
                        .emit(ON_FILE_DECRYPT_ERROR, message);
            }
        };

        if (cryptoTaskList.get(taskId) == null) {
            CryptoTask cryptoTask = new CryptoTask();
            cryptoTask.execute(cryptoTaskParams);

            cryptoTaskList.put(taskId, cryptoTask);

            promise.resolve(null);
        } else {
            promise.reject("Error", "Already exists a task with the same id: " + taskId);
        }
    }
}
