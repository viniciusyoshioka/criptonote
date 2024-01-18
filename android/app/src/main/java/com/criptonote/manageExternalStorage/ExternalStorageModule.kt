package com.criptonote.manageExternalStorage

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.Settings
import com.criptonote.BuildConfig
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ExternalStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName(): String {
        return "ExternalStorageModule"
    }


    @ReactMethod
    fun requestManageExternalStorage(promise: Promise) {
        val action = Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION
        val uri = Uri.parse("package:${BuildConfig.APPLICATION_ID}")
        val intent = Intent(action, uri)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
        promise.resolve(null)
    }

    @ReactMethod
    fun isManageExternalStorageAllowed(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val isExternalStorageManager = Environment.isExternalStorageManager()
            promise.resolve(isExternalStorageManager)
        } else {
            promise.resolve(null)
        }
    }
}
