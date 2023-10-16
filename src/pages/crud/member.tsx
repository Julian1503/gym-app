import React from 'react';
import {GenericPage} from "./crudPage";
import {Member} from "../../@types/Member";
import MemberForm from "../../components/member/memberForm";
import {MemberList} from "../../components/member/memberList";

export const MemberPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='member'
            defaultItem={{
                personId: 0,
                name: "",
                lastName: "",
                identifier: "",
                identifierType: "",
                phoneNumber: "",
                fingerPrintData: null,
                photo: null,
                street: "",
                houseNumber: "",
                floor: null,
                door: null,
                gender: "",
                birthDate: null,
                user: null,
                memberNumber: "",
                joinDate: new Date(),
                emergencyContactName: "",
                emergencyContactPhone: "",
            } as Member}
            formComponent={(props)=><MemberForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><MemberList handleDelete={props.handleDelete} handleEdit={props.handleEdit} setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
