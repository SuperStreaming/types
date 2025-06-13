"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionError = exports.BuyUrlState = exports.AuctionStartOption = exports.AuctionStatus = void 0;
exports.isAuctionOpen = isAuctionOpen;
exports.auctionSorter = auctionSorter;
exports.getAuctionEventIds = getAuctionEventIds;
exports.sortEventAuctions = sortEventAuctions;
const event_1 = require("../event");
var AuctionStatus;
(function (AuctionStatus) {
    AuctionStatus["Upcoming"] = "Upcoming";
    AuctionStatus["Running"] = "Running";
    AuctionStatus["Finished"] = "Finished";
})(AuctionStatus || (exports.AuctionStatus = AuctionStatus = {}));
var AuctionStartOption;
(function (AuctionStartOption) {
    AuctionStartOption["Scheduled"] = "Scheduled";
    AuctionStartOption["Manual"] = "Manual";
    AuctionStartOption["OnBid"] = "OnBid";
})(AuctionStartOption || (exports.AuctionStartOption = AuctionStartOption = {}));
var BuyUrlState;
(function (BuyUrlState) {
    BuyUrlState["Created"] = "Created";
    BuyUrlState["Bought"] = "Bought";
})(BuyUrlState || (exports.BuyUrlState = BuyUrlState = {}));
var AuctionError;
(function (AuctionError) {
    AuctionError[AuctionError["NotStarted"] = 101] = "NotStarted";
    AuctionError[AuctionError["InsufficientBid"] = 201] = "InsufficientBid";
    AuctionError[AuctionError["ServerError"] = 500] = "ServerError";
    AuctionError[AuctionError["NotRunning"] = 901] = "NotRunning";
    AuctionError[AuctionError["Ended"] = 902] = "Ended";
})(AuctionError || (exports.AuctionError = AuctionError = {}));
function isAuctionOpen(auction) {
    return (auction.status === AuctionStatus.Running ||
        (auction.startOption === AuctionStartOption.OnBid &&
            auction.status === AuctionStatus.Upcoming));
}
function auctionSorter({ auctions, eventAuctionIds, uid = "notauserid", pendingAuctionId = "notapendingauctionid" }) {
    return auctions.sort((a, b) => {
        var _a, _b;
        const aHasWon = uid == ((_a = a.bid) === null || _a === void 0 ? void 0 : _a.uid), bHasWon = uid === ((_b = b.bid) === null || _b === void 0 ? void 0 : _b.uid);
        if (aHasWon !== bHasWon) {
            if (aHasWon) {
                return -1; // a first
            }
            if (bHasWon) {
                return 1; // b first
            }
        }
        // Auction open for bidding takes precedence over everything
        const aOpen = isAuctionOpen(a), bOpen = isAuctionOpen(b);
        if (aOpen !== bOpen) {
            if (aOpen) {
                return -1; // a first
            }
            if (bOpen) {
                return 1; // b first
            }
        }
        // Then pending
        if (a.id === pendingAuctionId)
            return -1;
        if (b.id === pendingAuctionId)
            return 1;
        const aFinished = a.status === AuctionStatus.Finished, bFinished = b.status === AuctionStatus.Finished;
        // Then finisheds go last
        if (aFinished !== bFinished) {
            if (bFinished) {
                return -1; // a first
            }
            if (aFinished) {
                return 1; // b first
            }
        }
        const aIndex = eventAuctionIds.indexOf(a.id);
        const bIndex = eventAuctionIds.indexOf(b.id);
        if (aIndex === bIndex) {
            return a.id.localeCompare(b.id);
        }
        return aIndex - bIndex;
    });
}
function getAuctionEventIds(event) {
    return (event.objects || [])
        .filter((product) => event_1.StreamEventObjectType.AuctionV2 === product.objectType)
        .map(({ auctionId }) => auctionId);
}
function sortEventAuctions(event, auctions = [], uid = "notauserid", pendingAuctionId = "notapendingauctionid") {
    const eventAuctionIds = getAuctionEventIds(event);
    return auctionSorter({ auctions, eventAuctionIds, uid, pendingAuctionId });
}
//# sourceMappingURL=auction.js.map