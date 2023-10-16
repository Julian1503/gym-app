import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Equipment} from "../../@types/Equipment";


export const EquipmentList: React.FC<ListItemsProps<Equipment>> = ({  items, handleDelete , setSelected, handleEdit}) => {

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name"]}
        />
    );
};
