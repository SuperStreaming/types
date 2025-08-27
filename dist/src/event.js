"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamEventObjectType = exports.QuizEventCategory = exports.QuestionState = exports.SegmentState = exports.EventState = exports.NONE_PLAYER = void 0;
exports.getNextQuestionState = getNextQuestionState;
exports.getAllQuestions = getAllQuestions;
exports.cardsSorter = cardsSorter;
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
    return cards.sort((a, b) => {
        const aAuction = a.objectType === StreamEventObjectType.AuctionV2
            ? auctions[a.auctionId]
            : undefined, bAuction = b.objectType === StreamEventObjectType.AuctionV2
            ? auctions[b.auctionId]
            : undefined;
        if (aAuction || bAuction) {
            if (aAuction && bAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: aAuction, uid }) &&
                    !(0, auction_1.shouldGoFirst)({ auction: bAuction, uid }))
                    return -1;
                if ((0, auction_1.shouldGoLast)({ auction: bAuction }) &&
                    !(0, auction_1.shouldGoLast)({ auction: aAuction }))
                    return -1;
            }
            else if (aAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: aAuction, uid }))
                    return -1;
                if ((0, auction_1.shouldGoLast)({ auction: aAuction }))
                    return 1;
            }
            else if (bAuction) {
                if ((0, auction_1.shouldGoFirst)({ auction: bAuction, uid }))
                    return 1;
                if ((0, auction_1.shouldGoLast)({ auction: bAuction }))
                    return -1;
            }
        }
        const aIndex = cards.indexOf(a), bIndex = cards.indexOf(b);
        if (aIndex !== bIndex) {
            return aIndex < bIndex ? 1 : -1;
        }
        return a.id.localeCompare(b.id);
    });
}
//# sourceMappingURL=event.js.map