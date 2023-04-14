import { Grid } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './ExpandRouteButton.css';

interface IExpandRouteButtonProps {
    expanded: boolean;
}

const ExpandRouteButton: React.FC<IExpandRouteButtonProps> = (props: IExpandRouteButtonProps) => {
    return (
        <Grid container className="button-container" spacing={1}>
            <Grid item xs={2} alignItems="center" justifyContent="center" className="button-icon">
                {props.expanded ? 
                    <RemoveIcon /> 
                :               
                    <AddIcon />
                }
            </Grid>
            <Grid item xs={10} alignItems="center" justifyContent="center" className="expand-button-text" >
                {props.expanded ? 'Collapse Route' : 'Expand Route'}
            </Grid>
        </Grid>
    );
};

export default ExpandRouteButton;