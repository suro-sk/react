export function formatDate(isoDate = '') {
    return isoDate.split('T')[0];
}

export function truncateString(str = '', length = 100) {
    if (str.length <= length) {
        return str
    }
    return str.slice(0, length) + '...';
}
