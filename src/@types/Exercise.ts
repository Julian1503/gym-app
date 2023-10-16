import {Specialty} from "./Specialty";
import {Step} from "./Step";
import {Equipment} from "./Equipment";

export interface Exercise {
    name: string;
    description: string;
    muscleGroup: string;
    difficultyLevel: number;
    photo: string | null;
    steps: Step[];
    specialties: Specialty[];
    equipments: Equipment[];
    exerciseId?: number;
}