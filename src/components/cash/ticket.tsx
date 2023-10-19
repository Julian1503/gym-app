import React, {useRef} from 'react';
import {Button, css, Paper, Typography} from '@mui/material';
import {useReactToPrint} from 'react-to-print';
import {CashTransaction} from "../../@types/CashRegister";

const ticketStyles = css`
  padding: 16px;
  background-color: #fff;
`;

const Ticket: React.FC<{
    transaction: CashTransaction;
}> = ({transaction}) => {
    const ticketRef = useRef(null);
    const { memberName, memberLastname, memberIdentification, amount, transactionDate, paymentTypeName, membershipName, cashTransactionId} = transaction;
    const handlePrint = useReactToPrint({
        content: () => {
            if (ticketRef.current) {
                return ticketRef.current;
            }
            return null;
        },
    });

    return (
        <div>
            <Button variant="contained" onClick={handlePrint}>
                Print
            </Button>
            <div style={{display: 'none'}}>
                <Paper sx={{backgroundColor:"white", margin: 3, padding: 3, width: "300px", height: "400px"}} className={ticketStyles.styles} ref={ticketRef}>
                    <Typography color="black" variant="h6">Gymansium Membership Receipt</Typography>
                    <Typography color="black">Receipt ID: 324{cashTransactionId}</Typography>
                    <Typography color="black">Transaction Date: {transactionDate.toString()}</Typography>
                    <Typography color="black">Payment Method: {paymentTypeName}</Typography>
                    <Typography color="black">Payment Status: Paid</Typography>
                    <Typography color="black">Amount: ${amount}</Typography>
                    <Typography color="black">
                        Name: {memberName} {memberLastname}
                    </Typography>
                    <Typography color="black">ID: {memberIdentification}</Typography>
                    <Typography color="black">Membership Type: {membershipName}</Typography>
                    <Typography color="black">Facility: Gymansium Center</Typography>
                </Paper>
            </div>
        </div>
    );
};

export default Ticket;
