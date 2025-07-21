import type { ActualStandings } from "./ActualStandings";
import type { PredictionItems } from "./PredictionsItems";

export interface Teams {
    teamId?: number;
    name: string;
    shortName: string;
    logoUrl: string;
    actualStandings?: ActualStandings;
    predictionItems?: PredictionItems[];
}