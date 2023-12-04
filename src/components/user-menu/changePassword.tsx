import React, { useState } from 'react';
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography, Grid,
} from '@mui/material';
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {TokenService} from "../../store/auth/token";
import {SuccessSnackbar} from "../../pages/crud/successSnackbar";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const apiService =  ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const userInfo = new TokenService().getTokenPayload();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<any>({});

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const handleChangePassword = () => {
        setFieldErrors({});
        if(newPassword !== confirmPassword) {
            setFieldErrors({confirmPassword: 'Passwords do not match'});
            return;
        }

        if(newPassword.length < 8) {
            setFieldErrors({newPassword: 'Password must be at least 8 characters long'});
            return;
        }

        if(newPassword === currentPassword) {
            setFieldErrors({newPassword: 'New password must be different from current password'});
            return;
        }


        apiService.put('user/change-password', {currentPassword, newPassword, confirmPassword, userId: userInfo?.user}, token)
            .then(response => {
                if(response.status === 200) {
                    setOpenSnackbar(true);
                    setConfirmPassword('');
                    setCurrentPassword('');
                    setNewPassword('');
                }
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Change Password</Typography>
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 3
                }} container spacing={3}>
                    <TextField
                        label="Current Password"
                        type="password"
                        error={Boolean(fieldErrors.currentPassword)}
                        helperText={fieldErrors.currentPassword}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        error={Boolean(fieldErrors.newPassword)}
                        helperText={fieldErrors.newPassword}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        error={Boolean(fieldErrors.confirmPassword)}
                        helperText={fieldErrors.confirmPassword}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </Grid>
            </CardContent>
            <SuccessSnackbar open={openSnackbar} onClose={handleCloseSnackbar}/>
        </Card>
    );
};

export default ChangePassword;