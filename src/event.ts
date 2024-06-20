import { Timestamp } from "firebase/firestore"
import { type MoneyType } from "./money"

export enum QuizEventCategory {
  All = "All",
  CashPool = "Cash Pool",
  Esports = "Esports",
  Sports = "Sports",
  Movies = "Movies",
  Shows = "Shows"
}

export type Event = {
  id: string
  gameName: string
  subtitle: string
  type: "free" | "paid"
  category?: QuizEventCategory
  state: EventState
  startsAt: Timestamp
  streams: QuizEventStream[]
  team1: QuizEventTeam
  team2: QuizEventTeam
  segments: Segment[]
  shopifyCollection?: string

  pool: {
    cash: Pool
    coins: Pool
  }

  chaser: string
  isOver?: boolean

  managementFee: number
}
export type Platform = "twitch" | "youtube" | null

export type SegmentTypes = "question" | "shopping" | "auction"

export type Segment = {
  type: SegmentTypes
  state: SegmentState
  name: string
  activeUntil?: Timestamp
  questions?: Question[]
  auctionIds: number[]
}

export interface QuizEventStream {
  platform: Platform
  url: string
}

export interface Pool {
  remaining: MoneyType
  total: MoneyType
}

export interface QuizEventTeam {
  name: string
  logoUrl: string
}

export enum EventState {
  Pending = "pending",
  Live = "live",
  Ended = "ended"
}

export enum SegmentState {
  Incomplete = "incomplete",
  Active = "active",
  Closed = "closed",
  Settled = "settled"
}

export type Question = {
  id: string
  text: string
  type: "trivia" | "predict" | "recall"
  rapid?: {
    seconds: number
  }
  rewards: {
    steps: number
    coins: number
  }
  options: string[]
  answers: string[]

  isRapid: boolean
  state: string
  stepMultiplier: number
  coinMultiplier: number
}
