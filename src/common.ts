import { Timestamp } from "@firebase/firestore/lite"

import { Datestamp } from "./v2/auction"

type Dateish = Date | Timestamp | undefined

export function datestampToDate(dateish: Dateish) {
  return dateish instanceof Date ? dateish : dateish?.toDate()
}

// deprecated in favor of datestampToDate
export const timestampToDate = datestampToDate

export function ensureDate(date: Dateish) {
  return datestampToDate(date) || new Date()
}

export function remainingTime(endTime?: Datestamp, currTime?: Date) {
  currTime = currTime ?? new Date()
  const endDate = datestampToDate(endTime)

  const remaining =
    endDate && endDate > currTime
      ? Math.max(0, endDate.getTime() - currTime.getTime())
      : 0

  const aDay = 1000 * 60 * 60 * 24,
    moreThanAWeek = remaining > aDay * 7,
    moreThanADay = remaining > aDay

  const weeks = moreThanADay
    ? Math.floor(remaining / 1000 / 60 / 60 / 24 / 7)
    : 0
  const days = moreThanADay
    ? Math.floor(remaining / 1000 / 60 / 60 / 24) % 7
    : 0
  const hours = !moreThanAWeek
    ? Math.floor((remaining / 1000 / 60 / 60) % 24)
    : 0
  const minutes = !moreThanADay ? Math.floor((remaining / 1000 / 60) % 60) : 0
  const seconds = endTime && !hours ? Math.floor((remaining / 1000) % 60) : 0

  return {
    weeks,
    days,
    hours,
    minutes,
    seconds,
    remaining
  }
}

function maybeS(amt: number, label: string) {
  return `${amt}:${label}` + (amt === 0 || amt > 1 ? "s" : "")
}

function padded(amt: number, label: string) {
  return `${String(amt).padStart(2, "0")}:${label}`
}

export function remainingTimeString(
  endTime?: Datestamp,
  currTime?: Date
): string {
  const { weeks, days, hours, minutes, seconds } = remainingTime(
    endTime,
    currTime
  )

  return weeks
    ? maybeS(weeks, "wk") + " " + maybeS(days, "day")
    : days
      ? maybeS(days, "day") + " " + maybeS(hours, "hr")
      : hours
        ? maybeS(hours, "hr") + " " + padded(minutes, "min")
        : minutes
          ? padded(minutes, "min") + " " + padded(seconds, "sec")
          : `${seconds}:sec`
}
