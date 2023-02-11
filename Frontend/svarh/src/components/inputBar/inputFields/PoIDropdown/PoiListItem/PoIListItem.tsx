import React, { ReactElement } from "react";
import PoIQuantity from "../PoIQuantity/PoIQuantity";
import './PoIListItem.css';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";

interface IPoIListItemProps {
    name: string;
    icon: ReactElement;
    setQuantity: (name: string, quantity: number) => void;
    onRemove: (name: string) => void;
}

const PoIListItem: React.FC<IPoIListItemProps> = (props: IPoIListItemProps) => {

    const setQuantity = (n: number) => {
        props.setQuantity(props.name, n);
    }

    const remove = () => {
        props.onRemove(props.name);
    }

    return (
        <>
        <Grid container className="li" display="flex">
            <Grid item xs={1} className="li-icon" display="flex" alignItems="center" justifyContent="center">{props.icon}</Grid>
            <Grid item xs={4} className="li-name" display="flex" alignItems="center" justifyContent="start">{props.name}</Grid>
            <Grid item xs={6} className="li-quantity" display="flex" alignItems="center" justifyContent="center"><PoIQuantity setQuantity={setQuantity} /></Grid>
            <Grid item xs={1} className="li-remove" display="flex" alignItems="center" justifyContent="center"><CloseIcon className="circle-on-hover" onClick={remove}/></Grid>
        </Grid>
            
        </>
    )
}

export default PoIListItem;