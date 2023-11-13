import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Specialty} from "../../@types/Specialty";


export const SpecialtyList: React.FC<ListItemsProps<Specialty>> = ({  items, handleDelete , setSelected, handleEdit}) => {
    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name","description"]}
        />
    );
};
