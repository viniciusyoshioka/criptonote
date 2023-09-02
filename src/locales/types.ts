
export type TranslationKeyType =
    "ok"
    | "cancel"
    | "warn"
    | "delete"
    | "criticalError"
    | "success"
    | "save"
    | "dont_save"

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

    // Log service
    | "log_alert_reportCriticalError_text"


export type TranslationObjectType = {
    [key in TranslationKeyType]: string;
}
