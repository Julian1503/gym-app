import {CashTransaction} from "../../@types/CashRegister";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Ticket from "./ticket";

type CashTransactionDetailsParams = {
    cashTransactions: CashTransaction[];
}

export const CashTransactionDetails = ({cashTransactions}: CashTransactionDetailsParams) => {
    return (
        <TableContainer sx={{marginTop:2, maxHeight:'300px', overflowY: 'auto'}} component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Member</TableCell>
                        <TableCell align="right">Membership</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cashTransactions.length > 0 ? cashTransactions.map((row) => (
                        <TableRow
                            key={row.cashTransactionId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {
                                    row.transactionDate.toString()
                                }
                            </TableCell>
                            <TableCell align="right">{`${row.memberLastname} ${row.memberName}`}</TableCell>
                            <TableCell align="right">{row.membershipName}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">
                                {row.paymentTypeName}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="center">
                                <Ticket transaction={row} />
                            </TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={7} align="center">There are not transactions</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}