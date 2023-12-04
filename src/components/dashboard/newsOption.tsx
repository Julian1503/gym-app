import NewsCard from "../news/newsCard";
import { News } from "../../@types/News";
import {ChangeEvent, FC, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ApiService from "../../services/apiService";
import { Box, Typography, Pagination } from "@mui/material";
import {Page} from "../../@types/Page";

const NewsOption: FC = () => {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const itemsPerPage = 3;
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>((state) => state.auth.token);
    const fetchNews = async (pageNumber: number, items: number) => {
        try {
            const response = await apiService.get(`/news/get-news-page?page=${pageNumber}&size=${items}&sort=title`, token)
                .then(res => {
                    const page : Page<News> = res.response;
                    setNewsList(page.content);

                    if(page.number !== pageNumber) {
                        setCurrentPage(page.number);
                    }

                    if(page.totalPages !== totalPages) {
                        setTotalPages(page.totalPages);
                    }
                });

        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };


    useEffect(() => {
        fetchNews(currentPage, itemsPerPage).catch((err)=>{
            console.error(err);
        });
    }, [currentPage, itemsPerPage, token]);

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page - 1);
    };

    return (
        <div style={{ padding: 10, height: (420 * itemsPerPage) + "px", minWidth: "80%"}}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {newsList.length > 0 ? (
                        newsList.map((news) => (
                            <NewsCard news={news} />
                        ))
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100vh",
                            }}
                        >
                            <Typography variant="h6" component="div">
                                No News Available.
                            </Typography>
                        </Box>
                    )}
                </div>
                <Pagination count={totalPages} page={currentPage + 1} onChange={handlePageChange} />
            </div>
        </div>
    );
};

export default NewsOption;
