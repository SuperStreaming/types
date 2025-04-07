import { describe, expect, test } from "vitest"

import { remainingTimeString } from "../common"

describe("types test set", () => {
  test("ensure times string format", async () => {
    const now = new Date(),
      aSecond = 1000,
      aMinute = aSecond * 60,
      anHour = aMinute * 60,
      aDay = anHour * 24,
      aWeek = aDay * 7

    const twentySeconds = 20 * aSecond,
      threeMinutes = 3 * aMinute,
      twoHours = 2 * anHour,
      fiveDays = 5 * aDay,
      tenWeeks = 10 * aWeek

    // 10 weeks, 5 days, 2 hours, 3 minutes
    expect(
      remainingTimeString(
        new Date(+now + tenWeeks + fiveDays + twoHours + threeMinutes),
        now
      )
    ).toBe("10:wks 5:days")

    // 1 weeks, 5 days, 2 hours, 3 minutes
    expect(
      remainingTimeString(
        new Date(+now + aWeek + fiveDays + twoHours + threeMinutes),
        now
      )
    ).toBe("1:wk 5:days")

    // 5 days, 2 hours, 3 minutes
    expect(
      remainingTimeString(
        new Date(+now + fiveDays + twoHours + threeMinutes),
        now
      )
    ).toBe("5:days 2:hrs")

    // 1 day, 2 hours, 3 minutes
    expect(
      remainingTimeString(new Date(+now + aDay + twoHours + threeMinutes), now)
    ).toBe("1:day 2:hrs")

    // 2 hours, 3 minutes
    expect(
      remainingTimeString(new Date(+now + twoHours + threeMinutes), now)
    ).toBe("2:hrs 03:min")

    // 1 hours, 3 minutes
    expect(
      remainingTimeString(new Date(+now + anHour + threeMinutes), now)
    ).toBe("1:hr 03:min")

    // 3 minutes, 20 seconds
    expect(
      remainingTimeString(new Date(+now + threeMinutes + twentySeconds), now)
    ).toBe("03:min 20:sec")

    // 1 minutes, 20 seconds
    expect(
      remainingTimeString(new Date(+now + aMinute + twentySeconds), now)
    ).toBe("01:min 20:sec")

    // 20 seconds
    expect(remainingTimeString(new Date(+now + twentySeconds), now)).toBe(
      "20:sec"
    )

    // 1 seconds
    expect(remainingTimeString(new Date(+now + aSecond), now)).toBe("1:sec")

    // 0 seconds
    expect(remainingTimeString(now, now)).toBe("0:sec")
  })
})
