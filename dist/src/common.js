"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampToDate = void 0;
exports.datestampToDate = datestampToDate;
exports.ensureDate = ensureDate;
exports.remainingTime = remainingTime;
exports.remainingTimeString = remainingTimeString;
function datestampToDate(dateish) {
    return dateish instanceof Date ? dateish : dateish === null || dateish === void 0 ? void 0 : dateish.toDate();
}
// deprecated in favor of datestampToDate
exports.timestampToDate = datestampToDate;
function ensureDate(date) {
    return datestampToDate(date) || new Date();
}
function remainingTime(endTime, currTime) {
    currTime = currTime !== null && currTime !== void 0 ? currTime : new Date();
    const endDate = datestampToDate(endTime);
    const remaining = endDate && endDate > currTime
        ? Math.max(0, endDate.getTime() - currTime.getTime())
        : 0;
    const aDay = 1000 * 60 * 60 * 24, moreThanAWeek = remaining > aDay * 7, moreThanADay = remaining > aDay;
    const weeks = moreThanADay
        ? Math.floor(remaining / 1000 / 60 / 60 / 24 / 7)
        : 0;
    const days = moreThanADay
        ? Math.floor(remaining / 1000 / 60 / 60 / 24) % 7
        : 0;
    const hours = !moreThanAWeek
        ? Math.floor((remaining / 1000 / 60 / 60) % 24)
        : 0;
    const minutes = !moreThanADay ? Math.floor((remaining / 1000 / 60) % 60) : 0;
    const seconds = endTime && !hours ? Math.floor((remaining / 1000) % 60) : 0;
    return {
        weeks,
        days,
        hours,
        minutes,
        seconds,
        remaining
    };
}
function maybeS(amt, label) {
    return `${amt}:${label}` + (amt === 0 || amt > 1 ? "s" : "");
}
function padded(amt, label) {
    return `${String(amt).padStart(2, "0")}:${label}`;
}
function remainingTimeString(endTime, currTime) {
    const { weeks, days, hours, minutes, seconds } = remainingTime(endTime, currTime);
    return weeks
        ? maybeS(weeks, "wk") + " " + maybeS(days, "day")
        : days
            ? maybeS(days, "day") + " " + maybeS(hours, "hr")
            : hours
                ? maybeS(hours, "hr") + " " + padded(minutes, "min")
                : minutes
                    ? padded(minutes, "min") + " " + padded(seconds, "sec")
                    : `${seconds}:sec`;
}
//# sourceMappingURL=common.js.map