import React from 'react';
import {GenericPage} from "./crudPage";
import {News} from "../../@types/News";
import {NewsForm} from "../../components/news/newsForm";
import {NewsList} from "../../components/news/newsList";

export const NewsPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='news'
            defaultItem={{
                imageUrl: "",
                title: "",
                description: "",
                link: "",
                subtitle: "",
                content: "",
                newsId: 0
            } as News}
            formComponent={(props)=><NewsForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><NewsList handleDelete={props.handleDelete} handleEdit={props.handleEdit} setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
