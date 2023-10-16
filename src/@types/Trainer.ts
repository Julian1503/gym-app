import {Specialty} from "./Specialty";

export interface Trainer {
    personId: number | undefined;
    trainerId: number | undefined;
    name: string;
    lastName: string;
    identifier: string;
    identifierType: string;
    phoneNumber: string;
    fingerPrintData: null | string;
    photo: undefined | string;
    street: string;
    houseNumber: string;
    floor: null | string;
    door: null | string;
    gender: string;
    birthDate: Date | null;
    user: null | string;
    trainerNumber: string;
    hireDate: Date;
    specialties?: Specialty[];
}