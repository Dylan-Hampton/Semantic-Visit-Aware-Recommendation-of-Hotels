import { Button } from "@mui/material";
import React from "react";
import HotelIcon from '@mui/icons-material/Hotel';
import './SubmitButton.css';

interface ISubmitButtonProps {

}

const SubmitButton: React.FC<ISubmitButtonProps> = (props: ISubmitButtonProps) => {
    return (
        <Button 
        className='submitButton'
        variant="contained"
        startIcon=<HotelIcon style={{fontSize:45}} />
        onClick={() => console.log("Clicked Submit")}
        >
          Submit
        </Button>
    );
}

export default SubmitButton;