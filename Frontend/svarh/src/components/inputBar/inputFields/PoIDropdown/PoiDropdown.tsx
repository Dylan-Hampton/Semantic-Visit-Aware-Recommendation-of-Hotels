import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Skeleton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PoIListItem from "./PoiListItem/PoIListItem";
import MuseumIcon from '@mui/icons-material/Museum';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ParkIcon from '@mui/icons-material/Park';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WaterIcon from '@mui/icons-material/Water';
import PinDropIcon from '@mui/icons-material/PinDrop';
import './PoiDropdown.css';

interface IPoiDropdownProps {
  poiTypes: string[]
}

const PoiDropdown: React.FC<IPoiDropdownProps> = (props: IPoiDropdownProps) => {
    const [pois, setPois] = useState([]);
    const [inputValue, setInputValue] = useState('');
    //TODO: Get PoI types from database on page load, pass them in through props

    useEffect(() => {
      let newPoiList: string[] = [];
      pois.forEach((p) => {
        if (props.poiTypes.includes(p.name)) {
          newPoiList = newPoiList.concat(p);
        }
      })
      setPois(newPoiList);
    })

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

    const onChange = (event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string>) => {
      if (value !== null) {
        event.preventDefault();
        event.stopPropagation();
        setInputValue('');
        const selectedName: string = value;
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
      if (value === '') return true;
      if (value === option) return true;
      return false;
    }

    return (
      <>
      {props.poiTypes ? 
        <>
        <Autocomplete
        id="poiInput"
        options={props.poiTypes}
        getOptionLabel={(option) => option}
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
      :
      <Skeleton sx={{ width: '100%' }}/>
      }
      
    </>
        
    )
}

export default PoiDropdown;