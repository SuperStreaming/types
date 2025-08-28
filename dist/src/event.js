"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamEventObjectType = exports.QuizEventCategory = exports.QuestionState = exports.SegmentState = exports.EventState = exports.NONE_PLAYER = void 0;
exports.getNextQuestionState = getNextQuestionState;
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
var QuizEventCategory;
(function (QuizEventCategory) {
    QuizEventCategory["All"] = "All";
    QuizEventCategory["Affiliate"] = "Affiliate";
    QuizEventCategory["Auction"] = "Auction";
    QuizEventCategory["Shopping"] = "Shopping";
    QuizEventCategory["Esports"] = "Esports";
    QuizEventCategory["Sports"] = "Sports";
    QuizEventCategory["Movies"] = "Movies";
    QuizEventCategory["Shows"] = "Shows";
})(QuizEventCategory || (exports.QuizEventCategory = QuizEventCategory = {}));
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
function getAllQuestions(event) {
    return [
        ...(event.questions || []),
        ...(event.segments || []).flatMap((x) => x.questions || []),
        ...(event.objects || []).filter((x) => x.objectType === StreamEventObjectType.Question)
    ];
}
function cardsSorter({ cards, auctions, uid = "notauserid" }) {
    return cards.slice().sort((a, b) => {
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
        // const aId = `${a.id} | ${aAuction?.id}`,
        //   bId = `${b.id} | ${bAuction?.id}`
        if (aAuction || bAuction) {
            const aFirst = aAuction
                ? (0, auction_1.shouldGoFirst)({ auction: aAuction, uid })
                : false, bFirst = bAuction ? (0, auction_1.shouldGoFirst)({ auction: bAuction, uid }) : false, aLast = aAuction ? (0, auction_1.shouldGoLast)({ auction: aAuction }) : false, bLast = bAuction ? (0, auction_1.shouldGoLast)({ auction: bAuction }) : false;
            if (aAuction && bAuction) {
                if (aFirst && !bFirst) {
                    // console.log(aId, "goes before", bId)
                    return -1;
                }
                if (aFirst && bFirst) {
                    return 0;
                }
                if (aLast && !bLast) {
                    // console.log(bId, "goes before", aId)
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
                    // console.log(aId, "goes before", bId)
                    return -1;
                }
                if ((0, auction_1.shouldGoLast)({ auction: aAuction })) {
                    // console.log(aId, "goes after", bId)
                    return 1;
                }
                // console.log("no special ordering for", aId)
            }
            else if (bAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: bAuction, uid })) {
                    // console.log(bId, "goes before", aId)
                    return 1;
                }
                if ((0, auction_1.shouldGoLast)({ auction: bAuction })) {
                    // console.log(bId, "goes after", aId)
                    return -1;
                }
                // console.log("no special ordering for", bId)
            }
        }
        const aIndex = cards.indexOf(a), bIndex = cards.indexOf(b);
        // console.log(a.id, a.objectType, b.id, b.objectType, aIndex, bIndex)
        if (aIndex !== bIndex) {
            const aBefore = aIndex < bIndex;
            // console.log(
            //   aBefore ? aId : bId,
            //   aBefore ? aIndex : bIndex,
            //   "goes before",
            //   aBefore ? bId : aId,
            //   aBefore ? bIndex : aIndex
            // )
            return aBefore ? -1 : 1;
        }
        return a.id.localeCompare(b.id);
    });
}
//# sourceMappingURL=event.js.map