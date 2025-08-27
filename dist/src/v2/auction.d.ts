import { Timestamp } from "@firebase/firestore/lite";
import { StreamEvent } from "../event";
export type Datestamp = Date | Timestamp;
export type PlaceBidProps = {
    auctionId: string;
    amount: number;
    picUrl: string;
    username: string;
};
export type Bid = {
    uid: string;
    amount: number;
    picUrl: string;
    username: string;
    time: Datestamp;
    auctionId: string;
};
export declare enum AuctionStatus {
    Upcoming = "Upcoming",
    Running = "Running",
    Finished = "Finished"
}
export declare enum AuctionStartOption {
    Scheduled = "Scheduled",
    Manual = "Manual",
    OnBid = "OnBid"
}
export declare enum BuyUrlState {
    Created = "Created",
    Bought = "Bought"
}
export type Auction = {
    shopId: string;
    appId: string;
    shopName: string;
    title: string;
    imgUrl: string;
    productId: number | string;
    variantId: number | string;
    currency: string;
    orderNumber?: number;
    orderName?: string;
    duration?: number;
    createdAt: Datestamp;
    updatedAt: Datestamp;
    startTime?: Datestamp;
    endTime?: Datestamp;
    startOption: AuctionStartOption;
    status: AuctionStatus;
    startingPrice: number;
    reservePrice: number;
    bidRules: {
        rangeMin: number;
        rangeMax?: number;
        bump: number;
    }[];
    popcornRule?: {
        withinSeconds: number;
        extendBySeconds: number;
    };
    winnerLockedMinutes?: number;
    highestBid?: Bid;
    bid?: Bid;
    group: string;
    reminderEmailsSent?: number;
    noMoreBids?: boolean;
    tags: string[];
    buyUrl?: BuyUrlState;
};
export type AuctionWithId = Auction & {
    id: string;
};
export declare enum AuctionError {
    NotStarted = 101,
    InsufficientBid = 201,
    ServerError = 500,
    NotRunning = 901,
    Ended = 902
}
export type AuctionErrorResp = [AuctionError, string] | undefined;
export declare function isAuctionOpen(auction: AuctionWithId): boolean;
export declare function auctionSorter({ auctions, eventAuctionIds, uid, pendingAuctionId }: {
    auctions: AuctionWithId[];
    eventAuctionIds: string[];
    uid?: string;
    pendingAuctionId?: string;
}): AuctionWithId[];
export declare function getAuctionEventIds(event: StreamEvent): string[];
export declare function sortEventAuctions(event: StreamEvent, auctions?: AuctionWithId[], uid?: string, pendingAuctionId?: string): AuctionWithId[];
type AuctionOrderProps = {
    auction: AuctionWithId;
    uid: string;
};
export declare function shouldGoFirst({ auction, uid }: AuctionOrderProps): boolean;
export declare function shouldGoLast({ auction }: {
    auction: AuctionWithId;
}): boolean;
export {};
