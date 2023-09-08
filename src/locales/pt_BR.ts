/* eslint-disable camelcase */
import { TranslationObjectType } from "./types"


export const pt_BR: TranslationObjectType = {
    ok: "Ok",
    cancel: "Cancelar",
    warn: "Aviso",
    delete: "Apagar",
    criticalError: "Erro crítico",
    success: "Sucesso",
    save: "Salvar",
    dont_save: "Não salvar",
    password: "Senha",

    // Home alert
    Home_alert_errorLoadingNotes_text: "Erro ao carregar notas",
    Home_alert_errorDeletingSelectedNotes_text: "Erro ao apagar notas selecionadas",
    Home_alert_deleteNotes_title: "Apagar",
    Home_alert_deleteNotes_text: "Estas notas serão apagadas permanentemente",
    Home_alert_importNotes_title: "Importar",
    Home_alert_importNotes_text: "A importação de notas pode demorar um pouco. Não feche o aplicativo",
    Home_alert_errorImportingNotes_text: "Erro importando notas",
    Home_alert_exportingNotes_title: "Aguarde",
    Home_alert_exportingNotes_text: "A exportação de notas pode demorar um pouco. Não feche o aplicativo",
    Home_alert_allNotesExported_text: "Todas as notas foram exportadas com sucesso",
    Home_alert_selectedNotesExported_text: "Todas as notas selecionadas foram exportadas com sucesso",
    Home_alert_errorExportingNotes_text: "Erro exportando notas",
    Home_alert_noNotesToExport_text: "Nenhuma nota existente para ser exportada",
    Home_alert_exportNotes_title: "Exportar",
    Home_alert_allSelectedNotesWillBeExported_text: "As notas selecionadas serão exportadas",
    Home_alert_allNotesWillBeExported_text: "Todas as notas serão exportadas",
    Home_alert_notificationPermissionDenied_title: "Permissão negada para notificação",
    Home_alert_notificationPermissionDenied_text: "Notificações são necessárias para o funcionamento do aplicativo. Você pode permitir mais tarde nas configurações do aplicativo",
    // Home header
    Home_header_title: "CriptoNote",
    // Home screen
    Home_export: "Exportar",
    Home_emptyNoteList: "Nenhuma nota",
    Home_deletingNotes: "Apagando notas...",
    // Home menu
    Home_menu_importNote: "Importar notas",
    Home_menu_exportNote: "Exportar notas",
    Home_menu_settings: "Configurações",
    // Home Code
    Code_title: "Senha",
    Code_description: "Digite a senha desta nota para descriptografá-la ou deixe vazio para visualizar",

    // ReadNote alert
    ReadNote_alert_errorDecryptingNote_text: "Error descriptografando nota",
    // ReadNote screen
    ReadNote_decryptingNote: "Descriptografando nota...",

    // EditNote alert
    EditNote_alert_unsavedChanges_text: "Esta nota possui alterações não salvas, se sair agora elas serão descartadas permanentemente",
    EditNote_alert_errorSavingNote_text: "Erro ao salvar nota",
    EditNote_alert_discardEmptyNote_text: "Esta nota está vazia e será descartada",
    EditNote_alert_errorDeletingEmptyNote_text: "Erro apagando nota vazia",
    EditNote_alert_saveNoteBeforeChanginPassword_text: "Salve a nota antes de mudar a senha",
    EditNote_alert_errorDeletingNote_text: "Erro apagando nota",
    // EditNote header
    EditNote_header_title: "Editar nota",
    // EditNote screen
    EditNote_titlePlaceholder: "Título",
    EditNote_textPlaceholder: "Texto",
    EditNote_savingNote: "Salvando nota...",
    EditNote_deletingNote: "Apagando nota...",
    // EditNote menu
    EditNote_menu_changePassword: "Mudar senha",
    EditNote_menu_deleteNote: "Apagar nota",
    // EditNote ChangePassword alert
    ChangePassword_alert_newPasswordDoesNotMatch_text: "A nova senha e a confirmação não são iguais",
    ChangePassowrd_alert_errorChangingPassword_text: "Erro mudando senha da nota",
    // EditNote ChangePassword
    ChangePassword_title: "Mudar senha",
    ChangePassword_currentPassword: "Senha atual",
    ChangePassword_newPassword: "Nova senha",
    ChangePassword_confirmPassword: "Confirmar nova senha",
    ChangePassword_changingPassword: "Mudando senha...",

    // WriteNote alert
    WriteNote_alert_unsavedChanges_text: "Esta nota possui alterações não salvas, se sair agora elas serão descartadas permanentemente",
    WriteNote_alert_errorSavingNote_text: "Erro ao salvar nota",
    WriteNote_alert_discardEmptyNote_text: "Esta nota está vazia e será descartada",
    // WriteNote header
    WriteNote_header_title: "Escrever nota",
    // WriteNote screen
    WriteNote_titlePlaceholder: "Título",
    WriteNote_passwordPlaceholder: "Senha",
    WriteNote_textPlaceholder: "Texto",
    WriteNote_savingNote: "Salvando nota...",

    // Settings alert
    Settings_alert_errorSharingLogDatabase_text: "Erro ao compartilhar logs",
    Settings_alert_errorSharingAppDatabase_text: "Erro ao compartilhar banco de dados das notas",
    // Settings header
    Settings_header_title: "Configurações",
    // Settings screen
    Settings_theme_title: "Tema",
    Settings_theme_text: "Mudar tema de cores do aplicativo",
    Settings_shareLogDatabase_title: "Compartilhar logs",
    Settings_shareLogDatabase_text: "Enviar registro de erros",
    Settings_shareAppDatabase_title: "Compartilhar banco de dados",
    Settings_shareAppDatabase_text: "Enviar banco de dados das notas",
    Settings_appVersionInfo_title: "Versão do aplicativo",
    // Settings ChangeTheme
    ChangeTheme_title: "Mudar tema",
    ChangeTheme_auto: "Automático",
    ChangeTheme_light: "Claro",
    ChangeTheme_dark: "Escuro",

    // Log service
    log_alert_reportCriticalError_text: "Um erro crítico ocorreu, reporte os logs para o desenvolvedor",
}
