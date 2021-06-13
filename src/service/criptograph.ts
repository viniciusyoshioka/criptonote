
function Asc(text: string): number {
    return text.charCodeAt(0)
} 


function Chr(code: number): string {
    return String.fromCharCode(code)
}


export const OldCrypto = {
    encrypt: (text: string, password: string): string => {
        if (password === "") {
            return text
        }

        let encriptedText = ""
        let charcode = 0
        let passwordLimit = 0

        for (let i = 0; i < text.length; i++) {
            charcode = (Asc(text.substr(i, 1)) + Asc(password.substr(passwordLimit, 1)))

            if (passwordLimit === (password.length - 1)) {
                passwordLimit = 0
            }

            if (charcode > 255) {
                charcode -= 256
            }

            if (password.length > 1) {
                passwordLimit += 1
            }

            encriptedText += Chr(charcode)
        }

        return encriptedText
    },

    decrypt: (text: string, password: string): string => {
        if (password === "") {
            return text
        }

        let decriptedText = ""
        let charcode = 0
        let passwordLimit = 0

        for (let i = 0; i < text.length; i++) {
            charcode = (Asc(text.substr(i, 1)) - Asc(password.substr(passwordLimit, 1)))

            if (passwordLimit == (password.length - 1)) {
                passwordLimit = 0
            }

            if (charcode < 0) {
                charcode += 256
            }

            if (password.length > 1) {
                passwordLimit += 1
            }

            decriptedText += Chr(charcode)
        }

        return decriptedText
    }
}
