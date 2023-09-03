
export type TranslationKeyType =
    "ok"
    | "cancel"
    | "warn"
    | "delete"
    | "criticalError"
    | "success"
    | "save"
    | "dont_save"
    | "password"

    // Home alert
    | "Home_alert_errorLoadingNotes_text"
    | "Home_alert_errorDeletingSelectedNotes_text"
    | "Home_alert_deleteNotes_title"
    | "Home_alert_deleteNotes_text"
    | "Home_alert_importNotes_title"
    | "Home_alert_importNotes_text"
    | "Home_alert_errorImportingNotes_text"
    | "Home_alert_exportingNotes_title"
    | "Home_alert_exportingNotes_text"
    | "Home_alert_errorExportingNotes_text"
    | "Home_alert_noNotesToExport_text"
    | "Home_alert_exportNotes_title"
    | "Home_alert_allSelectedNotesWillBeExported_text"
    | "Home_alert_allNotesWillBeExported_text"
    | "Home_alert_notificationPermissionDenied_title"
    | "Home_alert_notificationPermissionDenied_text"
    // Home header
    | "Home_header_title"
    // Home screen
    | "Home_export"
    | "Home_emptyNoteList"
    | "Home_deletingNotes"
    // Home menu
    | "Home_menu_importNote"
    | "Home_menu_exportNote"
    | "Home_menu_settings"
    // Home Code
    | "Code_title"
    | "Code_description"

    // ReadNote alert
    | "ReadNote_alert_errorDecryptingNote_text"
    // ReadNote screen
    | "ReadNote_decryptingNote"

    // EditNote alert
    | "EditNote_alert_unsavedChanges_text"
    | "EditNote_alert_errorSavingNote_text"
    | "EditNote_alert_discardEmptyNote_text"
    | "EditNote_alert_errorDeletingEmptyNote_text"
    // EditNote header
    | "EditNote_header_title"
    // EditNote screen
    | "EditNote_titlePlaceholder"
    | "EditNote_textPlaceholder"
    | "EditNote_savingNote"

    // WriteNote alert
    | "WriteNote_alert_unsavedChanges_text"
    | "WriteNote_alert_errorSavingNote_text"
    | "WriteNote_alert_discardEmptyNote_text"
    // WriteNote header
    | "WriteNote_header_title"
    // WriteNote screen
    | "WriteNote_titlePlaceholder"
    | "WriteNote_passwordPlaceholder"
    | "WriteNote_textPlaceholder"
    | "WriteNote_savingNote"

    // Settings alert
    | "Settings_alert_errorSharingLogDatabase_text"
    | "Settings_alert_errorSharingAppDatabase_text"
    // Settings header
    | "Settings_header_title"
    // Settings screen
    | "Settings_theme_title"
    | "Settings_theme_text"
    | "Settings_shareLogDatabase_title"
    | "Settings_shareLogDatabase_text"
    | "Settings_shareAppDatabase_title"
    | "Settings_shareAppDatabase_text"
    | "Settings_appVersionInfo_title"
    // Settings ChangeTheme
    | "ChangeTheme_title"
    | "ChangeTheme_auto"
    | "ChangeTheme_light"
    | "ChangeTheme_dark"

    // Log service
    | "log_alert_reportCriticalError_text"


export type TranslationObjectType = {
    [key in TranslationKeyType]: string;
}
