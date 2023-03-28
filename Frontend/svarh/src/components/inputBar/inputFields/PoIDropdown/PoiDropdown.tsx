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
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeCategories, selectCategories } from "../../submissionFrame/submitSlice";

interface IPoiDropdownProps {
  poiTypes: string[];
}

const PoiDropdown: React.FC<IPoiDropdownProps> = (props: IPoiDropdownProps) => {
    const [pois, setPois] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
      setPois([])
    }, [props.poiTypes])

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
          changeCategoryValue(selectedName, 1)
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
      const c: { [name: string]: number } = {}
      Object.assign(c, categories)
      c[name] = 0
      dispatch(changeCategories(c))
    }

    const optionValue = (option: any, value: any) => {
      if (value === '') return true;
      if (value === option) return true;
      return false;
    }

    const changeCategoryValue = (category: string, value: number) => {
      const c: { [name: string]: number } = {}
      Object.assign(c, categories)
      c[category] = value
      dispatch(changeCategories(c))
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
              <PoIListItem key={p.name} name={p.name} icon={getIcon(p.name)} onRemove={removePoi} changeCategoryValue={changeCategoryValue}/>
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