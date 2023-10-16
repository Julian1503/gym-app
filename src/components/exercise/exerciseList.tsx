import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";


export const ExerciseList: React.FC<ListItemsProps<Exercise>> = ({  items, handleDelete , setSelected, handleEdit}) => {
    const theme = useTheme();
    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name"]}
        />
    );
};
