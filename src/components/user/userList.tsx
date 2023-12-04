import React from 'react';
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {User} from "../../@types/User";


export const UserList: React.FC<ListItemsProps<User>> = ({  items, handleDelete  }) => {

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            showEditButton={false}
            columnNames={["username", "memberName", "memberLastname", "email"]}
        />
    );
};
