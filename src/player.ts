import { Timestamp } from "firebase/firestore"

export type Answers = Record<string, string>
export type RapidTimers = Record<string, Timestamp>

export type Player = {
  id: string
  username: string
  pictureUrl: string
  currentStep: number
  answers: Answers
  rapid?: RapidTimers
  isCaught: boolean
  isChaser: boolean
  ticket?: {
    purchasedAt: Timestamp
    type: "virtual" | "real"
    price: {
      currency: string
      amount: number
    }
  }
  earnings: {
    virtual: number
    estimated?: {
      currency: string
      amount: number
    }
    offer: {
      currency: string
      amount: number
    }
    real: {
      currency: string
      amount: number
    }
  }
}