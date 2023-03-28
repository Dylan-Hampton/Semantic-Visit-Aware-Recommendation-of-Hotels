import { Alert, Card, Divider, Snackbar } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../data/Constants';
import CityDropdown from '../inputFields/CityDropdown/CityDropdown';
import MaximumDistance from '../inputFields/MaximumDistanceField/MaximumDistance';
import PoiDropdown from '../inputFields/PoIDropdown/PoiDropdown';
import SubmitButton from '../inputFields/SubmitButton/SubmitButton';
import { City } from '../../../data/City';
import type RouteRequest from '../../../data/request/RouteRequest';
import './SubmissionFrame.css';
import { selectAlgorithm, selectCategories, selectDistance, selectOrigins, receivedCities, selectCities, selectCity } from './submitSlice';
import { generateRoute } from '../../../data/api';

interface ISubmissionFrameProps {

}

const SubmissionFrame: React.FC<ISubmissionFrameProps> = (props: ISubmissionFrameProps) => {
    const [failAlert, setFailAlert] = useState(false);
    const city = useAppSelector(selectCity);
    const cities = useAppSelector(selectCities);
    const dist = useAppSelector(selectDistance);
    const algo = useAppSelector(selectAlgorithm);
    const origins = useAppSelector(selectOrigins);
    const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    // Get list of cities from backend on page load
    useEffect(() => {
        if (cities.length === 0) {
            // fetch(apiUrl + '/cities').then(async (response) => {
            fetch(apiUrl + '/cities').then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    const c = data as City[];
                    if (c.length === 0) {
                        setFailAlert(true);
                    }
                    dispatch(receivedCities(c))
                }
                else {
                    setFailAlert(true);
                }
            }).catch(() => {
                setFailAlert(true);
            });
        }
    }, [cities, dispatch]);

    // Close popup for failing to retrieve cities
    const closeFailAlert = () => {
        setFailAlert(false);
    }

    // Sends data to async thunk for generating route
    const handleSubmit = () => {
        const categoryNumbers = Object.values(categories)
        const r: RouteRequest = {
            algorithm: algo.algorithmNum,
            origins: origins,
            distance: dist,
            categories: categoryNumbers,
        }
        dispatch(generateRoute(r))
    }

    return (
        <>
            <div className="submissionFrame">
                <Card
                    sx={{
                        width: '100%',
                        height: '100%',
                        padding: '0'
                    }}
                >
                <div className="input-frame">    
                    <div className='input-header'>
                        <span className="input-title">Search Hotels</span>  
                        <Divider sx={{
                                marginBottom: 2,
                                marginTop: 1,
                                width: '100%'
                            }}/>
                    </div>
                    <div className="input-body">
                        <div className="input-city"><CityDropdown cities={cities ? cities : []}></CityDropdown></div>
                        <div className="input-poi"><PoiDropdown poiTypes={city.poiTypes}></PoiDropdown></div>
                    </div>
                    
                    <div className="input-bottom">
                            <Divider />
                            <div className="input-bottom-inputs">
                                <div className="input-maxdist"><MaximumDistance></MaximumDistance></div>
                                <div className="input-submit" onClick={handleSubmit}><SubmitButton></SubmitButton></div>
                            </div>
                        </div>
                </div>
                </Card>
            </div>
            <Snackbar open={failAlert} autoHideDuration={6000} onClose={closeFailAlert}>
                <Alert onClose={closeFailAlert} severity="error" sx={{ width: '100%' }}>
                    Error retrieving cities on POIs! Please refresh.
                </Alert>
            </Snackbar>
        </>
    )
}

export default SubmissionFrame;
