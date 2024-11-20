import { Timestamp } from "firebase/firestore"

type Dateish = Date | Timestamp | null | undefined

export function timestampToDate(dateish: Dateish) {
  return dateish instanceof Date ? dateish : dateish?.toDate()
}

export function ensureDate(date: Dateish) {
  return timestampToDate(date) || new Date()
}
