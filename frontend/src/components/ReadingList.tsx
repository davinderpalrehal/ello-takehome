import BookCard from "./BookCard.tsx";
import React, {useMemo} from "react";
import {Box, Container} from "@mui/material";
import Book from "../types/Book.ts";

interface ReadingListProps {
    availableBooks: Book[];
    readingList: string[];
    addToReadingList: (title: string) => void;
    removeFromReadingList: (title: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({availableBooks, readingList, addToReadingList, removeFromReadingList}) => {
    const books = useMemo(() => {
        return availableBooks.filter((book: Book) => readingList.includes(book.title))
    }, [availableBooks, readingList])

    return (
        <Container sx={{ p: 10 }}>
            {books.map((book: Book, index: number) => (
                <Box sx={{ marginBottom: '1em'}}>
                    <BookCard
                        key={index}
                        book={book}
                        inReadingList
                        addToReadingList={addToReadingList}
                        removeFromReadingList={removeFromReadingList}
                        variant='small'
                    />
                </Box>
            ))}
        </Container>
    )
}

export default ReadingList