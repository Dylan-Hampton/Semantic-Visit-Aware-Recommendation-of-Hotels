import React from "react";
import './ReturnButton.css';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Grid } from "@mui/material";

interface IReturnButtonProps {
    onClick: () => void;
}

const ReturnButton: React.FC<IReturnButtonProps> = (props: IReturnButtonProps) => {
    return (
        <Grid container className="return-container">
            <Grid item xs={4} justifyItems="center" justifyContent="center" className="return-icon">
                <ReplyAllIcon />
            </Grid>
            <Grid item xs={8} justifyItems="center" justifyContent="center" className="return-text">Return</Grid>
        </Grid>
    )
}

export default ReturnButton;