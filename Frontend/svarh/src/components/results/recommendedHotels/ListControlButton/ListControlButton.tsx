import React from "react";
import './ListControlButton.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from "@mui/material";

interface IListControlButtonProps {
    showRoutes: (show: boolean) => void;
    showAdd: boolean;
}

const ListControlButton: React.FC<IListControlButtonProps> = (props: IListControlButtonProps) => {
    const onClick = () => {
        props.showRoutes(!props.showAdd);
    }
    return (
        <Grid container className="button-container" spacing={1} onClick={onClick}>
            <Grid item xs={2} justifyItems="center" justifyContent="center" className="button-icon">
                {props.showAdd ?                 
                    <AddIcon />
                :
                    <RemoveIcon />
                }
            </Grid>
            <Grid item xs={10} justifyItems="center" justifyContent="center" className="button-text" >
                {props.showAdd ? 'Expand Routes' : 'Collapse Routes'}
            </Grid>
        </Grid>
    )
}

export default ListControlButton;