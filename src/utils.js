export const toUnixDay = (days) => { return Math.floor(Date.now() / 1000 - parseFloat(days) * 86400); }
