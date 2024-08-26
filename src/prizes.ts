export type LeaderboardPrize = {
  name: string
  pictureUrl: string
}

export type LeaderboardBracket = {
  name: string
  prizes: LeaderboardPrize[]
  position: number
}

export type LeaderboardPrizeDef = {
  pictureUrl: string
  breakdown: Array<LeaderboardBracket>
  participationPrizes: LeaderboardPrize[]
}
