import { Timestamp } from "firebase/firestore"
import { type MoneyType } from "./money"
import { type LeaderboardPrizeDef } from "./prizes"

export const NONE_PLAYER = "None"

export enum EventState {
  Undisplayed = "undisplayed",
  Pending = "pending",
  Live = "live",
  Settled = "settled",
  Ended = "ended"
}

export enum SegmentState {
  Incomplete = "incomplete",
  Active = "active",
  Closed = "closed",
  Settled = "settled"
}

export enum QuestionState {
  Unsettled = "unsettled",
  Settled = "settled"
}

export enum QuizEventCategory {
  All = "All",
  Auction = "Auction",
  Shopping = "Shopping",
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
  autoauctionGroup?: string
  state: EventState
  startsAt: Timestamp
  streams: QuizEventStream[]
  team1: QuizEventTeam
  team2?: QuizEventTeam
  segments: Segment[]
  settleTimes: Record<string, number>
  shopifyCollection?: string

  whitelistIds?: string[]
  blacklistIds?: string[]
  blockFromListing?: boolean

  pool: {
    cash: Pool
    coins: Pool
  }

  numPlayers: number
  currentHighestStep: number
  steps: Record<number, number>

  chaser: string
  isOver?: boolean

  managementFee: number

  prizes?: LeaderboardPrizeDef
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
  name?: string
  logoUrl?: string
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
  state: QuestionState
  // stepMultiplier: number
  // coinMultiplier: number
}
