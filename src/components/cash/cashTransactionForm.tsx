import React, {useEffect, useState} from 'react';
import {Button, TextField, Grid, Typography, Paper, Autocomplete} from '@mui/material';
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CashTransaction, PaymentType} from "../../@types/CashRegister";
import {Member} from "../../@types/Member";
import {Membership} from "../../@types/Membership";

interface CashTransactionFormProps {
    cashRegisterId: number | undefined;
    paymentTypes: PaymentType[];
    handleSubmit: () => void;
}

const CashTransactionForm: React.FC<CashTransactionFormProps> = ({ cashRegisterId, paymentTypes , handleSubmit}) => {
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [paymentTypeSelected, setPaymentTypeSelected] = useState<number>(0);
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [members, setMembers] = useState<Member[]>([]);
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
    const [fieldErrors, setFieldErrors] = useState<any>({});
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    useEffect(() => {
        const apiService = ApiService.getInstance();
        apiService.get('/member/get-all', token)
            .then(res => setMembers(res.response))
            .catch(err => console.error(err));
        apiService.get('/membership/get-all', token)
            .then(res => setMemberships(res.response))
            .catch(err => console.error(err));
    }, []);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const submit = () => {

        if(!selectedMembership) {
            setFieldErrors({...fieldErrors, membership: 'Please select a membership'});
            return;
        }

        if(!selectedMemberId) {
            setFieldErrors({...fieldErrors, member: 'Please select a member'});
            return;
        }

        if(!paymentTypeSelected) {
            setFieldErrors({...fieldErrors, paymentType: 'Please select a payment type'});
            return;
        }

        const transactionData = {
            cashRegisterId,
            amount: selectedMembership?.price || 0.0,
            description,
            paymentTypeId: paymentTypeSelected,
            membershipId: selectedMembership?.membershipId,
            memberId: selectedMemberId,
        };

      apiService.post('cash-transaction/create', transactionData, token)
          .then(response => {
                handleSubmit();
                setFieldErrors({});
              }
            )
          .catch(error =>
              console.log(error)
            );
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" component="div">
                Create a new transaction
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Amount"
                        variant="outlined"
                        type="number"
                        disabled
                        fullWidth
                        value={selectedMembership?.price || 0}
                        onChange={handleAmountChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Description"
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
                        renderInput={(params) => <TextField helperText={fieldErrors.paymentType}
                                                            error={Boolean(fieldErrors.paymentType)} {...params} key={params.id} label="Payment Type" variant="outlined" />}
                        value={paymentTypes.find(paymentType => paymentType.paymentTypeId === paymentTypeSelected) || null}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={members}
                        getOptionLabel={(option) => `${option.name} (ID: ${option.identifier})`}
                        onChange={(event, value) => setSelectedMemberId(value?.personId || null)}
                        renderInput={(params) => <TextField helperText={fieldErrors.member}
                                                            error={Boolean(fieldErrors.member)} {...params} key={params.id} label="Member" variant="outlined" />}
                        value={members.find(member => member.personId === selectedMemberId) || null}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        options={memberships}
                        getOptionLabel={(option) => `${option.name} ($${option.price})`}
                        onChange={(event, value) => setSelectedMembership(value)}
                        renderInput={(params) => <TextField
                            helperText={fieldErrors.membership}
                            error={Boolean(fieldErrors.membership)}
                            {...params} key={params.id} label="Membership" variant="outlined" />}
                        value={memberships.find(membership => membership.membershipId === selectedMembership?.membershipId) || null}
                    />
                </Grid>
                <Grid item xs={12} sx={{
                    marginTop:3
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                    >
                        Register transaction
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CashTransactionForm;