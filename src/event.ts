import { Timestamp } from "firebase/firestore"
import { type MoneyType } from "./money"

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
  Undisplayed = "undisplayed",
  Upcoming = "upcoming",
  Active = "active",
  Suspended = "suspended",
  Settled = "settled",
  Closed = "closed"
}

export enum QuizEventCategory {
  All = "All",
  Affiliate = "Affiliate",
  Auction = "Auction",
  Shopping = "Shopping",
  Esports = "Esports",
  Sports = "Sports",
  Movies = "Movies",
  Shows = "Shows"
}

export enum StreamEventObjectType {
  Question = "question"
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

  questions?: Question[]
  objects?: Question[]

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

  closeSettledSeconds: number

  shopifyDiscountPerc?: number
  affiliate?: {
    url: string
    imageUrl: string
    description: string
  }
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

export interface QuizEventObject {
  objectType: StreamEventObjectType
}

export interface Question extends QuizEventObject {
  id: string
  text: string
  objectType: StreamEventObjectType.Question

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
  activeUntil?: Timestamp
  group?: string
  // stepMultiplier: number
  // coinMultiplier: number
}
