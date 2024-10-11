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
  Question = "question",
  Shopping = "shopping",
  ShoppingProduct = "shoppingProduct",
  AutoShopping = "autoShopping",
  Auction = "auction"
}

export type Platform = "twitch" | "youtube" | null

export type SegmentTypes = "question" | "shopping" | "auction"

export type QuestionType = "trivia" | "predict" | "recall"

export type StreamEventObject =
  | Question
  | ShoppingCard
  | ShoppingProductCard
  | AutoShoppingCard
  | AuctionCard

export type Event = {
  id: string
  gameName: string
  subtitle: string
  type: "free" | "paid"
  category?: QuizEventCategory
  subCategory?: string
  state: EventState
  startsAt: Timestamp
  imageUrl?: string
  streams: QuizEventStream[]
  team1: QuizEventTeam
  team2?: QuizEventTeam

  questions?: Question[]
  objects?: StreamEventObject[]

  segments: Segment[]
  settleTimes: Record<string, number>

  shopifyStore?: {
    domain: string
    publicToken: string
  }

  shopifyCollection?: string
  shopifyCollections?: string[]

  autoauctionGroup?: string
  autoauctionGroups?: string[]

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

export function getAllQuestions(event: Event) {
  return [
    ...(event.questions || []),
    ...(event.segments || []).flatMap((x) => x.questions || []),
    ...((event.objects || []).filter(
      (x) => x.objectType === StreamEventObjectType.Question
    ) as Question[])
  ]
}

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

export interface StreamEventCard {
  id: string
  objectType: StreamEventObjectType
}

export interface Question extends StreamEventCard {
  text: string
  objectType: StreamEventObjectType.Question

  type: QuestionType

  rapid?: {
    seconds: number
  }
  rewards: {
    steps: number
    coins: number
  }
  options: string[]
  answers: string[]

  isRapid?: boolean
  state: QuestionState
  activeUntil?: Timestamp
  group?: string
  // stepMultiplier: number
  // coinMultiplier: number
}

export interface ShoppingCard extends StreamEventCard {
  shopifyCollectionId: string
}

export interface ShoppingProductCard extends ShoppingCard {
  productId: string
}

export interface AutoShoppingCard extends ShoppingCard {
  showXItems: number
  rotateEvery: number
}

export interface AuctionCard extends StreamEventCard {
  auctionId: number
}
