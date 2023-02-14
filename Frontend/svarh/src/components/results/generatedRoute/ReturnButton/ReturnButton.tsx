import React from "react";
import './ReturnButton.css';
import ReplyIcon from '@mui/icons-material/Reply';
import { Grid } from "@mui/material";

interface IReturnButtonProps {
    onClick: () => void;
}

const ReturnButton: React.FC<IReturnButtonProps> = (props: IReturnButtonProps) => {
    return (
        <Grid container className="return-container" spacing={1}>
            <Grid item xs={2} justifyItems="center" justifyContent="center" className="return-icon">
                <ReplyIcon />
            </Grid>
            <Grid item xs={10} justifyItems="center" justifyContent="center" className="return-text" >View Hotels</Grid>
        </Grid>
    )
}

export default ReturnButton;