import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from "@mui/material";
import React, { useState } from "react";
import PoIListItem from "./PoiListItem/PoIListItem";
import MuseumIcon from '@mui/icons-material/Museum';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ParkIcon from '@mui/icons-material/Park';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WaterIcon from '@mui/icons-material/Water';
import PinDropIcon from '@mui/icons-material/PinDrop';
import './PoiDropdown.css';

interface IPoiDropdownProps {

}

const PoiDropdown: React.FC<IPoiDropdownProps> = (props: IPoiDropdownProps) => {
    const [pois, setPois] = useState([]);
    const [inputValue, setInputValue] = useState({type: ""});
    //TODO: Get PoI types from database on page load, pass them in through props
    
    const poiTypes = [
        { type: 'Museum' },
        { type: 'Statue' },
        { type: 'Mall' },
        { type: 'Park' },
        { type: 'Zoo' },
        { type: 'Aquarium' },
    ]

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

    const onChange = (event: React.SyntheticEvent<Element, Event>, value: { type: string; }, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<{ type: string; }>) => {
      if (value !== null) {
        event.preventDefault();
        event.stopPropagation();
        setInputValue({type: ""});
        const selectedName: string = value.type;
        const icon = getIcon(selectedName);
        if (!doesPoiListContain(selectedName)) {
          setPois(pois.concat({name: selectedName, icon: icon}));
        }
      }
    }

    const doesPoiListContain = (name: string): boolean => {
      let contains: boolean = false;
      pois.forEach(p => {
        if (p.name === name) contains = true;
      });
      return contains;
    }

    const removePoi = (name: string) => {
      let newPoiList: any[] = [];
      pois.forEach(p => {
        if (p.name !== name) {
          newPoiList = newPoiList.concat(p);
        }
      });
      setPois(newPoiList);
    }

    const optionValue = (option: any, value: any) => {
      if (value.type === '') return true;
      if (value.type === option) return true;
      return false;
    }

    return (
      <>
      <Autocomplete
      id="poiInput"
      options={poiTypes}
      getOptionLabel={(option) => option.type}
      sx={{ width: '100%' }}
      value={inputValue}
      isOptionEqualToValue={optionValue}
      disablePortal
      onChange={onChange}
      renderInput={(params) => (
        <TextField{...params} 
          label="Points of Interest"/>
          )
        }
    />
      {pois.map(p => {
        return (
          <div key={p.name} className="poi-item">
            <PoIListItem key={p.name} name={p.name} icon={p.icon} setQuantity={(name: string, quantity: number) => {}} onRemove={removePoi} />
          </div>)
      })}
    </>
        
    )
}

export default PoiDropdown;