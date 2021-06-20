package com.criptonote.Crypto;

import android.content.Context;


public class CryptoTaskParams {

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
