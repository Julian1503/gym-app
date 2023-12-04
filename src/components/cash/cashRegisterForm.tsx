import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Paper, TextField, Typography,} from '@mui/material';

import {CashRegister} from '../../@types/CashRegister';
import {useTheme} from "@mui/material/styles";
import {DateField} from "@mui/x-date-pickers";
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

interface CashRegisterFormProps {
    onSubmit: (cashRegister: CashRegister) => void;
    onCancel: () => void;
    selectedItem?: CashRegister | null;
}

const CashRegisterForm: React.FC<CashRegisterFormProps> = ({
                                                               onSubmit,
                                                               selectedItem,
                                                               onCancel,
                                                           }) => {

    const [initialBalance, setInitialBalance] = useState(
        selectedItem ? selectedItem.initialBalance : 0
    );
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [openDate, setOpenDate] = useState<Date>(selectedItem?.openDate || new Date());
    const theme = useTheme();
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

    useEffect(() => {
        const apiService = ApiService.getInstance();
        apiService.get('cash-register/last-registration', token)
            .then(res =>{
                setInitialBalance(res.response.currentBalance);
            });
    }, [token]);

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if (initialBalance < 0) {
            setFieldErrors({ initialBalance: 'You cannot enter negative values' });
        } else {
            const cashRegister: CashRegister = {
                cashRegisterId: selectedItem ? selectedItem.cashRegisterId : 0,
                initialBalance: initialBalance,
                currentBalance: initialBalance,
                openDate: openDate,
                open: true,
                closeDate: null,
                difference: 0,
            };

            apiService.post('/cash-register/create', cashRegister, token)
                .then(res => {
                    if(res.status === 200) {
                        onSubmit(res.response);
                    } else {
                        setFieldErrors({ openDate: 'We just can create one cash register per day' });
                    }
                })
                .catch(err => {
                    if (err.message) {
                        const errorResponse = JSON.parse(err.message);
                        const errorMessage = errorResponse.errorResponse[0];
                        const field = errorMessage.split("'")[1];
                        setFieldErrors({ ...fieldErrors, [field]: errorMessage });
                    }
                });

            setFieldErrors({});
        }
    };

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    Cash Register
                </Typography>
                <form>
                    <Grid container justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Saldo Inicial"
                                color="primary"
                                type="number"
                                value={initialBalance}
                                onChange={(e) => setInitialBalance(parseFloat(e.target.value))}
                                error={!!fieldErrors.initialBalance}
                                helperText={fieldErrors.initialBalance}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <DateField
                                label="Open Date"
                                sx={{width: "100%"}}
                                value={openDate}
                                onChange={(date : Date | null) => setOpenDate(date || new Date())}
                                format="dd/MM/yyyy"
                                InputLabelProps={{
                                    style: {color: theme.palette.text.primary},
                                }}
                            />

                            {fieldErrors.openDate && (
                                <Typography variant="body2" color="error">
                                    {fieldErrors.openDate}
                                </Typography>
                            )}
                        </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" gap={4} alignItems="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                </form>
            </Box>
        </Paper>
    );
};

export default CashRegisterForm;
