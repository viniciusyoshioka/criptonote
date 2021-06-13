
export class OldCrypto {


    private Asc(text: string): number {
        return text.charCodeAt(0)
    } 

    private Chr(code: number): string {
        return String.fromCharCode(code)
    }


    public encrypt(text: string, password: string): string {
        if (password === "") {
            return text
        }

        let encriptedText = ""
        let charcode = 0
        let passwordLimit = 0

        for (let i = 0; i < text.length; i++) {
            charcode = (this.Asc(text.substr(i, 1)) + this.Asc(password.substr(passwordLimit, 1)))

            if (passwordLimit === (password.length - 1)) {
                passwordLimit = 0
            }

            if (charcode > 255) {
                charcode -= 256
            }

            if (password.length > 1) {
                passwordLimit += 1
            }

            encriptedText += this.Chr(charcode)
        }

        return encriptedText
    }

    public decrypt(text: string, password: string): string {
        if (password === "") {
            return text
        }
    
        let decriptedText = ""
        let charcode = 0
        let passwordLimit = 0
    
        for (let i = 0; i < text.length; i++) {
            charcode = (this.Asc(text.substr(i, 1)) - this.Asc(password.substr(passwordLimit, 1)))

            if (passwordLimit == (password.length - 1)) {
                passwordLimit = 0
            }

            if (charcode < 0) {
                charcode += 256
            }

            if (password.length > 1) {
                passwordLimit += 1
            }

            decriptedText += this.Chr(charcode)
        }
    
        return decriptedText
    }
}
