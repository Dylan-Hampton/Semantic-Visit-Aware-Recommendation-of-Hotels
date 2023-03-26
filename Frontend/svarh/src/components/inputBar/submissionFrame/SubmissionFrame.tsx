import { Alert, Card, Divider, Snackbar } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../data/Constants';
import CityDropdown from '../inputFields/CityDropdown/CityDropdown';
import MaximumDistance from '../inputFields/MaximumDistanceField/MaximumDistance';
import PoiDropdown from '../inputFields/PoIDropdown/PoiDropdown';
import SubmitButton from '../inputFields/SubmitButton/SubmitButton';
import { City } from '../../../data/City';
import './SubmissionFrame.css';
import { changeCategories, changePois } from './submitSlice';

interface ISubmissionFrameProps {

}

const SubmissionFrame: React.FC<ISubmissionFrameProps> = (props: ISubmissionFrameProps) => {
    const [cities, setCities] = useState<City[]>(null);
    const [failAlert, setFailAlert] = useState(false);
    const [city, setCity] = useState<string>(null);
    const [pois, setPois] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cities) {
            // fetch(apiUrl + '/cities').then(async (response) => {
            fetch('http://sdmay23-34.ece.iastate.edu/api/cities').then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    const cities = data as City[];
                    if (cities.length === 0) {
                        setFailAlert(true);
                    }
                    setCities(cities);
                }
                else {
                    setFailAlert(true);
                }
            }).catch(() => {
                setFailAlert(true);
            });
        }
    }, [cities]);

    useEffect(() => {
        if (cities) {
            let pois: string[] = [];
            cities.forEach(c => {
                if (c.cityName === city) {
                    pois = c.poiTypes;
                }
            });
            setPois(pois);
        }
    }, [city, cities]);

    const closeFailAlert = () => {
        setFailAlert(false);
    }

    const handleCategories = (categories: string[]) => {
        const poisToCategories: number[] = []
        dispatch(changeCategories(poisToCategories))
    }

    const handleSubmit = () => {
        dispatch(changePois(pois))
    }

    return (
        <>
            <div className="submissionFrame">
                <Card
                    sx={{
                        width: '100%',
                        height: 'inherit',
                        padding: '16px 16px 32px 16px'
                    }}
                >
                    <div className='input-header'>
                        <span className="input-title">Search Hotels</span>  
                        <Divider sx={{
                                marginBottom: 2,
                                marginTop: 1
                            }}/>
                    </div>
                    <div className="input-body">
                        <div className="input-city"><CityDropdown cities={cities ? cities.map((c: City) => c.cityName) : []} setCity={setCity}></CityDropdown></div>
                        <div className="input-poi"><PoiDropdown changeCategories={handleCategories} poiTypes={pois}></PoiDropdown></div>
                        <div className="input-bottom">
                            <Divider sx={{
                                marginBottom: 2,
                                marginTop: 2,
                            }} />
                            <div className="input-maxdist"><MaximumDistance></MaximumDistance></div>
                            <div className="input-submit" onClick={handleSubmit}><SubmitButton></SubmitButton></div>
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
