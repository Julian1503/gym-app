import {Trainer} from "./Trainer";
import {DayPlan} from "./DayPlan";

export interface Plan {
    planId: number;
    name: string;
    memberId: number;
    trainers: Trainer[];
    dayPlans: DayPlan[];
}