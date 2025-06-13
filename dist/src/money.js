"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = exports.CurrencyCode = void 0;
var CurrencyCode;
(function (CurrencyCode) {
    CurrencyCode["USD"] = "USD";
    CurrencyCode["EUR"] = "EUR";
    CurrencyCode["SuperCoins"] = "SSC";
})(CurrencyCode || (exports.CurrencyCode = CurrencyCode = {}));
class Money {
    constructor(opts) {
        this.currency = opts.currency;
        this.amount = opts.amount;
    }
    format(opts) {
        if (this.currency === CurrencyCode.SuperCoins) {
            return this.amount.toString();
        }
        const round = opts === null || opts === void 0 ? void 0 : opts.round;
        const formatter = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: this.currency,
            minimumFractionDigits: round === "floor" ? 0 : 2
        });
        if (round === "floor") {
            return formatter.format(Math.floor(this.amount / 100));
        }
        return formatter.format(this.amount / 100);
    }
    isReal() {
        return !this.isVirtual();
    }
    isVirtual() {
        return this.currency === CurrencyCode.SuperCoins;
    }
    static USD(amount) {
        return new Money({ currency: CurrencyCode.USD, amount });
    }
    static EUR(amount) {
        return new Money({ currency: CurrencyCode.EUR, amount });
    }
    static SuperCoins(amount) {
        return new Money({ currency: CurrencyCode.SuperCoins, amount });
    }
    static Zero() {
        return Money.USD(0);
    }
}
exports.Money = Money;
//# sourceMappingURL=money.js.map