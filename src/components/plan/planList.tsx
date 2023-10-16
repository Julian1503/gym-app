import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Plan} from "../../@types/Plan";
import {useNavigate} from "react-router-dom";


export const PlanList: React.FC<ListItemsProps<Plan>  & {onSelect: (plan: Plan) => void}> = ({  items, handleDelete , setSelected, onSelect, handleEdit }) => {
    const editPlan = (plan: Plan) => {
        onSelect(plan);
        handleEdit?.(plan);
    }

    const navigator = useNavigate();

    const actions = (plan: Plan) : JSX.Element[] => {
        return [<Button variant="contained" color="primary" onClick={() => navigator(`/plan/${plan.planId}`)}>Select</Button>];
    };
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
