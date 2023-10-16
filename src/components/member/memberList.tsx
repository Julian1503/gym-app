import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import {useTheme} from "@mui/material/styles";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Member} from "../../@types/Member";


export const MemberList: React.FC<ListItemsProps<Member>> = ({  items, handleDelete , setSelected, handleEdit}) => {
    items.forEach(item =>{
        item.memberId = item.personId;
    })

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name"]}
        />
    );
};
