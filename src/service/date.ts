
export function getDate(separator="/", currentDate=new Date()): string {
    const day = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    return `${day}${separator}${month}${separator}${year}`
}


export function getTime(separator=":", hasSecond=false, currentDate=new Date()): string {
    const hour = currentDate.getHours()
    const minute = currentDate.getMinutes()

    let localeTime = `${hour}${separator}${minute}`
    if (hasSecond) {
        const second = currentDate.getSeconds()
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
