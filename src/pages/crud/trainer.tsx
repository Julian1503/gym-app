import React from 'react';
import {GenericPage} from "./crudPage";
import {TrainerList} from "../../components/trainer/trainerList";
import {TrainerForm} from "../../components/trainer/trainerForm";
import {Trainer} from "../../@types/Trainer";

export const TrainerPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='trainer'
            defaultItem={{
                personId: 0,
                trainerId: 0,
                name: "",
                lastName: "",
                identifier: "",
                identifierType: "",
                phoneNumber: "",
                fingerPrintData: null,
                photo: undefined,
                street: "",
                houseNumber: "",
                floor: null,
                door: null,
                gender: "",
                birthDate: null,
                user: null,
                trainerNumber: "",
                hireDate: new Date(),
                specialties: []
            } as Trainer}
            formComponent={(props)=><TrainerForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><TrainerList handleDelete={props.handleDelete} handleEdit={props.handleEdit}  setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
