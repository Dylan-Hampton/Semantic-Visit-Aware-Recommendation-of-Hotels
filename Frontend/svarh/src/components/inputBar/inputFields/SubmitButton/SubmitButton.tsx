import { Button } from "@mui/material";
import React from "react";
import HotelIcon from '@mui/icons-material/Hotel';
import './SubmitButton.css';

interface ISubmitButtonProps {

}

const SubmitButton: React.FC<ISubmitButtonProps> = (props: ISubmitButtonProps) => {
    return (
        <div className="submit-button-frame">
          <Button
          className="submitButton"
          variant="contained"
          sx={{fontSize: 36}}
          startIcon=<HotelIcon style={{fontSize:45}} />
          onClick={() => console.log("Clicked Submit")}
          >
            Submit
          </Button>
        </div>
    );
}

export default SubmitButton;