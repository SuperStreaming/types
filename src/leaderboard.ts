import { Timestamp } from "firebase/firestore"

export type LeaderboardState = "open" | "closed"

export type LeaderboardPlayerScore = {
  leaderboardId?: string
  userId: string
  username: string
  pictureUrl: string
  coinsEarned: number
  gamesPlayed: number
}

export type LeaderboardBracket = {
  name: string
  prizes: Array<{
    name: string
    pictureUrl: string
  }>
  position: number
}

export type Leaderboard = {
  id: string
  state: "open" | "closed"
  eventIds?: Array<string>
  definition: {
    name: string
    breakdown: Array<LeaderboardBracket>
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}
