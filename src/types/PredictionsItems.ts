import type { Predictions } from "./Predictions";
import type { Teams } from "./Teams";

export interface PredictionItems {
    predictionItemId?: number;
    predictionId: number;
    teamId: number;
    position: number;
    team: Teams;
    prediction: Predictions;
}