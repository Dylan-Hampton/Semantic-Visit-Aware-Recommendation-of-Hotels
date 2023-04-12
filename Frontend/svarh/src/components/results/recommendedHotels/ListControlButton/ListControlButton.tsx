import React from "react";
import './ListControlButton.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from "@mui/material";

interface IListControlButtonProps {
    showRoutes: (show: boolean) => void;
    getNumRoutesOpen: () => number;
}

const ListControlButton: React.FC<IListControlButtonProps> = (props: IListControlButtonProps) => {
    const onClick = () => {
        props.showRoutes(props.getNumRoutesOpen() === 0);
    }
    return (
        <Grid container className="button-container" spacing={1} onClick={onClick}>
            <Grid item xs={2} alignItems="center" justifyContent="center" className="button-icon">
                {props.getNumRoutesOpen() === 0 ?                 
                    <AddIcon />
                :
                    <RemoveIcon />
                }
            </Grid>
            <Grid item xs={10} alignItems="center" justifyContent="center" className="button-text" >
                {props.getNumRoutesOpen() === 0 ? 'Expand Routes' : 'Collapse Routes'}
            </Grid>
        </Grid>
    )
}

export default ListControlButton;