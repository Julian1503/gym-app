import {useEffect, useState} from "react";
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CashTransaction, PaymentType} from "../../@types/CashRegister";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

type CashTransactionDetailsParams = {
    cashRegisterId: number;
    paymentTypes: PaymentType[];
}

export const CashTransactionDetails = ({cashRegisterId, paymentTypes}: CashTransactionDetailsParams) => {
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [cashTransactions, setCashTransactions] = useState<CashTransaction[]>([]);

    useEffect(() => {
        apiService.get(`cash-transaction/get-by-cash-register/${cashRegisterId}`, token)
            .then(res => {
                if(res.status === 200) {
                    setCashTransactions(res.response);
                }
            });
    }, [cashRegisterId]);

    return (
        <TableContainer sx={{marginTop:2}} component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell align="right">Monto</TableCell>
                        <TableCell align="right">Tipo</TableCell>
                        <TableCell align="right">Descripción</TableCell>
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
                                    row.transactionDate.toString().split('T')[0]
                                }
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">
                                {
                                paymentTypes.map((paymentType) => (
                                    paymentType.paymentTypeId === row.paymentTypeId ? paymentType.name : ''
                                 ))
                                }
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={4} align="center">No hay transacciones</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}