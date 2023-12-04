import React from 'react';
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Member} from "../../@types/Member";


export const MemberList: React.FC<ListItemsProps<Member>> = ({  items, handleDelete, handleEdit}) => {
    items.forEach(item =>{
        item.memberId = item.personId;
    })

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name", "lastName", "identifier", "joinDate"]}
        />
    );
};
