import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Trainer} from "../../@types/Trainer";


export const TrainerList: React.FC<ListItemsProps<Trainer>> = ({  items, handleDelete , setSelected, handleEdit}) => {

    items.forEach((item) => {
      item.trainerId = item.personId;
    })

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name", "lastName", "identifier", "hireDate"]}
        />
    );
};
