import {Autocomplete, Box, Button, Dialog, TextField} from "@mui/material";
import {Member} from "../../@types/Member";
import {PlanForm} from "../../components/plan/planForm";
import {PlanList} from "../../components/plan/planList";
import {Plan} from "../../@types/Plan";
import ApiService from "../../services/apiService";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Container} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {SuccessSnackbar} from "./successSnackbar";

export const PlanPage: React.FC = () => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [members, setMembers] = useState<Member[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Plan | null>(null);
    const theme = useTheme();
    const defaultPlan: Plan = {
        planId: 0,
        name: '',
        memberId: 0,
        active: true,
        trainers: [],
        dayPlans: [],
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleShowSuccessSnackbar = () => {
        setOpenSnackbar(true);
        setTimeout(() => {
            setOpenSnackbar(false);
        }, 3000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        const apiService = ApiService.getInstance();
        apiService.get('/member/get-all', token)
            .then(res => setMembers(res.response))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if(selectedMemberId) {
            fetchPlans(selectedMemberId);
            setSelectedItem(selectedPlan => selectedPlan ? {...selectedPlan, memberId: selectedMemberId} : {...defaultPlan, memberId: selectedMemberId});
        } else if (selectedMemberId === null) {
            setSelectedItem(defaultPlan);
            setPlans([]);
        }
    }, [selectedMemberId]);

    const fetchPlans = (memberId: number) => {
        const apiService = ApiService.getInstance();
        apiService.get(`/plan/get-by-member/${memberId}`, token)
            .then(res => setPlans(res.response))
            .catch(err => console.error(err));
    }

    const handleSubmit = (plan: Plan) => {
        setIsCreating(false);
        handleShowSuccessSnackbar();
        if(selectedMemberId) {
            fetchPlans(selectedMemberId);
        }
    };

    const handleUpdate = (plan: Plan) : Promise<Plan> => {
        const apiService = ApiService.getInstance();
        return apiService.put(`/plan/update/${plan.planId}`, plan, token)
            .catch(err => console.error(err));
    };

    const handleDelete = (plan: Plan) => {
        const apiService = ApiService.getInstance();
        return apiService.delete(`/plan/delete/${plan.planId}`, token)
            .then(res => setPlans(plans.filter(plan1=> plan1.planId !== plan.planId)))
            .catch(err => console.error(err));
    };

    const handleSelectMember = (plan: Plan) => {
    };

    const handleOnClick = () => {
        setIsCreating((oldValue : boolean) => !oldValue);
        setSelectedItem(defaultPlan);
    };

    const handleOnCancel = () => {
        setIsCreating(false);
        setSelectedItem(null);
    }

    const handleEdit = (plan: Plan) => {
        const apiService = ApiService.getInstance();
        apiService.get(`/plan/get/${plan.planId}`, token).then((data) => {
            setSelectedItem(data.response);
            setIsCreating(true);
        });
    }

    return (
        <Container sx={{backgroundColor: theme.palette.background.paper, p: 5}}>
            <Typography variant="h5" component="h5" sx={{ flexGrow: 1, textAlign: 'center', marginBottom: 3 }} color={theme.palette.text.primary}>Plan</Typography>
            <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"flex-start", gap: 2, mb: 2}}>
                <Autocomplete
                    sx={{width: "50%"}}
                    options={members}
                    getOptionLabel={(option) => `${option.name} (ID: ${option.identifier})`}
                    onChange={(event, value) => setSelectedMemberId(value?.personId || null)}
                    renderInput={(params) => <TextField {...params} key={params.id} label="Member" variant="outlined" />}
                    value={members.find(member => member.personId === selectedMemberId) || null}
                />
                <Button variant="contained" color="primary" disabled={selectedMemberId === null} onClick={handleOnClick}>{ isCreating ? "Close form" : "Create New"}</Button>
            </Box>
            <Dialog open={isCreating} onClose={handleOnCancel}>
                {selectedMemberId && <PlanForm onSubmit={handleSubmit} selectedItem={selectedItem} handleUpdate={handleUpdate} onCancel={handleOnCancel} selectedMemberId={selectedMemberId} />}
            </Dialog>
            <PlanList fetchPlans={() => fetchPlans(selectedMemberId ? selectedMemberId : 0)} items={plans} handleDelete={handleDelete} handleEdit={handleEdit} onSelect={handleSelectMember}  setSelected={setSelectedItem}/>
            <SuccessSnackbar open={openSnackbar} onClose={handleCloseSnackbar}/>
        </Container>
    );
};
