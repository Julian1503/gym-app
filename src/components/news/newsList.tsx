import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Member} from "../../@types/Member";
import {News} from "../../@types/News";


export const NewsList: React.FC<ListItemsProps<News>> = ({  items, handleDelete , setSelected, handleEdit}) => {

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["title", "description", "subtitle"]}
        />
    );
};
