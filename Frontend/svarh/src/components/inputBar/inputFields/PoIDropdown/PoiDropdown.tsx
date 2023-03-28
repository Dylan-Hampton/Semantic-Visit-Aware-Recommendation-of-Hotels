import { Skeleton } from "@mui/material";
import React from "react";
import PoIListItem from "./PoiListItem/PoIListItem";
import MuseumIcon from '@mui/icons-material/Museum';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ParkIcon from '@mui/icons-material/Park';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WaterIcon from '@mui/icons-material/Water';
import PinDropIcon from '@mui/icons-material/PinDrop';
import './PoiDropdown.css';

interface IPoiDropdownProps {
  poiTypes: string[];
}

const PoiDropdown: React.FC<IPoiDropdownProps> = (props: IPoiDropdownProps) => {

    const getIcon = (name: string): JSX.Element => {
      switch (name) {
        case 'Museum':
          return <MuseumIcon />;
        case 'Mall':
          return <StoreMallDirectoryIcon />;
        case 'Park':
          return <ParkIcon />;
        case 'Zoo':
          return <EmojiNatureIcon />
        case 'Aquarium':
          return <WaterIcon />
        default:
          return <PinDropIcon />
      }
    }

    return (
      <>
      {props.poiTypes ? 
        <>
        {props.poiTypes.map(p => {
          return (
            <div key={p} className="poi-item">
              <PoIListItem key={p} name={p} icon={getIcon(p)} />
            </div>)
        })}
        </>
      :
      <Skeleton sx={{ width: '100%' }}/>
      }
      
    </>
        
    )
}

export default PoiDropdown;