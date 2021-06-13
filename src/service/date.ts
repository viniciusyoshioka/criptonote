
export function getDate(currentDate=new Date(), separator="/"): string {
    let localeDate = currentDate.toLocaleDateString()
    if (separator !== "/") {
        localeDate = localeDate.replace("/", separator)
        localeDate = localeDate.replace("/", separator)
    }
    return localeDate
}


export function getTime(currentDate=new Date(), separator=":", hasSecond=false): string {
    let localeTime = currentDate.toLocaleTimeString()
    if (separator !== ":") {
        localeTime = localeTime.replace(":", separator)
        localeTime = localeTime.replace(":", separator)
    }
    if (!hasSecond) {
        const splitLocaleTime = localeTime.split(separator)
        splitLocaleTime.length = 2
        localeTime = splitLocaleTime.join(separator)
    }
    return localeTime
}


export function getDateTime(dateSeparator="/", timeSeparator=":", hasSecond=false): string {
    const currentDate = new Date()

    const date = getDate(currentDate, dateSeparator)
    const time = getTime(currentDate, timeSeparator, hasSecond)

    return `${date} ${time}`
}
