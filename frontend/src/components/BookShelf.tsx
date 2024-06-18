import {Box, Grid, Pagination} from "@mui/material";
import BookCard from "./BookCard.tsx";
import Book from "../types/Book.ts";
import React from "react";

interface BookShelfProps {
    books: Book[];
    readingList: string[];
    addToReadingList: (title: string) => void;
    removeFromReadingList: (title: string) => void;
    numOfPages: number;
    currentPage: number;
    changePage: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BookShelf: React.FC<BookShelfProps> = ({books, readingList, addToReadingList, removeFromReadingList, numOfPages, currentPage, changePage}) => {
    return (
        <>
            <Grid container spacing={2}>
                {books.map((book, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <BookCard
                            key={index}
                            book={book}
                            inReadingList={readingList.findIndex((title: string) => title === book.title) !== -1}
                            addToReadingList={addToReadingList}
                            removeFromReadingList={removeFromReadingList}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ paddingBlock: 4 }} display='flex' justifyContent='center'>
                <Pagination
                    count={numOfPages}
                    variant='outlined'
                    shape='rounded'
                    color="primary"
                    page={currentPage + 1}
                    onChange={changePage}
                />
            </Box>
        </>
    )
}

export default BookShelf