export interface Member {
    personId: number | undefined;
    memberId: number | undefined;
    name: string;
    lastName: string;
    identifier: string;
    identifierType: string;
    phoneNumber: string;
    fingerPrintData: null | string;
    photo: null | string;
    street: string;
    houseNumber: string;
    floor: null | string;
    door: null | string;
    gender: string;
    birthDate: Date | null;
    user: null | string;
    memberNumber: string;
    joinDate: Date;
    emergencyContactName: string;
    emergencyContactPhone: string;
}