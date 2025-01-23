import { Timestamp } from "@firebase/firestore/lite"

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

export type Auction = {
  shopId: string
  appId: string

  title: string
  imgUrl: string

  productId: number | string
  variantId: number | string

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
