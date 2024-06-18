import React from "react";
import {Alert} from "@mui/material";

interface GeneralErrorMessageProps {
    msg: string;
}

const GeneralErrorMessage:  React.FC<GeneralErrorMessageProps>= ({ msg }) => {
    return (
        <Alert severity="error">
            I am afraid something broke, this is what we know <br />
            {msg}
        </Alert>
    )
}

export default GeneralErrorMessage