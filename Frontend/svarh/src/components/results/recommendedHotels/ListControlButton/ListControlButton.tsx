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
        <div className="list-button-container" >
            <div className="list-button-icon">
                {props.option === 'expand' ?                 
                    <AddIcon />
                :
                    <RemoveIcon />
                }
            </div>
            <div className="list-button-text" >
                {props.option === 'expand' ? 'Expand All' : 'Collapse All'}
            </div>
        </div>
    )
}

export default ListControlButton;