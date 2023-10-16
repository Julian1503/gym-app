export interface ExerciseDayPlan {
    exerciseDayPlanId: number;
    order: number;
    duration: Date;
    repetitions: number;
    series: number;
    warmup: boolean;
    weight: number;
    isFinished: boolean;
    exerciseId: number;
    planId: number;
}

export interface ExerciseDayPlanDto {
    exercisesDayPlanId?: number;
    order: number;
    duration: string;
    repetitions: number;
    series: number;
    warmup: boolean;
    weight: number;
    day: string;
    finished: boolean;
    exerciseId: number;
    exerciseName?: string;
    exerciseDescription?: string;
    planId: string | number;
}
