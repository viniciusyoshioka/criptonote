
const monthList = {
    "Jan": "01", "Feb": "02", "Mar": "03",
    "Apr": "04", "May": "05", "Jun": "06", 
    "Jul": "07", "Aug": "08", "Sep": "09",
    "Oct": "10", "Nov": "11", "Dec": "12"
}


export function getDate(currentDate=Date(), separator="/"): string {
    const dateList = currentDate.split(" ")

    const day = dateList[2]
    const month = monthList[dateList[1]]
    const year = dateList[3]

    return `${day}${separator}${month}${separator}${year}`
}


export function getTime(currentDate=Date(), separator=":", hasSecond=false): string {
    const timeList = currentDate.split(" ")[4].split(":")

    const hour = timeList[0]
    const minute = timeList[1]
    const second = timeList[2]

    return `${hour}${separator}${minute}${hasSecond ? `${separator}${second}` : ""}`
}


export function getDateTime(dateSeparator="/", timeSeparator=":", hasSecond=false): string {
    const currentDate = Date()

    const date = getDate(currentDate, dateSeparator)
    const time = getTime(currentDate, timeSeparator, hasSecond)

    return `${date} ${time}`
}
