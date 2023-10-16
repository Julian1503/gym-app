import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import CashTransactionForm from './cashTransactionForm';
import {CashRegister, PaymentType} from "../../@types/CashRegister";
import {CashTransactionDetails} from "./cashTransactionDetails";
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type CashRegisterDetailParams = {
    cashRegisterSelected: CashRegister;
}

const CashRegisterDetail: React.FC<CashRegisterDetailParams> = ({cashRegisterSelected} : CashRegisterDetailParams) => {
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);

    useEffect(() => {
        apiService.get('payment-type/get-all', token)
            .then(res => {
                if(res.status === 200) {
                    setPaymentTypes(res.response);
                }
            });
    }, []);
    return (
        <div>
            {cashRegisterSelected ? (
                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{marginBottom: 3}}>
                                Detalles de la Caja Registradora
                            </Typography>
                            <Typography variant="body2">
                                Saldo inicial: {cashRegisterSelected.initialBalance}
                            </Typography>
                            <Typography variant="body2">
                                Saldo actual: {cashRegisterSelected.currentBalance}
                            </Typography>
                            <Typography variant="body2">
                                Fecha de apertura: {cashRegisterSelected.openDate.toString()}
                            </Typography>
                            <Typography variant="body2">
                                Fecha de cierre: {cashRegisterSelected.closeDate ? cashRegisterSelected.closeDate.toString() : 'No cerrada'}
                            </Typography>
                            <Typography variant="body2">
                                Diferencia: {cashRegisterSelected.difference}
                            </Typography>
                            {
                                cashRegisterSelected.open &&
                                <Button variant="contained" color="primary"  sx={{marginTop: 3}}>
                                    Cerrar Caja
                                </Button>
                            }
                        </CardContent>
                    </Card>
                    <CashTransactionDetails paymentTypes={paymentTypes} cashRegisterId={cashRegisterSelected.cashRegisterId}/>
                    {
                        cashRegisterSelected.open &&
                        <CashTransactionForm paymentTypes={paymentTypes} cashRegisterId={cashRegisterSelected.cashRegisterId} />
                    }
                </div>
            ) : (
                <Typography variant="h5" component="div">
                    Caja registradora no encontrada.
                </Typography>
            )}
        </div>
    );
}

export default CashRegisterDetail;




