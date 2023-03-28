import React, { useState } from "react";
import './PoIQuantity.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material";

interface IPoIQuantityProps {
    setQuantity: (n: number) => void;
}

const PoIQuantity: React.FC<IPoIQuantityProps> = (props: IPoIQuantityProps) => {
    const [value, setValue] = useState(0);

    const subtract = () => {
        if (value > 0) {
            setValue(value - 1);
            props.setQuantity(value - 1);
        }
    }

    const add = () => {
        if (value < 9) {
            setValue(value + 1);
            props.setQuantity(value + 1);
        }
    }

    return (
        <>
            <Grid container className="quantity">
                <Grid item xs={4} className="quantity-minus" display="flex" alignItems="center" justifyContent="end">
                    <RemoveIcon className="circle-on-hover" onClick={subtract}/>
                </Grid>
                <Grid item xs={4} className="quantity-value" display="flex" alignItems="center" justifyContent="center">
                    {value}
                </Grid>
                <Grid item xs={4} className="quantity-plus" display="flex" alignItems="center" justifyContent="start">
                    <AddIcon className="circle-on-hover" onClick={add}/>
                </Grid>
            </Grid>
        </>
    )
}

export default PoIQuantity;