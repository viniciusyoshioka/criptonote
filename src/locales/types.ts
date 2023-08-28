
export type TranslationKeyType =
    "criticalError"

    // Log service
    | "log_alert_reportCriticalError_text"


export type TranslationObjectType = {
    [key in TranslationKeyType]: string;
}
