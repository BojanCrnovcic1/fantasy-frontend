import type { PredictionItems } from "./PredictionsItems";
import type { Users } from "./Users";

export interface Predictions {
    predictionId?: number;
    userId: number;
    createdAt: Date;
    predictionItems: PredictionItems[];
    user: Users;
}