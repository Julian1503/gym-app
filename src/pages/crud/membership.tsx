import React from 'react';
import {GenericPage} from "./crudPage";
import {Membership} from "../../@types/Membership";
import {MembershipList} from "../../components/membership/membershipList";
import {MembershipForm} from "../../components/membership/membershipForm";

export const MembershipPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='membership'
            defaultItem={{
                membershipId: 0,
                name: '',
                description: '',
                days: 0,
                price: 0
            } as Membership}
            formComponent={(props)=><MembershipForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><MembershipList handleDelete={props.handleDelete} handleEdit={props.handleEdit}  setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
