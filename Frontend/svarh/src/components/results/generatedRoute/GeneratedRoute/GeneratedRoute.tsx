import React, { useEffect, useState } from "react";
import './GeneratedRoute.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Route, { IRouteData } from "../Route/Route";
import { Divider, Grid } from "@mui/material";

interface IGeneratedRouteProps {
    routes: IRouteData[];
}

const GeneratedRoute: React.FC<IGeneratedRouteProps> = (props: IGeneratedRouteProps) => {
    const [currentRoute, setCurrentRoute] = useState(0);
    const [prevRouteDisabled, setPrevRouteDisabled] = useState(true);
    const [nextRouteDisabled, setNextRouteDisabled] = useState(true);

    useEffect(() => {
        if (currentRoute === 0) {
            setPrevRouteDisabled(true);
        }
        else {
            setPrevRouteDisabled(false);
        }
        if (currentRoute === props.routes.length - 1) {
            setNextRouteDisabled(true);
        }
        else {
            setNextRouteDisabled(false);
        }
    }, [currentRoute, props.routes.length]);

    const navigatePrevRoute = () => {
        if (currentRoute !== 0) {
            setCurrentRoute(currentRoute - 1);
        }
    }

    const navigateNextRoute = () => {
        if (currentRoute !== props.routes.length - 1) {
            setCurrentRoute(currentRoute + 1);
        }
    }

    const navButtonStyles = {
        fontSize: 50
    }

    return (
        <>
            <div className="route-container">
                <div className="route-header">
                    <Grid container >
                        <Grid xs={3} display="flex" alignItems="center" justifyContent="center" >
                            <NavigateBeforeIcon onClick={navigatePrevRoute} className={prevRouteDisabled ? "nav-button-disabled" : "nav-button"} sx={navButtonStyles}/>
                        </Grid>
                        <Grid xs={6} textAlign="center">
                            <span className="route-header-title">Generated Route #{currentRoute + 1}</span>
                        </Grid>
                        <Grid xs={3} display="flex" alignItems="center" justifyContent="center">
                            <NavigateNextIcon onClick={navigateNextRoute} className={nextRouteDisabled ? "nav-button-disabled" : "nav-button"} sx={navButtonStyles}/>
                        </Grid>
                    </Grid>
                </div>
                <Divider />
                <div className="route-body">
                    <Route route={props.routes[currentRoute]}/>
                </div>
            </div>
        </>
    )
}

export default GeneratedRoute;