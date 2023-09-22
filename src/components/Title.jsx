import React from 'react'
import { Typography } from "@mui/material";
import { useContext } from "react";
import AppContext from '../context/Context';

export default function Title({ children, variant = "h4", mt = 5, mb = 5 }) {
    const context = useContext(AppContext);

    return (
        <Typography
            sx={{
                mt,
                mb,
                borderLeft: `3px solid ${context.siteTheme.palette.primary.main}`,
                pl: 1,
            }}
            fontWeight={500}
            variant={variant}
            color="text.primary"
        >
            {children}
        </Typography>
    )
}
