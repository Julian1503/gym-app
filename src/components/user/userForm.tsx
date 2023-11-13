import {TextField, Typography, Grid, Autocomplete} from '@mui/material';
import ApiService from "../../services/apiService";
import { User } from "../../@types/User";
import React, {useEffect, useState} from "react";
import { useTheme } from "@mui/material/styles";
import { FormContainer } from "../form/form-container";
import { SubmitButton } from "../form/submit-button";
import { FormProps } from "../../@types/Props";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {Member} from "../../@types/Member";
import {ErrorSnackbar} from "../../pages/crud/errorSnackbar";

export const UsersForm: React.FC<FormProps<User>> = ({ onSubmit, selectedItem, onCancel, handleUpdate }) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const roles = ['Admin', 'User'];
    const [username, setUsername] = useState(selectedItem?.username || '');
    const [password, setPassword] = useState(selectedItem?.password || '');
    const [email, setEmail] = useState(selectedItem?.email || '');
    const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(selectedItem?.memberId);
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>(selectedItem?.roles || []);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const theme = useTheme();

    useEffect(() => {
        const apiService = ApiService.getInstance();
        apiService.get('/member/get-all', token)
            .then(res => setMembers(res.response))
            .catch(err => console.error(err));
    }, []);


    const handleSubmit = () => {
        setErrorMessage(null);
        const apiService = ApiService.getInstance();
        if (selectedMemberId) {
            apiService.post('/user/create-user', {
                userId: 0,
                username,
                password,
                email,
                memberId: selectedMemberId,
                roles: selectedRoles
            } as User , token)
                .then(res => {
                    if(res.status == 200) {
                        onSubmit(res.response);
                    } else {
                        setErrorMessage(res.message)
                    }
                })
                .catch(err => {
                    if (err.message) {
                        const errorResponse = JSON.parse(err.message);
                        const errorMessage = errorResponse.errorResponse[0];
                        const field = errorMessage.split("'")[1];
                        setErrorMessage(`${field}: ${errorMessage}`);
                    }
                });
        }
    };

    return (
        <form>
            <ErrorSnackbar message={errorMessage} onClose={()=>setErrorMessage(null)}/>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>User Information</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Username"
                            color="primary"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            color="primary"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            color="primary"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            options={members}
                            getOptionLabel={(option) => `${option.name} (ID: ${option.identifier})`}
                            onChange={(event, value) => setSelectedMemberId(value?.personId || 0)}
                            renderInput={(params) => <TextField {...params} key={params.id} label="Member" variant="outlined" />}
                            value={members.find(member => member.personId === selectedMemberId) || null}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                            <Autocomplete
                                multiple
                                id="roles-selector"
                                options={roles}
                                value={selectedRoles}
                                onChange={(event, newValue) => {
                                    setSelectedRoles(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Roles"
                                        color="primary"
                                    />
                                )}
                            />
                    </Grid>
                    <Grid item xs={12} md={12} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                        <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
                    </Grid>
                </Grid>
            </FormContainer>
        </form>
    );
};
