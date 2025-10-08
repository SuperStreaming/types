"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamEventType = exports.StreamEventObjectType = exports.StreamEventCategory = exports.QuestionState = exports.SegmentState = exports.EventState = exports.NONE_PLAYER = void 0;
exports.getNextQuestionState = getNextQuestionState;
exports.allCategories = allCategories;
exports.getStreamType = getStreamType;
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
/*
https://app.clickup.com/t/86c5ttayg
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
var StreamEventCategory;
(function (StreamEventCategory) {
    StreamEventCategory["All"] = "All";
    StreamEventCategory["AntiquesCollectibles"] = "Antiques & Collectibles";
    StreamEventCategory["ArtsEntertainment"] = "Arts & Entertainment";
    StreamEventCategory["AutosVehicles"] = "Autos & Vehicles";
    StreamEventCategory["BeautyFitness"] = "Beauty & Fitness";
    StreamEventCategory["BusinessIndustrial"] = "Business & Industrial";
    StreamEventCategory["ConsumerElectronics"] = "Consumer Electronics";
    StreamEventCategory["FoodDrink"] = "Food & Drink";
    StreamEventCategory["Games"] = "Games";
    StreamEventCategory["Health"] = "Health";
    StreamEventCategory["HomeGarden"] = "Home & Garden";
    StreamEventCategory["PeopleSociety"] = "People & Society";
    StreamEventCategory["PetsAnimals"] = "Pets & Animals";
    StreamEventCategory["Sports"] = "Sports";
    StreamEventCategory["ToysHobbies"] = "Toys & Hobbies";
})(StreamEventCategory || (exports.StreamEventCategory = StreamEventCategory = {}));
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
function* allCategories() {
    for (const [k, v] of Object.entries(StreamEventCategory)) {
        yield [k, v];
    }
}
var StreamEventType;
(function (StreamEventType) {
    StreamEventType["Game"] = "Game";
    StreamEventType["Auction"] = "Auction";
    StreamEventType["Shopping"] = "Shopping";
})(StreamEventType || (exports.StreamEventType = StreamEventType = {}));
function getStreamType(event) {
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