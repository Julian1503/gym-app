export interface MembershipSubscription {
    subscriptionStart: string;
    subscriptionExpires: string;
    expired: boolean;
    amount: number;
    membershipId: number;
    memberId: number;
}