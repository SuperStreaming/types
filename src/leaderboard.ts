import { Timestamp } from "firebase/firestore"
import { LeaderboardPrizeDef } from "./prizes"

export enum LeaderboardState {
  Open = "open",
  Closed = "closed"
}

export type LeaderboardPlayerScore = {
  leaderboardId?: string
  userId: string
  username: string
  pictureUrl: string
  coinsEarned: number
  gamesPlayed: number
}

export type Leaderboard = {
  id: string
  state: LeaderboardState
  eventIds?: Array<string>
  definition: LeaderboardPrizeDef & {
    name: string
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}
