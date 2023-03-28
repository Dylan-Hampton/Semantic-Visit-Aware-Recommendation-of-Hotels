import React, { ReactElement, useEffect } from "react";
import PoIQuantity from "../PoIQuantity/PoIQuantity";
import './PoIListItem.css';
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { changeCategories, selectCategories } from "../../../submissionFrame/submitSlice";
import CloseIcon from '@mui/icons-material/Close';

interface IPoIListItemProps {
    name: string;
    icon: ReactElement;
    onRemove: (name: string) => void;
}

const PoIListItem: React.FC<IPoIListItemProps> = (props: IPoIListItemProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    const assignCategory = (n: number) => {
        const c: { [name: string]: number } = {}
        Object.assign(c, categories)
        c[props.name] = n
        dispatch(changeCategories(c))
    }

    useEffect(() => {
        assignCategory(1);
    }, []);

    const setQuantity = (n: number) => {
        assignCategory(n);
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