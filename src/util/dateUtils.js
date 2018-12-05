import dateformat from 'dateformat'

export function formatDate(date) {
    return dateformat(date, 'hh:MM')
}