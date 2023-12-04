import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { News } from "../../@types/News";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useTheme} from "@mui/material/styles";

type NewsDetailParams = {
    newsId: string;
};

const NewsDetailPage: React.FC = () => {
    const navigator = useNavigate();
    const { newsId } = useParams<NewsDetailParams>();
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>((state) => state.auth.token);
    const [news, setNews] = React.useState<News>({} as News);
    const theme = useTheme();
    const fetchNews = async (newsId: string | undefined) => {
        try {
            if(newsId == null) return;
            await apiService.get(`/news/get/${newsId}`, token)
                .then(res => {
                    setNews(res.response);
                });

        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews(newsId)
            .catch((err)=>{
                console.error(err);
            });
    }, [newsId]);

    const handleGoBack = () => {
        navigator("/dashboard?menu=NEWS");
    };

    const styleLinksInHtml = (html : string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const links = doc.querySelectorAll('a');
        links.forEach((link) => {
            link.style.color = theme.palette.primary.main; // Color del tema primario
        });

        return doc.body.innerHTML;
    };


    return (
        <Box style={{ width:"100%", background: theme.palette.background.default }}>
            <Container>
                <Paper elevation={3} style={{ width:"100%", padding: "20px" }}>
                    <Typography variant="h4" gutterBottom>
                        {news.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {news.subtitle}
                    </Typography>
                    <img src={news.imageUrl} alt={news.title} style={{ maxWidth: "100%", marginBottom: "20px" }} />
                    <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                        <div
                            dangerouslySetInnerHTML={{ __html: styleLinksInHtml(news.content) }}
                        />
                    </Typography>
                    <Button variant="outlined" onClick={handleGoBack} style={{ marginTop: "20px" }}>
                        Go back to News
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default NewsDetailPage;
