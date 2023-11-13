import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Link,
} from '@mui/material';
import {News} from "../../@types/News";
import './newsCard.css';
import {Box} from "@mui/system";

type NewsCardProps = {
    news: News,
};

const formatContent = (content: string, maxLength: number): string => {
    const truncatedContent = content.length > maxLength
        ? content.substring(0, maxLength) + '...'
        : content;

    const formattedContent = truncatedContent.replace(
        /<a([^>]+)>(.*?)<\/a>/g,
        '<Link$1 class="green-link">$2</Link>'
    );

    return formattedContent;
};




const NewsCard: React.FC<NewsCardProps> = ({ news}) => {
    const maxSummaryLength = 200;
    const formattedSummary = formatContent(news.content, maxSummaryLength);

    return (
        <Card sx={{mb: 4, p:4}}>
            <CardContent>
                <Typography variant="h4" textAlign="left" component="h2" sx={{ mb: 1 }}>
                    {news.title}
                </Typography>
                <Box component="img" src={news.imageUrl} height="150px" width="100%" sx={{
                    objectFit: "cover",
                    objectPosition: "center 65%"}}/>
                <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: formattedSummary }} />
                </Typography>
                <Link href={`news/${news.newsId}`}>
                    Read more
                </Link>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
