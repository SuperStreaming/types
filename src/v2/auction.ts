import { Timestamp } from "firebase/firestore"

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
  Upcoming,
  Running,
  Finished
}

export enum AuctionStartOption {
  Scheduled,
  Manual,
  OnBid
}

export type Auction = {
  title: string
  imgUrl: string
  variantId: number

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
