
export function getDate(separator="/", currentDate=new Date()): string {
    const day = currentDate.getDate().toString().padStart(2).replace(" ", "0")
    const month = (currentDate.getMonth() + 1).toString().padStart(2).replace(" ", "0")
    const year = currentDate.getFullYear().toString().padStart(2).replace(" ", "0")

    return `${day}${separator}${month}${separator}${year}`
}


export function getTime(separator=":", hasSecond=false, currentDate=new Date()): string {
    const hour = currentDate.getHours().toString().padStart(2).replace(" ", "0")
    const minute = currentDate.getMinutes().toString().padStart(2).replace(" ", "0")

    let localeTime = `${hour}${separator}${minute}`
    if (hasSecond) {
        const second = currentDate.getSeconds().toString().padStart(2).replace(" ", "0")
        localeTime += `${separator}${second}`
    }

    return localeTime
}


export function getDateTime(dateSeparator="/", timeSeparator=":", hasSecond=false, currentDate=new Date()): string {
    const date = getDate(dateSeparator, currentDate)
    const time = getTime(timeSeparator, hasSecond, currentDate)

    return `${date} ${time}`
}


export function getTimestamp(): string {
    return getDateTime("-", ":", true)
}


export function toDateTime(timestamp: string): string {
    return getDateTime("/", ":", false, new Date(timestamp))
}
