import type { Teams } from "./Teams";

export interface ActualStandings {
    actualStandingId?: number;
    seasonYear: number;
    teamId: number;
    position: number;
    updateAt: Date;
    team: Teams;
}