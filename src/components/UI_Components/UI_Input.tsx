import styled from "@emotion/styled";
import {StandardTextFieldProps, TextField} from "@mui/material";
import React from "react";

interface UI_Input_Props extends StandardTextFieldProps {
    label: string
}

export const UI_Input = (props: UI_Input_Props) => {
    let {label} = props

    return (
        <TextField {...props} label={label} style={{
            width: '100%',
            paddingBottom: '1rem'
        }} />
    )

}