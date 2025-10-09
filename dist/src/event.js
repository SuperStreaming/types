"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamEventObjectType = exports.StreamEventShoppingCategory = exports.StreamEventAuctionCategory = exports.StreamEventGameCategory = exports.StreamEventType = exports.QuestionState = exports.SegmentState = exports.EventState = exports.NONE_PLAYER = void 0;
exports.getNextQuestionState = getNextQuestionState;
exports.allShoppingCategories = allShoppingCategories;
exports.allAuctionCategories = allAuctionCategories;
exports.allGameCategories = allGameCategories;
exports.getEventType = getEventType;
exports.getAllQuestions = getAllQuestions;
exports.cardsSorter = cardsSorter;
const common_1 = require("./common");
const auction_1 = require("./v2/auction");
exports.NONE_PLAYER = "None";
var EventState;
(function (EventState) {
    EventState["Undisplayed"] = "undisplayed";
    EventState["Pending"] = "pending";
    EventState["Live"] = "live";
    EventState["Settled"] = "settled";
    EventState["Ended"] = "ended";
})(EventState || (exports.EventState = EventState = {}));
var SegmentState;
(function (SegmentState) {
    SegmentState["Incomplete"] = "incomplete";
    SegmentState["Active"] = "active";
    SegmentState["Closed"] = "closed";
    SegmentState["Settled"] = "settled";
})(SegmentState || (exports.SegmentState = SegmentState = {}));
var QuestionState;
(function (QuestionState) {
    QuestionState["Undisplayed"] = "undisplayed";
    QuestionState["Upcoming"] = "upcoming";
    QuestionState["Active"] = "active";
    QuestionState["Suspended"] = "suspended";
    QuestionState["Settled"] = "settled";
    QuestionState["Closed"] = "closed";
})(QuestionState || (exports.QuestionState = QuestionState = {}));
function getNextQuestionState(state) {
    switch (state) {
        case QuestionState.Undisplayed:
            return QuestionState.Upcoming;
        case QuestionState.Upcoming:
            return QuestionState.Active;
        case QuestionState.Active:
            return QuestionState.Suspended;
        case QuestionState.Suspended:
            return QuestionState.Settled;
        case QuestionState.Settled:
            return QuestionState.Closed;
        case QuestionState.Closed:
            return QuestionState.Closed;
    }
}
var StreamEventType;
(function (StreamEventType) {
    StreamEventType["Game"] = "Game";
    StreamEventType["Auction"] = "Auction";
    StreamEventType["Shopping"] = "Shopping";
})(StreamEventType || (exports.StreamEventType = StreamEventType = {}));
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
var StreamEventGameCategory;
(function (StreamEventGameCategory) {
    StreamEventGameCategory["All"] = "All Games";
    StreamEventGameCategory["Esports"] = "Esports";
    StreamEventGameCategory["FitnessHealth"] = "Fitness and Health";
    StreamEventGameCategory["IRL"] = "IRL";
    StreamEventGameCategory["JustChatting"] = "Just Chatting";
    StreamEventGameCategory["MoviesTV"] = "Movies/TV";
    StreamEventGameCategory["Music"] = "Music";
    StreamEventGameCategory["Politics"] = "Politics";
    StreamEventGameCategory["Science"] = "Science";
    StreamEventGameCategory["Sports"] = "Sports";
    StreamEventGameCategory["StocksCrypto"] = "Stocks/Crypto";
    StreamEventGameCategory["TalkShowsPodcasts"] = "Talk Shows/Podcasts";
    StreamEventGameCategory["VideoGames"] = "Video Games";
})(StreamEventGameCategory || (exports.StreamEventGameCategory = StreamEventGameCategory = {}));
var StreamEventAuctionCategory;
(function (StreamEventAuctionCategory) {
    StreamEventAuctionCategory["All"] = "All Auctions";
    StreamEventAuctionCategory["Apparel"] = "Apparel";
    StreamEventAuctionCategory["AntiquesCollectibles"] = "Antiques & Collectibles";
    StreamEventAuctionCategory["ArtsEntertainment"] = "Arts & Entertainment";
    StreamEventAuctionCategory["AutosVehicles"] = "Autos & Vehicles";
    StreamEventAuctionCategory["BeautyFitness"] = "Beauty & Fitness";
    StreamEventAuctionCategory["BusinessIndustrial"] = "Business & Industrial";
    StreamEventAuctionCategory["ConsumerElectronics"] = "Consumer Electronics";
    StreamEventAuctionCategory["FoodDrink"] = "Food & Drink";
    StreamEventAuctionCategory["Games"] = "Games";
    StreamEventAuctionCategory["Health"] = "Health";
    StreamEventAuctionCategory["HomeGarden"] = "Home & Garden";
    StreamEventAuctionCategory["PeopleSociety"] = "People & Society";
    StreamEventAuctionCategory["PetsAnimals"] = "Pets & Animals";
    StreamEventAuctionCategory["Sports"] = "Sports";
    StreamEventAuctionCategory["ToysHobbies"] = "Toys & Hobbies";
})(StreamEventAuctionCategory || (exports.StreamEventAuctionCategory = StreamEventAuctionCategory = {}));
var StreamEventShoppingCategory;
(function (StreamEventShoppingCategory) {
    StreamEventShoppingCategory["All"] = "All Shopping";
    StreamEventShoppingCategory["Apparel"] = "Apparel";
    StreamEventShoppingCategory["AntiquesCollectibles"] = "Antiques & Collectibles";
    StreamEventShoppingCategory["ArtsEntertainment"] = "Arts & Entertainment";
    StreamEventShoppingCategory["AutosVehicles"] = "Autos & Vehicles";
    StreamEventShoppingCategory["BeautyFitness"] = "Beauty & Fitness";
    StreamEventShoppingCategory["BusinessIndustrial"] = "Business & Industrial";
    StreamEventShoppingCategory["ConsumerElectronics"] = "Consumer Electronics";
    StreamEventShoppingCategory["FoodDrink"] = "Food & Drink";
    StreamEventShoppingCategory["Games"] = "Games";
    StreamEventShoppingCategory["Health"] = "Health";
    StreamEventShoppingCategory["HomeGarden"] = "Home & Garden";
    StreamEventShoppingCategory["PeopleSociety"] = "People & Society";
    StreamEventShoppingCategory["PetsAnimals"] = "Pets & Animals";
    StreamEventShoppingCategory["Sports"] = "Sports";
    StreamEventShoppingCategory["ToysHobbies"] = "Toys & Hobbies";
})(StreamEventShoppingCategory || (exports.StreamEventShoppingCategory = StreamEventShoppingCategory = {}));
function allShoppingCategories() {
    return Object.entries(StreamEventShoppingCategory);
}
function allAuctionCategories() {
    return Object.entries(StreamEventAuctionCategory);
}
function allGameCategories() {
    return Object.entries(StreamEventGameCategory);
}
var StreamEventObjectType;
(function (StreamEventObjectType) {
    StreamEventObjectType["Question"] = "question";
    StreamEventObjectType["AutoShopping"] = "autoShopping";
    StreamEventObjectType["Shopping"] = "shopping";
    StreamEventObjectType["ShopifyProduct"] = "shopifyProduct";
    StreamEventObjectType["Auction"] = "auction";
    StreamEventObjectType["CustomContent"] = "customContent";
    StreamEventObjectType["AuctionV2"] = "auctionV2";
})(StreamEventObjectType || (exports.StreamEventObjectType = StreamEventObjectType = {}));
function getEventType(event) {
    return event.eventType || event.category;
}
function getAllQuestions(event) {
    return [
        ...(event.questions || []),
        ...(event.segments || []).flatMap((x) => x.questions || []),
        ...(event.objects || []).filter((x) => x.objectType === StreamEventObjectType.Question)
    ];
}
function cardsSorter({ cards, auctions, uid = "notauserid", log = false }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const _log = log ? console.log : (..._args) => { };
    _log("Sorting cards:", cards.map((card) => [
        `${card.id}-${card.objectType === StreamEventObjectType.AuctionV2 ? card.auctionId : null}`,
        card.objectType
    ]));
    const arrToSort = cards.slice();
    return arrToSort.sort((a, b) => {
        const aAuction = a.objectType === StreamEventObjectType.AuctionV2
            ? auctions[a.auctionId]
            : undefined, bAuction = b.objectType === StreamEventObjectType.AuctionV2
            ? auctions[b.auctionId]
            : undefined;
        if (a.objectType === StreamEventObjectType.AuctionV2 && !aAuction) {
            return 1;
        }
        if (b.objectType === StreamEventObjectType.AuctionV2 && !bAuction) {
            return -1;
        }
        const aId = `${a.id} | ${aAuction === null || aAuction === void 0 ? void 0 : aAuction.id}`, bId = `${b.id} | ${bAuction === null || bAuction === void 0 ? void 0 : bAuction.id}`;
        if (aAuction || bAuction) {
            const aFirst = aAuction
                ? (0, auction_1.shouldGoFirst)({ auction: aAuction, uid })
                : false, bFirst = bAuction ? (0, auction_1.shouldGoFirst)({ auction: bAuction, uid }) : false, aLast = aAuction ? (0, auction_1.shouldGoLast)({ auction: aAuction }) : false, bLast = bAuction ? (0, auction_1.shouldGoLast)({ auction: bAuction }) : false;
            if (aAuction && bAuction) {
                if (aFirst && !bFirst) {
                    _log(aId, "goes before", bId);
                    return -1;
                }
                if (aFirst && bFirst) {
                    return 0;
                }
                if (aLast && !bLast) {
                    _log(bId, "goes before", aId);
                    return -1;
                }
                if (bLast && aLast) {
                    return (0, common_1.ensureDate)(aAuction.endTime) < (0, common_1.ensureDate)(bAuction.endTime)
                        ? -1
                        : 1;
                }
            }
            if (aAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: aAuction, uid })) {
                    _log(aId, "goes before", bId);
                    return -1;
                }
                if ((0, auction_1.shouldGoLast)({ auction: aAuction })) {
                    _log(aId, "goes after", bId);
                    return 1;
                }
                _log("no special ordering for", aId);
            }
            else if (bAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: bAuction, uid })) {
                    _log(bId, "goes before", aId);
                    return 1;
                }
                if ((0, auction_1.shouldGoLast)({ auction: bAuction })) {
                    _log(bId, "goes after", aId);
                    return -1;
                }
                _log("no special ordering for", bId);
            }
        }
        const aIndex = cards.indexOf(a), bIndex = cards.indexOf(b);
        _log(a.id, a.objectType, b.id, b.objectType, aIndex, bIndex);
        if (aIndex !== bIndex) {
            const aBefore = aIndex < bIndex;
            _log(aBefore ? aId : bId, aBefore ? aIndex : bIndex, "goes before", aBefore ? bId : aId, aBefore ? bIndex : aIndex);
            return aBefore ? -1 : 1;
        }
        return a.id.localeCompare(b.id);
    });
}
//# sourceMappingURL=event.js.map