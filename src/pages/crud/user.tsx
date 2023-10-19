import React from 'react';
import {GenericPage} from "./crudPage";
import {UserList} from "../../components/user/userList";
import {UsersForm} from "../../components/user/userForm";
import {User} from "../../@types/User";

export const UserPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='user'
            defaultItem={{
                userId: 0,
                username: '',
                password: '',
                email: '',
                memberId: 0,
                roles: []
            } as User}
            formComponent={(props)=><UsersForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><UserList handleDelete={props.handleDelete} handleEdit={props.handleEdit} setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
