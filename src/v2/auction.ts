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
  title: string
  imgUrl: string
  productId: number | string
  shopId: string
  appId: string

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

  bid?: Bid

  group: string
}

export enum AuctionError {
  NotStarted = 101,

  InsufficientBid = 201,

  ServerError = 500,

  NotRunning = 901,
  Ended = 902
}

export type AuctionErrorResp = [AuctionError, string] | undefined
