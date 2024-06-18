import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import Book from "../types/Book.ts";
import {Box} from "@mui/material";
import ReadingLevelIndicator from "./ReadingLevelIndicator.tsx";

interface SearchBoxProps {
    availableBooks: Book[];
    filterBooks: (event: React.ChangeEvent<HTMLFormElement>, value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({availableBooks, filterBooks}) => {
    // onInputChange in real life this would need a debouncer

    return (
        <Autocomplete
            disablePortal
            options={availableBooks}
            getOptionLabel={(option) => option.title}
            getOptionKey={(option) => `${option.title}-${option.author}`}
            onInputChange={filterBooks}
            onChange={filterBooks}
            renderOption={(props, option, { selected }) => (
                <li key={`${option.title}-${option.author}`} {...props}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <img src={option.coverPhotoURL} alt={option.title + ' cover image'} width='50'
                             style={{marginRight: "1ch"}}/>
                        {option.title} - {option.author}
                        &nbsp;
                        <ReadingLevelIndicator level={option.readingLevel} />
                    </Box>
                </li>
            )}
            renderInput={(params) => <TextField {...params} label="Search by book title"/>}
            sx={{ marginTop: '5em', marginBottom: '2em'}}
        />
    )
}

export default SearchBox