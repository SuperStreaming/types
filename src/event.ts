import { Timestamp } from "@firebase/firestore/lite"

import { type MoneyType } from "./money"
import { AuctionWithId, shouldGoFirst, shouldGoLast } from "./v2/auction"

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

export function getNextQuestionState(state: QuestionState) {
  switch (state) {
    case QuestionState.Undisplayed:
      return QuestionState.Upcoming

    case QuestionState.Upcoming:
      return QuestionState.Active

    case QuestionState.Active:
      return QuestionState.Suspended

    case QuestionState.Suspended:
      return QuestionState.Settled

    case QuestionState.Settled:
      return QuestionState.Closed

    case QuestionState.Closed:
      return QuestionState.Closed
  }
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
  AutoShopping = "autoShopping",
  Shopping = "shopping",
  ShopifyProduct = "shopifyProduct",
  Auction = "auction",
  CustomContent = "customContent",
  AuctionV2 = "auctionV2"
}

export type Platform = "twitch" | "youtube" | null

export type SegmentTypes = "question" | "shopping" | "auction"

export type QuestionType = "trivia" | "predict" | "recall"

export type StreamEventObject =
  | Question
  | ShoppingCard
  | ShoppingProductCard
  | AutoShoppingCard
  | CustomContentCard
  | AuctionCard
  | AuctionV2Card

export type StreamEvent = {
  id: string
  urlFriendlyId: string

  brand: string
  brandImgUrl?: string

  gameName: string
  subtitle: string
  featured: boolean

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

  autoshoppingGroup?: string

  auctionDefaults?: {
    duration: number
    popcornRule?: { withinSeconds: number; extendBySeconds: number }
    bidRules: { rangeMin: number; rangeMax?: number; bump: number }[]
    autoRun: boolean
    autoRunDelay: number
  }

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

  bettingProvider?: string

  tickets?: boolean
}

export type Event = StreamEvent

export function getAllQuestions(event: StreamEvent) {
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
  primary?: boolean
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
  undisplayed: boolean
  active: boolean
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
  objectType: StreamEventObjectType.Shopping
  shopifyCollectionId: string
}

export interface ShoppingProductCard extends StreamEventCard {
  objectType: StreamEventObjectType.ShopifyProduct
  shopifyProductId: string
  hijackUrl?: string
}

export interface AutoShoppingCard extends StreamEventCard {
  objectType: StreamEventObjectType.AutoShopping
  shopifyCollectionId: string
  showXItems: number
  rotateEvery: number
}

export interface CustomContentCard extends StreamEventCard {
  objectType: StreamEventObjectType.CustomContent
  imgUrl: string
  title: string
  btnText: string
  btnUrl: string
}

export interface AuctionCard extends StreamEventCard {
  objectType: StreamEventObjectType.Auction
  auctionId: number
}

export interface AuctionV2Card extends StreamEventCard {
  objectType: StreamEventObjectType.AuctionV2
  auctionId: string
}

export function cardsSorter<T = object>({
  cards,
  auctions,
  uid = "notauserid"
}: {
  cards: ((ShoppingProductCard | CustomContentCard | AuctionV2Card) & T)[]
  auctions: Record<string, AuctionWithId>
  uid?: string
}) {
  return cards.sort((a, b) => {
    const aAuction =
        a.objectType === StreamEventObjectType.AuctionV2
          ? auctions[a.auctionId]
          : undefined,
      bAuction =
        b.objectType === StreamEventObjectType.AuctionV2
          ? auctions[b.auctionId]
          : undefined

    if (aAuction || bAuction) {
      if (aAuction && bAuction) {
        if (
          shouldGoFirst({ auction: aAuction, uid }) &&
          !shouldGoFirst({ auction: bAuction, uid })
        )
          return -1
        if (
          shouldGoLast({ auction: bAuction }) &&
          !shouldGoLast({ auction: aAuction })
        )
          return -1
      } else if (aAuction) {
        if (shouldGoFirst({ auction: aAuction, uid })) return -1
        if (shouldGoLast({ auction: aAuction })) return 1
      } else if (bAuction) {
        if (shouldGoFirst({ auction: bAuction, uid })) return 1
        if (shouldGoLast({ auction: bAuction })) return -1
      }
    }

    const aIndex = cards.indexOf(a),
      bIndex = cards.indexOf(b)

    if (aIndex !== bIndex) {
      return aIndex < bIndex ? 1 : -1
    }

    return a.id.localeCompare(b.id)
  })
}
