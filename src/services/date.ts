
export class DateService {

    /**
     * Get the date in format YYYY-MM-DD
     */
    static getDate(dateObject = new Date()): string {
        const year = dateObject.getFullYear()
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0")
        const day = dateObject.getDate().toString().padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    /**
     * Get the date in format DD/MM/YYYY according to the user's location
     */
    static getLocaleDate(dateObject = new Date()): string {
        return dateObject.toLocaleDateString()
    }


    /**
     * Get the time in format HH-MM-SS
     */
    static getTime(dateObject = new Date()): string {
        const hour = dateObject.getHours().toString().padStart(2, "0")
        const minute = dateObject.getMinutes().toString().padStart(2, "0")
        const second = dateObject.getSeconds().toString().padStart(2, "0")
        return `${hour}-${minute}-${second}`
    }

    /**
     * Get the time in format HH:MM or HH:MM:SS according to the user's location
     */
    static getLocaleTime(dateObject = new Date(), hasSeconds = true): string {
        return dateObject.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: hasSeconds ? "2-digit" : undefined,
        })
    }


    /**
     * Get the date and time in format YYYY-MM-DD HH-MM-SS
     */
    static getDateTime(dateObject = new Date()): string {
        const date = this.getDate(dateObject)
        const time = this.getTime(dateObject)
        return `${date} ${time}`
    }

    /**
     * Get the date and time in format DD/MM/YYYY HH:MM or DD/MM/YYYY HH:MM:SS
     * according to the user's location
     */
    static getLocaleDateTime(dateObject = new Date(), hasSeconds = true): string {
        const date = this.getLocaleDate(dateObject)
        const time = this.getLocaleTime(dateObject, hasSeconds)
        return `${date} ${time}`
    }
}
