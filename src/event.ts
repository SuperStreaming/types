import { Timestamp } from "@firebase/firestore/lite"

import { ensureDate } from "./common"
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

export enum StreamEventType {
  Game = "Game",
  Auction = "Auction",
  Shopping = "Shopping"
}

/*
Games:
All 
Esports
Fitness and Health
IRL
Just Chatting
Movies/TV
Music
Politics
Science
Sports 
Stocks/Crypto
Talk Shows/Podcasts
Video Games

Auctions:
All
Apparel 
Antiques & Collectibles
Arts & Entertainment
Autos & Vehicles
Beauty & Fitness
Business & Industrial
Consumer Electronics
Food & Drink
Games
Health
Home & Garden
People & Society
Pets & Animals
Sports
Toys & Hobbies

Shopping
All
Apparel 
Antiques & Collectibles
Arts & Entertainment
Autos & Vehicles
Beauty & Fitness
Business & Industrial
Consumer Electronics
Food & Drink
Games
Health
Home & Garden
People & Society
Pets & Animals
Sports
Toys & Hobbies
*/

export enum StreamEventGameCategory {
  All = "All Games",
  Esports = "Esports",
  FitnessHealth = "Fitness and Health",
  IRL = "IRL",
  JustChatting = "Just Chatting",
  MoviesTV = "Movies/TV",
  Music = "Music",
  Politics = "Politics",
  Science = "Science",
  Sports = "Sports",
  StocksCrypto = "Stocks/Crypto",
  TalkShowsPodcasts = "Talk Shows/Podcasts",
  VideoGames = "Video Games"
}

export enum StreamEventAuctionCategory {
  All = "All Auctions",
  Apparel = "Apparel",
  AntiquesCollectibles = "Antiques & Collectibles",
  ArtsEntertainment = "Arts & Entertainment",
  AutosVehicles = "Autos & Vehicles",
  BeautyFitness = "Beauty & Fitness",
  BusinessIndustrial = "Business & Industrial",
  ConsumerElectronics = "Consumer Electronics",
  FoodDrink = "Food & Drink",
  Games = "Games",
  Health = "Health",
  HomeGarden = "Home & Garden",
  PeopleSociety = "People & Society",
  PetsAnimals = "Pets & Animals",
  Sports = "Sports",
  ToysHobbies = "Toys & Hobbies"
}

export enum StreamEventShoppingCategory {
  All = "All Shopping",
  Apparel = "Apparel",
  AntiquesCollectibles = "Antiques & Collectibles",
  ArtsEntertainment = "Arts & Entertainment",
  AutosVehicles = "Autos & Vehicles",
  BeautyFitness = "Beauty & Fitness",
  BusinessIndustrial = "Business & Industrial",
  ConsumerElectronics = "Consumer Electronics",
  FoodDrink = "Food & Drink",
  Games = "Games",
  Health = "Health",
  HomeGarden = "Home & Garden",
  PeopleSociety = "People & Society",
  PetsAnimals = "Pets & Animals",
  Sports = "Sports",
  ToysHobbies = "Toys & Hobbies"
}

export type StreamEventCategory =
  | StreamEventGameCategory
  | StreamEventAuctionCategory
  | StreamEventShoppingCategory

export function allShoppingCategories() {
  return Object.entries(StreamEventShoppingCategory)
}

export function allAuctionCategories() {
  return Object.entries(StreamEventAuctionCategory)
}

export function allGameCategories() {
  return Object.entries(StreamEventGameCategory)
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

export type Platform = "twitch" | "youtube" | "kick" | null

export type SegmentTypes = "question" | "shopping" | "auction"

export type QuestionType = "trivia" | "predict" | "recall"

export type BrandInfo = {
  id?: string
  brand: string
  brandImgUrl?: string
  mobileDomain?: string
  ytChannel?: string
  ytChannelId?: string
  twitchChannel?: string
}

type _StreamEvent = BrandInfo & {
  id: string
  urlFriendlyId: string

  gameName: string
  subtitle: string
  featured: boolean

  type: "free" | "paid"

  subCategory?: string
  state: EventState
  createdAt?: Timestamp
  updatedAt?: Timestamp
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
  short?: string
  shorts?: string[]
}

export type AuctionEvent = _StreamEvent & {
  eventType: StreamEventType.Auction
  category: StreamEventAuctionCategory
}

export type ShoppingEvent = {
  eventType: StreamEventType.Shopping
  category: StreamEventShoppingCategory
} & _StreamEvent

export type GameEvent = {
  eventType: StreamEventType.Game
  category: StreamEventGameCategory
} & _StreamEvent

export type StreamEvent = AuctionEvent | ShoppingEvent | GameEvent
export type Event = StreamEvent

export function getEventType(
  event: Pick<StreamEvent, "eventType" | "category">
) {
  return event.eventType || event.category
}

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

  highlightBetween?: { start: number; end?: number }
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

export type StreamEventObject =
  | Question
  | ShoppingCard
  | ShoppingProductCard
  | AutoShoppingCard
  | CustomContentCard
  | AuctionCard
  | AuctionV2Card

export function cardsSorter<T = object>({
  cards,
  auctions,
  uid = "notauserid",
  log = false
}: {
  cards: (StreamEventObject & T)[]
  auctions: Record<string, AuctionWithId>
  uid?: string
  log?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const _log = log ? console.log : (..._args: any[]) => {}
  _log(
    "Sorting cards:",
    cards.map((card) => [
      `${card.id}-${card.objectType === StreamEventObjectType.AuctionV2 ? card.auctionId : null}`,
      card.objectType
    ])
  )
  const arrToSort = cards.slice()
  return arrToSort.sort((a, b) => {
    const aAuction =
        a.objectType === StreamEventObjectType.AuctionV2
          ? auctions[a.auctionId]
          : undefined,
      bAuction =
        b.objectType === StreamEventObjectType.AuctionV2
          ? auctions[b.auctionId]
          : undefined

    if (a.objectType === StreamEventObjectType.AuctionV2 && !aAuction) {
      return 1
    }
    if (b.objectType === StreamEventObjectType.AuctionV2 && !bAuction) {
      return -1
    }

    const aId = `${a.id} | ${aAuction?.id}`,
      bId = `${b.id} | ${bAuction?.id}`

    if (aAuction || bAuction) {
      const aFirst = aAuction
          ? shouldGoFirst({ auction: aAuction, uid })
          : false,
        bFirst = bAuction ? shouldGoFirst({ auction: bAuction, uid }) : false,
        aLast = aAuction ? shouldGoLast({ auction: aAuction }) : false,
        bLast = bAuction ? shouldGoLast({ auction: bAuction }) : false

      if (aAuction && bAuction) {
        if (aFirst && !bFirst) {
          _log(aId, "goes before", bId)
          return -1
        }
        if (aFirst && bFirst) {
          return 0
        }
        if (aLast && !bLast) {
          _log(bId, "goes before", aId)
          return -1
        }

        if (bLast && aLast) {
          return ensureDate(aAuction.endTime) < ensureDate(bAuction.endTime)
            ? -1
            : 1
        }
      }

      if (aAuction) {
        if (shouldGoFirst({ auction: aAuction, uid })) {
          _log(aId, "goes before", bId)
          return -1
        }
        if (shouldGoLast({ auction: aAuction })) {
          _log(aId, "goes after", bId)
          return 1
        }
        _log("no special ordering for", aId)
      } else if (bAuction) {
        if (shouldGoFirst({ auction: bAuction, uid })) {
          _log(bId, "goes before", aId)
          return 1
        }
        if (shouldGoLast({ auction: bAuction })) {
          _log(bId, "goes after", aId)
          return -1
        }
        _log("no special ordering for", bId)
      }
    }

    const aIndex = cards.indexOf(a),
      bIndex = cards.indexOf(b)

    _log(a.id, a.objectType, b.id, b.objectType, aIndex, bIndex)

    if (aIndex !== bIndex) {
      const aBefore = aIndex < bIndex
      _log(
        aBefore ? aId : bId,
        aBefore ? aIndex : bIndex,
        "goes before",
        aBefore ? bId : aId,
        aBefore ? bIndex : aIndex
      )
      return aBefore ? -1 : 1
    }

    return a.id.localeCompare(b.id)
  })
}
