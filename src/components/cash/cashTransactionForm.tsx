import React, {useEffect, useState} from 'react';
import {Button, TextField, Grid, Typography, Paper, Autocomplete} from '@mui/material';
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {PaymentType} from "../../@types/CashRegister";

interface CashTransactionFormProps {
    cashRegisterId: number;
    paymentTypes: PaymentType[];
}

const CashTransactionForm: React.FC<CashTransactionFormProps> = ({ cashRegisterId, paymentTypes }) => {
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [paymentTypeSelected, setPaymentTypeSelected] = useState<number>(0);
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);


    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        const transactionData = {
            cashRegisterId,
            amount: parseFloat(amount),
            description,
            paymentTypeId: paymentTypeSelected,
        };

      apiService.post('cash-transaction/create', transactionData, token)
          .then(response =>
              console.log(response)
            )
          .catch(error =>
              console.log(error)
            );
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" component="div">
                Registrar Transacción de Efectivo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Monto"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={paymentTypes}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, value) => setPaymentTypeSelected(value?.paymentTypeId || 0)}
                        renderInput={(params) => <TextField {...params} key={params.id} label="Payment Type" variant="outlined" />}
                        value={paymentTypes.find(paymentType => paymentType.paymentTypeId === paymentTypeSelected) || null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Registrar Transacción
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CashTransactionForm;