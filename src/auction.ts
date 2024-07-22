export type PlaceBidProps = {
  ident: number
  amount: number
  picUrl: string
  username: string
}

export type BidData = {
  email?: string
  auction_id: number
  amount: number
  quantity: number
  public: number
  proxy_bid: number
  uid?: string
  username?: string
  picUrl?: string
}

export type BidRule = {
  bid_from: string
  bid_to: string
  rate: string
  maximum_rate: string
}

export type Auction = {
  id: number
  shopify_product_id: number
  product_handle: string
  product_title: string
  popcorn_bidding: number
  max_popcorn_bid: number
  extend_deadline_by: string
  extend_deadline_within: string
  start_date: string
  id_auction_status: number
  end_date: string
  booking_amount: string
  buy_now_price: string
  display_auction_days: number
  auction_status: "Pending" | "Running" | "Finished"
  reserve_price: string
  start_price: string
  proxy_bidding_on: number
  auto_pay_enable: number
  active: number
  joining_fee_enable: number
  date_add: string
  date_upd: string
  max_bid: string
  total_bid: number
  now: string
}

export type AuctionContainer = {
  auction: Auction
  bid_rule?: BidRule[]
  winnerLockedMinutes?: number
  cust_date: string
  booking_product: unknown
  buyUrl: string
  imgUrl: string
  bid?: BidData
  groups?: string[]
}

export type AutoAuctionDef = {
  auctionId: number
  secondsDuration: number
}

export type AutoAuctionsDef = {
  defaultSecondsDuration: number
  secondsDelayBetween: number
  auctions: AutoAuctionDef[]
}
