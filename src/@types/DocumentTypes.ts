export type SelectType = {
    id: number;
    name: string;
    value: string;
}
export const documentTypes : SelectType[] = [
    {id: 1, name: "National ID", value: "NationalID"},
    {id: 2, name: "Passport", value: "Passport"},
    {id: 3, name: "Driver's license", value: "DriverLicense"},
];