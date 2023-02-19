import moment from "moment";

export function toDateTimeStrWithFormat(dateTime, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateTime).format(format)
}

export function toDateTimeStr(dateTime) {
    return toDateTimeStrWithFormat(dateTime)
}

export function toTimeStr(dateTime) {
    return toDateTimeStrWithFormat(dateTime, 'HH:mm:ss')
}

