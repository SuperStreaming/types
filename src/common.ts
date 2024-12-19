import { Timestamp } from "firebase/firestore/lite"

type Dateish = Date | Timestamp | undefined

export function datestampToDate(dateish: Dateish) {
  return dateish instanceof Date ? dateish : dateish?.toDate()
}

// deprecated in favor of datestampToDate
export const timestampToDate = datestampToDate

export function ensureDate(date: Dateish) {
  return datestampToDate(date) || new Date()
}
