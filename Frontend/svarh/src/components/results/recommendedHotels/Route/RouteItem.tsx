import React from "react";
import { PoiNode } from "../../../../data/response/Node";
import './RouteItem.css';
import { Grid } from "@mui/material";
import { getIcon } from "../../../../data/IconMap";
import { City } from "../../../../data/City";
import { useAppSelector } from "../../../../hooks";
import { selectCity } from "../../../../routeDataSlice";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandRouteButton from "./ExpandRoute/ExpandRouteButton";

interface IRouteProps {
    route: IRouteData;
    expanded: boolean;
    toggle: () => void;
}

export interface IRouteData {
    pois: PoiNode[];
}

const RouteItem: React.FC<IRouteProps> = (props: IRouteProps) => {
    const city: City = useAppSelector(selectCity);
    // TODO: Display the route with icons/names like in the Figma design

    return (
        <>
        {props.expanded &&
            <Grid container display="flex" className="route-item">
            {props.route.pois.map((poi, i) => {
                return (
                    <div key={i} className="poi-key">
                    <div className="poi">
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center" >
                        {getIcon(city.poiTypes[poi.category])}
                    </Grid>
                    <Grid item xs={10} container direction="column">
                        <Grid item className="poi-name">{poi.name}</Grid>
                        {city !== undefined && city.poiTypes !== undefined && city.poiTypes[poi.category] !== undefined &&
                            <Grid item className="poi-category">
                                Category: {city.poiTypes[poi.category]}
                            </Grid>
                        }
                    </Grid>
                    </div>
                    {i !== props.route.pois.length - 1 && 
                        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">  
                            <MoreVertIcon />
                        </Grid>
                    }
                    </div>
                )
            })}
            </Grid>
        }
            
            <div className="expand-toggle" onClick={props.toggle}>    
                <div className="expand-button">
                    <ExpandRouteButton expanded={props.expanded}/>
                </div>
            </div>
        </>
    )
}

export default RouteItem;