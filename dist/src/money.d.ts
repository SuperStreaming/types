export declare enum CurrencyCode {
    USD = "USD",
    EUR = "EUR",
    SuperCoins = "SSC"
}
export type MoneyType = {
    currency: string;
    amount: number;
};
export declare class Money {
    currency: string;
    amount: number;
    constructor(opts: MoneyType);
    format(opts?: {
        round?: "floor";
    }): string;
    isReal(): boolean;
    isVirtual(): boolean;
    static USD(amount: number): Money;
    static EUR(amount: number): Money;
    static SuperCoins(amount: number): Money;
    static Zero(): Money;
}
