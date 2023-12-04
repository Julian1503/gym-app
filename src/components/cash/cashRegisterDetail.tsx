import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Container, Grid, Typography} from '@mui/material';
import CashTransactionForm from './cashTransactionForm';
import {CashRegister, CashTransaction, PaymentType} from "../../@types/CashRegister";
import {CashTransactionDetails} from "./cashTransactionDetails";
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type CashRegisterDetailParams = {
    cashRegisterSelected: CashRegister;
}

const CashRegisterDetail: React.FC<CashRegisterDetailParams> = ({cashRegisterSelected} : CashRegisterDetailParams) => {
    const apiService = ApiService.getInstance();
    const [cashRegister, setCashRegister] = useState<CashRegister | null>(cashRegisterSelected); // [1
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
    const [cashTransactions, setCashTransactions] = useState<CashTransaction[]>([]);

    useEffect(() => {
        if(cashRegister) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            fetchTransactions();
        }
    }, [cashRegister]);

    const fetchTransactions = () => {
        apiService.get(`cash-transaction/get-by-cash-register/${cashRegister?.cashRegisterId}`, token)
            .then(res => {
                if(res.status === 200) {
                    setCashTransactions(res.response);
                }
            });
    };

    const fetchCashRegister = () => {
        apiService.get(`cash-register/get/${cashRegisterSelected.cashRegisterId}`, token)
            .then(res => {
                if(res.status === 200) {
                    setCashRegister(res.response);
                }
            });
    }

    useEffect(() => {
        apiService.get('payment-type/get-all', token)
            .then(res => {
                if(res.status === 200) {
                    setPaymentTypes(res.response);
                }
            });
    }, [apiService, token]);

    const handleCloseCashRegister = () => {
        apiService.put(`cash-register/close/${cashRegisterSelected.cashRegisterId}`,{}, token)
            .then(res => {
                if(res.status === 200) {
                    fetchCashRegister();
                }
            });
        fetchTransactions();
    }

    return (
        <Container>
            {cashRegisterSelected ? (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Cash Register Details
                                </Typography>
                                <Typography variant="body2">
                                    Initial Balance: {cashRegister?.initialBalance}
                                </Typography>
                                <Typography variant="body2">
                                    Current Balance: {cashRegister?.currentBalance}
                                </Typography>
                                <Typography variant="body2">
                                    Open Date: {cashRegister?.openDate.toString()}
                                </Typography>
                                <Typography variant="body2">
                                    Close Date: {cashRegister?.closeDate ? cashRegister?.closeDate.toString() : 'Not closed'}
                                </Typography>
                                <Typography variant="body2">
                                    Difference: {cashRegister?.difference}
                                </Typography>
                                {cashRegister?.open && (
                                    <Button onClick={handleCloseCashRegister} variant="contained" color="primary" sx={{ marginTop: 3 }}>
                                        Close Cash Register
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <CashTransactionDetails cashTransactions={cashTransactions} />
                    </Grid>
                    {cashRegister?.open && (
                        <Grid item xs={12}>
                            <CashTransactionForm paymentTypes={paymentTypes} handleSubmit={fetchCashRegister} cashRegisterId={cashRegister?.cashRegisterId} />
                        </Grid>
                    )}
                </Grid>
            ) : (
                <Typography variant="h5" component="div">
                    Cash Register was not found
                </Typography>
            )}
        </Container>
    );
}

export default CashRegisterDetail;




