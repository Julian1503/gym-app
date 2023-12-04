export interface CashRegister {
    cashRegisterId: number;
    initialBalance: number;
    currentBalance: number;
    openDate: Date;
    open: boolean;
    closeDate: Date | null;
    difference: number;
}

export interface CashTransaction {
    cashTransactionId: number;
    amount: number;
    transactionDate: Date;
    description: string;
    cashRegisterId: number;
    paymentTypeId: number;
    paymentTypeName: string;
    membershipName: string;
    memberLastname: string;
    memberIdentification: string;
    memberName: string;
}

export interface PaymentType {
    paymentTypeId: number;
    name: string;
}

// export interface Payment {
//     paymentId: number;
//     amount: number;
//     paymentDate: string;
//     paymentTypeId: number;
// }