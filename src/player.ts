import { Timestamp } from "@firebase/firestore/lite"

import { type MoneyType } from "./money"

export type Answers = Record<string, string>
export type RapidTimers = Record<string, Timestamp>

export type Player = {
  id: string
  playerId: string
  eventId: string
  username: string
  pictureUrl: string
  currentStep: number
  correctAnswers: number
  answers: Answers
  answerTimes: { [key: string]: Timestamp }
  reactionTime: number
  rapid?: RapidTimers
  isOnHotStreak: boolean
  isCaught: boolean
  isChaser: boolean
  ticket: {
    purchasedAt: Timestamp
    type: "virtual" | "real"
    price: {
      currency: string
      amount: number
    }
  }
  earnings: {
    cash: {
      estimated?: MoneyType
      offer: MoneyType
      real: MoneyType
    }
    coins: {
      estimated?: MoneyType
      offer: MoneyType
      real: MoneyType
    }
  }
}
