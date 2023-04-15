import React from "react";
import './ListControlButton.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from "@mui/material";

interface IListControlButtonProps {
    option: 'expand' | 'collapse';
}

const ListControlButton: React.FC<IListControlButtonProps> = (props: IListControlButtonProps) => {
    return (
        <Grid container className="list-button-container" spacing={3}>
            <Grid item xs={2} alignItems="center" justifyContent="center" className="list-button-icon">
                {props.option === 'expand' ?                 
                    <AddIcon />
                :
                    <RemoveIcon />
                }
            </Grid>
            <Grid item xs={9} alignItems="center" justifyContent="center" className="list-button-text" >
                {props.option === 'expand' ? 'Expand All' : 'Collapse All'}
            </Grid>
        </Grid>
    )
}

export default ListControlButton;