import {
    Card,
    CardActionArea,
    CardHeader,
    CardMedia, Grid,
    IconButton, Typography,
} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import './BookCard.scss'
import Book from "../types/Book.ts";
import React from "react";

interface BookCardProps {
    book: Book;
    inReadingList: boolean;
    addToReadingList: (title: string) => void;
    removeFromReadingList: (title: string) => void;
    variant?: string;
}

const BookCard: React.FC<BookCardProps> = ({book, inReadingList, addToReadingList, removeFromReadingList, variant}) => {
    const add = () => {
        addToReadingList(book.title)
    }

    const remove = () => {
        removeFromReadingList(book.title)
    }

    const defaultLayout = (
        <Card elevation={5} className='book-card'>
            <CardHeader
                title={book.title}
                subheader={book.author}
                action={
                    inReadingList
                        ? <IconButton onClick={remove}><Bookmark className='book-card--bookmark'/></IconButton>
                        : <IconButton onClick={add}><BookmarkBorder/></IconButton>
                }
                className={'reading-level-'+book.readingLevel}
            />

            <CardActionArea sx={{ position: 'relative'}}>
                <CardMedia
                    component='img'
                    image={book.coverPhotoURL}
                    alt={book.author}
                />
            </CardActionArea>
        </Card>
    )

    const smallLayout = (
        <Grid container spacing={1} className='book-card--small'>
            <Grid item xs={4}>
                <img
                    src={book.coverPhotoURL}
                    alt={book.author}
                    style={{
                        width: '100%'
                    }}
                />
            </Grid>

            <Grid item xs={7}>
                <Typography component='h3' className='book-card--small-title'>{book.title}</Typography>
                <Typography component='h4' className='book-card--small-author'>{book.author}</Typography>
            </Grid>

            <Grid item xs={1}>
                <IconButton onClick={remove}><Bookmark className='book-card--small-bookmark'/></IconButton>
            </Grid>
        </Grid>
    )

    return variant === 'small' ? smallLayout : defaultLayout
}

export default BookCard