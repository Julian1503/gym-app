import React, {useState} from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Plan} from "../../@types/Plan";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {ExerciseDayPlanDto} from "../../@types/ExerciseDayPlan";
import ApiService from "../../services/apiService";


export const PlanList: React.FC<ListItemsProps<Plan>  & {onSelect: (plan: Plan) => void, fetchPlans: () => void}> = ({  items, fetchPlans, handleDelete , setSelected, onSelect, handleEdit }) => {
    const editPlan = (plan: Plan) => {
        onSelect(plan);
        handleEdit?.(plan);
    }
    const token = useSelector((state: RootState) => state.auth.token);
    const apiService = ApiService.getInstance();

    const navigator = useNavigate();

    const actions = (plan: Plan) : JSX.Element[] => {
        return [
            plan.active ? <Button variant="contained" color="primary" onClick={() => navigator(`/plan/${plan.planId}`)}>Select</Button> :
            <Button color="secondary" onClick={()=> activatePlan(plan.planId)}>
                Activate
            </Button>
    ];
    };

    const activatePlan = (planId: number) => {
        apiService.put(`/plan/${planId}/activate`,{}, token).then(() => {
            fetchPlans();
        });
    }

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={editPlan}
            columnNames={["name"]}
            actions={actions}
        />
    );
};
