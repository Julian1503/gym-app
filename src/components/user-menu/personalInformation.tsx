import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent, FormControl, Grid, InputLabel, Select,
    TextField,
    Typography,
} from '@mui/material';
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Member} from "../../@types/Member";
import {DateField} from "@mui/x-date-pickers";
import {TokenService} from "../../store/auth/token";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";


const PersonalInfo = () => {
    const [isEditing, setEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState<Member>({} as Member);
    const apiService =  ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const userInfo = new TokenService().getTokenPayload();

    useEffect(() => {
        apiService.get(`member/get/${userInfo?.scid}`, token)
            .then(response => {
                if(response.status === 200) {
                    setEditedInfo(response.response);
                }
            }).catch(error => {
            console.log(error);
        });
    }, [apiService, token, userInfo?.scid])

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        apiService.put(`member/update/${userInfo?.scid}`, editedInfo, token)
            .then(response => {
                    if(response.status === 200) {
                        setEditedInfo(response.response);
                    }
                }
            ).catch(error => {
            console.log(error);
        });
        setEditing(false);
    };

    return (
        <Card sx={{
            minHeight: '600px',
        }}>
            <CardContent sx={{
                height: '100%'
            }}>
                <Typography variant="h5">Personal Information</Typography>
                {isEditing ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Grid item m={2}>
                                <TextField
                                    label="Name"
                                    value={editedInfo.name}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, name: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item m={2}>
                                <TextField
                                    label="Last Name"
                                    value={editedInfo.lastName}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, lastName: e.target.value })
                                    }
                                />
                            </Grid>

                            <Grid item m={2}>
                                <TextField
                                    label="Identifier"
                                    value={editedInfo.identifier}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, identifier: e.target.value })
                                    }
                                />
                            </Grid>

                            <Grid item m={2}>
                                <TextField
                                    label="Phone Number"
                                    value={editedInfo.phoneNumber}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, phoneNumber: e.target.value })
                                    }
                                />
                            </Grid>

                            <Grid item m={2}>
                                <TextField
                                    label="Street"
                                    value={editedInfo.street}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, street: e.target.value })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid item m={2}>
                                <TextField
                                    label="House Number"
                                    value={editedInfo.houseNumber}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, houseNumber: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item m={2}>
                                <TextField
                                    label="Floor"
                                    value={editedInfo.floor}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, floor: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item m={2}>
                                <TextField
                                    label="Door"
                                    value={editedInfo.door}
                                    onChange={(e) =>
                                        setEditedInfo({ ...editedInfo, door: e.target.value })
                                    }
                                />
                            </Grid>
                            <Grid item m={2}>
                                <FormControl>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={editedInfo.gender}
                                        onChange={(e) =>
                                            setEditedInfo({ ...editedInfo, gender: e.target.value })
                                        }
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item m={2}>
                                <DateField
                                    label="Birth Date"
                                    sx={{ width: '100%' }}
                                    value={moment.utc(editedInfo?.birthDate).toDate()}
                                    onChange={(date: Date | null) =>
                                        setEditedInfo({ ...editedInfo, birthDate: date })
                                    }
                                    format="dd/MM/yyyy"
                                    disableFuture
                                />
                            </Grid>
                        </Grid>

                       <Grid sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                           justifyContent: 'center',
                           alignItems: 'center',
                           width: '100%'
                       }}>
                           <Button  sx={{
                               marginTop: '1rem',
                               marginLeft: 'auto',
                               marginRight: 'auto',
                           }}  variant="contained" color="primary" onClick={handleSave}>
                               Save
                           </Button>
                           <Button  sx={{
                               marginTop: '1rem',
                               marginLeft: 'auto',
                               marginRight: 'auto',
                           }}  variant="contained" color="secondary" onClick={()=>setEditing(false)}>
                               Cancel
                           </Button>
                       </Grid>
                    </Grid>
                ) : (
                    <Grid container sx={{
                        marginTop: '3rem'
                    }} spacing={3}>
                        <Grid sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3rem',
                        }} item xs={12} sm={6}>
                            <Typography variant="h5">Name: {editedInfo.name}</Typography>
                            <Typography variant="h5">Last Name: {editedInfo.lastName}</Typography>
                            <Typography variant="h5">Identifier: {editedInfo.identifier}</Typography>
                            <Typography variant="h5">Phone Number: {editedInfo.phoneNumber}</Typography>
                            <Typography variant="h5">Street: {editedInfo.street}</Typography>
                            <Typography variant="h5">House Number: {editedInfo.houseNumber}</Typography>
                        </Grid>
                        <Grid  sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3rem',
                        }}  item xs={12} sm={6}>
                            <Typography variant="h5">Floor: {editedInfo.floor}</Typography>
                            <Typography variant="h5">Door: {editedInfo.door}</Typography>
                            <Typography variant="h5">Gender: {editedInfo.gender}</Typography>
                            {editedInfo.birthDate && (
                                <Typography variant="h5">Birth Date: {editedInfo.birthDate.toString()}</Typography>
                            )}
                        </Grid>

                        <Button sx={{
                            marginTop: '1rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }} variant="contained" color="primary" onClick={handleEdit}>
                            Edit
                        </Button>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default PersonalInfo;
