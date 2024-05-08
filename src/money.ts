export enum CurrencyCode {
  USD = "USD",
  EUR = "EUR",
  SuperCoins = "SSC"
}

export type MoneyType = { currency: string; amount: number }

export class Money {
    public currency: string
    public amount: number
  
    constructor(opts: MoneyType) {
      this.currency = opts.currency
      this.amount = opts.amount
    }
  
    public format(opts?: { round?: "floor" }): string {
      if (this.currency === CurrencyCode.SuperCoins) {
        return this.amount.toString()
      }
  
      const round = opts?.round
  
      const formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.currency,
        minimumFractionDigits: round === "floor" ? 0 : 2
      })
  
      if (round === "floor") {
        return formatter.format(Math.floor(this.amount / 100))
      }
  
      return formatter.format(this.amount / 100)
    }
  
    public isReal(): boolean {
      return !this.isVirtual()
    }
  
    public isVirtual(): boolean {
      return this.currency === CurrencyCode.SuperCoins
    }
  
    public static USD(amount: number): Money {
      return new Money({ currency: CurrencyCode.USD, amount })
    }

    public static EUR(amount: number): Money {
      return new Money({ currency: CurrencyCode.EUR, amount })
    }
  
    public static SuperCoins(amount: number): Money {
      return new Money({ currency: CurrencyCode.SuperCoins, amount })
    }
  
    public static Zero(): Money {
      return Money.USD(0)
    }
  }