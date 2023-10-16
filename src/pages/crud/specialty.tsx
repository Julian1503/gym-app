import React from 'react';
import {Specialty} from "../../@types/Specialty";
import {GenericPage} from "./crudPage";
import {SpecialtyList} from "../../components/specialty/specialtyList";
import {SpecialtyForm} from "../../components/specialty/specialtyForm";

export const SpecialtyPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='specialty'
            defaultItem={{
                specialtyId: 0,
                name: "",
                description: "",
                photo: ""
            } as Specialty}
            formComponent={(props)=><SpecialtyForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><SpecialtyList handleDelete={props.handleDelete} handleEdit={props.handleEdit}  setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
