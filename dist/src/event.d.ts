import { Timestamp } from "@firebase/firestore/lite";
import { type MoneyType } from "./money";
import { AuctionWithId } from "./v2/auction";
export declare const NONE_PLAYER = "None";
export declare enum EventState {
    Undisplayed = "undisplayed",
    Pending = "pending",
    Live = "live",
    Settled = "settled",
    Ended = "ended"
}
export declare enum SegmentState {
    Incomplete = "incomplete",
    Active = "active",
    Closed = "closed",
    Settled = "settled"
}
export declare enum QuestionState {
    Undisplayed = "undisplayed",
    Upcoming = "upcoming",
    Active = "active",
    Suspended = "suspended",
    Settled = "settled",
    Closed = "closed"
}
export declare function getNextQuestionState(state: QuestionState): QuestionState.Upcoming | QuestionState.Active | QuestionState.Suspended | QuestionState.Settled | QuestionState.Closed;
export declare enum QuizEventCategory {
    All = "All",
    Affiliate = "Affiliate",
    Auction = "Auction",
    Shopping = "Shopping",
    Esports = "Esports",
    Sports = "Sports",
    Movies = "Movies",
    Shows = "Shows"
}
export declare enum StreamEventObjectType {
    Question = "question",
    AutoShopping = "autoShopping",
    Shopping = "shopping",
    ShopifyProduct = "shopifyProduct",
    Auction = "auction",
    CustomContent = "customContent",
    AuctionV2 = "auctionV2"
}
export type Platform = "twitch" | "youtube" | null;
export type SegmentTypes = "question" | "shopping" | "auction";
export type QuestionType = "trivia" | "predict" | "recall";
export type StreamEvent = {
    id: string;
    urlFriendlyId: string;
    brand: string;
    brandImgUrl?: string;
    gameName: string;
    subtitle: string;
    featured: boolean;
    type: "free" | "paid";
    category?: QuizEventCategory;
    subCategory?: string;
    state: EventState;
    startsAt: Timestamp;
    imageUrl?: string;
    streams: QuizEventStream[];
    team1: QuizEventTeam;
    team2?: QuizEventTeam;
    questions?: Question[];
    objects?: StreamEventObject[];
    segments: Segment[];
    settleTimes: Record<string, number>;
    shopifyStore?: {
        domain: string;
        publicToken: string;
    };
    shopifyCollection?: string;
    shopifyCollections?: string[];
    autoauctionGroup?: string;
    autoshoppingGroup?: string;
    auctionDefaults?: {
        duration: number;
        popcornRule?: {
            withinSeconds: number;
            extendBySeconds: number;
        };
        bidRules: {
            rangeMin: number;
            rangeMax?: number;
            bump: number;
        }[];
        autoRun: boolean;
        autoRunDelay: number;
    };
    whitelistIds?: string[];
    blacklistIds?: string[];
    blockFromListing?: boolean;
    pool: {
        cash: Pool;
        coins: Pool;
    };
    numPlayers: number;
    currentHighestStep: number;
    steps: Record<number, number>;
    chaser: string;
    isOver?: boolean;
    managementFee: number;
    closeSettledSeconds: number;
    shopifyDiscountPerc?: number;
    affiliate?: {
        url: string;
        imageUrl: string;
        description: string;
    };
    bettingProvider?: string;
    tickets?: boolean;
    short?: string;
};
export type Event = StreamEvent;
export declare function getAllQuestions(event: StreamEvent): Question[];
export type Segment = {
    type: SegmentTypes;
    state: SegmentState;
    name: string;
    activeUntil?: Timestamp;
    questions?: Question[];
    auctionIds: number[];
};
export interface QuizEventStream {
    platform: Platform;
    url: string;
    primary?: boolean;
}
export interface Pool {
    remaining: MoneyType;
    total: MoneyType;
}
export interface QuizEventTeam {
    name?: string;
    logoUrl?: string;
}
export interface StreamEventCard {
    id: string;
    objectType: StreamEventObjectType;
    undisplayed: boolean;
    active: boolean;
}
export interface Question extends StreamEventCard {
    text: string;
    objectType: StreamEventObjectType.Question;
    type: QuestionType;
    rapid?: {
        seconds: number;
    };
    rewards: {
        steps: number;
        coins: number;
    };
    options: string[];
    answers: string[];
    isRapid?: boolean;
    state: QuestionState;
    activeUntil?: Timestamp;
    group?: string;
}
export interface ShoppingCard extends StreamEventCard {
    objectType: StreamEventObjectType.Shopping;
    shopifyCollectionId: string;
}
export interface ShoppingProductCard extends StreamEventCard {
    objectType: StreamEventObjectType.ShopifyProduct;
    shopifyProductId: string;
    hijackUrl?: string;
}
export interface AutoShoppingCard extends StreamEventCard {
    objectType: StreamEventObjectType.AutoShopping;
    shopifyCollectionId: string;
    showXItems: number;
    rotateEvery: number;
}
export interface CustomContentCard extends StreamEventCard {
    objectType: StreamEventObjectType.CustomContent;
    imgUrl: string;
    title: string;
    btnText: string;
    btnUrl: string;
}
export interface AuctionCard extends StreamEventCard {
    objectType: StreamEventObjectType.Auction;
    auctionId: number;
}
export interface AuctionV2Card extends StreamEventCard {
    objectType: StreamEventObjectType.AuctionV2;
    auctionId: string;
}
export type StreamEventObject = Question | ShoppingCard | ShoppingProductCard | AutoShoppingCard | CustomContentCard | AuctionCard | AuctionV2Card;
export declare function cardsSorter<T = object>({ cards, auctions, uid, log }: {
    cards: (StreamEventObject & T)[];
    auctions: Record<string, AuctionWithId>;
    uid?: string;
    log?: boolean;
}): (StreamEventObject & T)[];
