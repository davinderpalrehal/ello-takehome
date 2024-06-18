import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import {useTheme} from "@mui/material/styles";
import React from "react";

interface TopBarProps {
    toggleReadingList: () => void;
}

const TopBar: React.FC<TopBarProps> = ({toggleReadingList}) => {
    const theme = useTheme()

    return (
        <AppBar style={{ backgroundColor: theme.palette.turquoise?.main}}>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='Reading list toggle'
                    onClick={toggleReadingList}
                >
                    <CollectionsBookmarkIcon />
                    <Typography>Open Reading List</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar