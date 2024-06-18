import React, {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Drawer,
    PaletteColor,
    PaletteColorOptions,
    ThemeProvider
} from "@mui/material";
import TopBar from "./components/TopBar.tsx";
import ReadingList from "./components/ReadingList.tsx";
import SearchBox from "./components/SearchBox.tsx";
import Book from "./types/Book.ts";
import BookShelf from "./components/BookShelf.tsx";
import GeneralErrorMessage from "./components/GeneralErrorMessage.tsx";

declare module '@mui/material/styles' {
    interface Palette {
        turquoise?: PaletteColor;
        turquoise2?: PaletteColor;
        white?: PaletteColor;
        steelBlue?: PaletteColor;
        yellow?: PaletteColor;
        orangeRed?: PaletteColor;
        orangePastel?: PaletteColor;
        teal?: PaletteColor;
    }

    interface PaletteOptions {
        turquoise?: PaletteColorOptions;
        turquoise2?: PaletteColorOptions;
        white?: PaletteColorOptions;
        steelBlue?: PaletteColorOptions;
        yellow?: PaletteColorOptions;
        orangeRed?: PaletteColorOptions;
        orangePastel?: PaletteColorOptions;
        teal?: PaletteColorOptions;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: "Mulish"
    },
    palette: {
        primary: {
            main: '#5acccc',
            light: '#cffafa',
            dark: '#53c2c2'
        },
        turquoise: {
            main: '#5acccc',
            light: '#cffafa',
            dark: '#53c2c2'
        },
        turquoise2: {
            main: '#28b8b8'
        },
        white: {
            main: '#ffffff'
        },
        steelBlue: {
            main: '#335c6e'
        },
        yellow: {
            main: '#fabd33',
            dark: '#faad00'
        },
        orangeRed: {
            main: '#f76434'
        },
        orangePastel: {
            main: '#ffe6dc'
        },
        teal: {
            main: '#4aa088'
        }
    }
});

const BOOKS_QUERY = gql`
    query Books {
        books {
            author
            title
            coverPhotoURL
            readingLevel
        }
    }
`

const App = () => {
    const {loading, error, data} = useQuery(BOOKS_QUERY);
    const [availableBooks, setAvailableBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
    const [displayedBooks, setDisplayedBooks] = useState<Book[]>([])
    const [showReadingList, setShowReadingList] = useState(false)
    const [readingList, setReadingList] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const PAGE_SIZE: number = 12

    useEffect(() => {
        if (data) {
            setAvailableBooks(data.books);
            setFilteredBooks(data.books)
            setDisplayedBooks(data.books.slice(0, PAGE_SIZE))
        }
    }, [data]);


    if (loading) return <p>Loading book data</p>;
    if (error) return <GeneralErrorMessage msg={JSON.stringify(error)} />

    const readingListToggled = () => {
        setShowReadingList((curr) => !curr)
    }

    const addToReadingList = (bookTitle: string) => {
        setReadingList((curr) => {
            return [...curr, bookTitle]
        })
    }

    const removeFromReadingList = (book: string) => {
        setReadingList((curr) => {
            return curr.filter(b => b !== book)
        })
    }

    const filterBooks = (event: React.SyntheticEvent<Element, Event>, value: string, reason: string) => {
        let books: Book[] = availableBooks;

        if (reason !== 'clear') {
            if (reason === 'selectOption') {
                books = availableBooks.filter((book: Book) => book.title === value.title);
            } else if (reason === 'reset') {
                if (value === '') {
                    return
                }
                books = availableBooks.filter((book: Book) => book.title === value.title);
            } else if (reason === 'input') {
                books = availableBooks.filter((book: Book) => {
                    return book.title.toLowerCase().includes(value.toLowerCase())
                });
            }
        } else {
            books = availableBooks;
        }

        setFilteredBooks(books);
        const finalBooks = books.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
        setDisplayedBooks(finalBooks);
    }

    const changePage = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page - 1)
        const newDisplayBooks = filteredBooks.slice((page - 1) * PAGE_SIZE, ((page - 1) * PAGE_SIZE) + PAGE_SIZE)
        setDisplayedBooks(newDisplayBooks)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <TopBar toggleReadingList={readingListToggled}/>
            <Drawer open={showReadingList} onClose={readingListToggled}>
                <Box sx={{width: 300}}>
                    <ReadingList
                        readingList={readingList}
                        availableBooks={availableBooks}
                        addToReadingList={addToReadingList}
                        removeFromReadingList={removeFromReadingList}
                    />
                </Box>
            </Drawer>
            <Container>
                <SearchBox
                    availableBooks={filteredBooks}
                    filterBooks={filterBooks}
                />
                <BookShelf
                    books={displayedBooks}
                    readingList={readingList}
                    addToReadingList={addToReadingList}
                    removeFromReadingList={removeFromReadingList}
                    currentPage={currentPage}
                    numOfPages={Math.round(filteredBooks.length / PAGE_SIZE)}
                    changePage={changePage}
                />
            </Container>
        </ThemeProvider>
    )
}

export default App;