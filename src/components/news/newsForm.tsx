import { TextField, Typography, Grid } from '@mui/material';
import ApiService from "../../services/apiService";
import { News } from "../../@types/News";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { FormContainer } from "../form/form-container";
import { SubmitButton } from "../form/submit-button";
import { FormProps } from "../../@types/Props";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {RichTextField} from "./richTextField";

export const NewsForm: React.FC<FormProps<News>> = ({ onSubmit, selectedItem, onCancel, handleUpdate }) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [title, setTitle] = useState(selectedItem?.title || '');
    const [subtitle, setSubtitle] = useState(selectedItem?.subtitle || '');
    const [content, setContent] = useState(selectedItem?.content || '');
    const [imageUrl, setImageUrl] = useState(selectedItem?.imageUrl || '');
    const [link, setLink] = useState(selectedItem?.link || '');
    const [newsId, setNewsId] = useState(selectedItem?.newsId);
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});
    const theme = useTheme();

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if (newsId) {
            handleUpdate?.({
                newsId, title, subtitle, content, imageUrl, link
            } as News).then(res => {
                onSubmit(res.response);
                setFieldErrors({});
            });
        } else {
            apiService.post('/news/create', {
                title, subtitle, content, imageUrl, link, "newsId": 0
            }, token)
                .then(res => {
                    onSubmit(res.response);
                })
                .catch(err => {
                    if (err.message) {
                        const errorResponse = JSON.parse(err.message);
                        const errorMessage = errorResponse.errorResponse[0];
                        const field = errorMessage.split("'")[1];
                        setFieldErrors({ ...fieldErrors, [field]: errorMessage });
                    }
                });
        }
    };

    return (
        <form>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>News Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Title"
                            color="primary"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Subtitle"
                            color="primary"
                            value={subtitle}
                            onChange={e => setSubtitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RichTextField setContent={setContent} content={content} preview={true} setPreview={()=>{}} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Image URL"
                            color="primary"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Link"
                            color="primary"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
                    </Grid>
                </Grid>
            </FormContainer>
        </form>
    );
};
