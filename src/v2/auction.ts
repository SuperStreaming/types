import { Timestamp } from "@firebase/firestore/lite"

import { StreamEvent, StreamEventObjectType } from "../event"

// All frontend dates are stored as timestamps on firestore
export type Datestamp = Date | Timestamp

export type PlaceBidProps = {
  auctionId: string
  amount: number
  picUrl: string
  username: string
}

export type Bid = {
  uid: string
  amount: number
  picUrl: string
  username: string
  time: Datestamp
  auctionId: string
}

export enum AuctionStatus {
  Upcoming = "Upcoming",
  Running = "Running",
  Finished = "Finished"
}

export enum AuctionStartOption {
  Scheduled = "Scheduled",
  Manual = "Manual",
  OnBid = "OnBid"
}

export enum BuyUrlState {
  Created = "Created",
  Bought = "Bought",
}

export type Auction = {
  shopId: string
  appId: string
  shopName: string

  title: string
  imgUrl: string

  productId: number | string
  variantId: number | string
  currency: string

  orderNumber?: number
  orderName?: string

  duration?: number
  createdAt: Datestamp
  updatedAt: Datestamp

  startTime?: Datestamp
  endTime?: Datestamp

  startOption: AuctionStartOption
  status: AuctionStatus

  startingPrice: number
  reservePrice: number

  bidRules: { rangeMin: number; rangeMax?: number; bump: number }[]
  popcornRule?: { withinSeconds: number; extendBySeconds: number }

  winnerLockedMinutes?: number

  highestBid?: Bid
  bid?: Bid

  group: string

  reminderEmailsSent?: number

  noMoreBids?: boolean
  tags: string[]

  buyUrl?: BuyUrlState
}

export type AuctionWithId = Auction & { id: string }

export enum AuctionError {
  NotStarted = 101,

  InsufficientBid = 201,

  ServerError = 500,

  NotRunning = 901,
  Ended = 902
}

export type AuctionErrorResp = [AuctionError, string] | undefined

export function isAuctionOpen(auction: AuctionWithId) {
  return (
    auction.status === AuctionStatus.Running ||
    (auction.startOption === AuctionStartOption.OnBid &&
      auction.status === AuctionStatus.Upcoming)
  )
}

export function auctionSorter({
  auctions,
  eventAuctionIds,
  uid = "notauserid",
  pendingAuctionId = "notapendingauctionid"
}: {
  auctions: AuctionWithId[]
  eventAuctionIds: string[]
  uid?: string
  pendingAuctionId?: string
}) {
  return auctions.sort((a, b) => {
    const aHasWon = uid == a.bid?.uid,
      bHasWon = uid === b.bid?.uid

    if (aHasWon !== bHasWon) {
      if (aHasWon) {
        return -1 // a first
      }
      if (bHasWon) {
        return 1 // b first
      }
    }

    // Auction open for bidding takes precedence over everything
    const aOpen = isAuctionOpen(a),
      bOpen = isAuctionOpen(b)
    if (aOpen !== bOpen) {
      if (aOpen) {
        return -1 // a first
      }
      if (bOpen) {
        return 1 // b first
      }
    }

    // Then pending
    if (a.id === pendingAuctionId) return -1
    if (b.id === pendingAuctionId) return 1

    const aFinished = a.status === AuctionStatus.Finished,
      bFinished = b.status === AuctionStatus.Finished

    // Then finisheds go last
    if (aFinished !== bFinished) {
      if (bFinished) {
        return -1 // a first
      }
      if (aFinished) {
        return 1 // b first
      }
    }

    const aIndex = eventAuctionIds.indexOf(a.id)
    const bIndex = eventAuctionIds.indexOf(b.id)

    if (aIndex === bIndex) {
      return a.id.localeCompare(b.id)
    }

    return aIndex - bIndex
  })
}

export function getAuctionEventIds(event: StreamEvent) {
  return (event.objects || [])
    .filter((product) => StreamEventObjectType.AuctionV2 === product.objectType)
    .map(({ auctionId }) => auctionId)
}

export function sortEventAuctions(
  event: StreamEvent,
  auctions: AuctionWithId[] = [],
  uid = "notauserid",
  pendingAuctionId = "notapendingauctionid"
): AuctionWithId[] {
  const eventAuctionIds = getAuctionEventIds(event)
  return auctionSorter({ auctions, eventAuctionIds, uid, pendingAuctionId })
}
