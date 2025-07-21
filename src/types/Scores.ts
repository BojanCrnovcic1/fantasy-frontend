import type { Users } from "./Users";

export interface Scores {
    scoreId?: number;
    userId: number;
    seasonYear: number;
    totalScore: number | null;
    calculatedAt: Date | null;
    user: Users;
}