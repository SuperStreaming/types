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
export declare enum StreamEventType {
    Game = "Game",
    Auction = "Auction",
    Shopping = "Shopping"
}
export declare enum StreamEventGameCategory {
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
export declare enum StreamEventAuctionCategory {
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
export declare enum StreamEventShoppingCategory {
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
export type StreamEventCategory = StreamEventGameCategory | StreamEventAuctionCategory | StreamEventShoppingCategory;
export declare function allShoppingCategories(): [string, StreamEventShoppingCategory][];
export declare function allAuctionCategories(): [string, StreamEventAuctionCategory][];
export declare function allGameCategories(): [string, StreamEventGameCategory][];
export declare enum StreamEventObjectType {
    Question = "question",
    AutoShopping = "autoShopping",
    Shopping = "shopping",
    ShopifyProduct = "shopifyProduct",
    Auction = "auction",
    CustomContent = "customContent",
    AuctionV2 = "auctionV2"
}
export type Platform = "twitch" | "youtube" | "kick" | null;
export type SegmentTypes = "question" | "shopping" | "auction";
export type QuestionType = "trivia" | "predict" | "recall";
export type BrandInfo = {
    id?: string;
    brand: string;
    brandImgUrl?: string;
    mobileDomain?: string;
    ytChannel?: string;
    ytChannelId?: string;
    twitchChannel?: string;
};
type _StreamEvent = BrandInfo & {
    id: string;
    urlFriendlyId: string;
    gameName: string;
    subtitle: string;
    featured: boolean;
    type: "free" | "paid";
    subCategory?: string;
    state: EventState;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
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
    shorts?: string[];
};
export type AuctionEvent = _StreamEvent & {
    eventType: StreamEventType.Auction;
    category: StreamEventAuctionCategory;
};
export type ShoppingEvent = {
    eventType: StreamEventType.Shopping;
    category: StreamEventShoppingCategory;
} & _StreamEvent;
export type GameEvent = {
    eventType: StreamEventType.Game;
    category: StreamEventGameCategory;
} & _StreamEvent;
export type StreamEvent = AuctionEvent | ShoppingEvent | GameEvent;
export type Event = StreamEvent;
export declare function getEventType(event: Pick<StreamEvent, "eventType" | "category">): StreamEventType;
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
    highlightBetween?: {
        start: number;
        end?: number;
    };
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
export {};
