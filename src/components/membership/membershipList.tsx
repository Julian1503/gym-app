import React from 'react';
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Membership} from "../../@types/Membership";


export const MembershipList: React.FC<ListItemsProps<Membership>> = ({  items, handleDelete, handleEdit}) => {
    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name", "description", "price", "days"]}
        />
    );
};
