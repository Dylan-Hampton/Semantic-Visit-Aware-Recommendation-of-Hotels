import { Card, Divider } from '@mui/material';
import React from 'react';
import CityDropdown from '../inputFields/CityDropdown/CityDropdown';
import MaximumDistance from '../inputFields/MaximumDistanceField/MaximumDistance';
import PoiDropdown from '../inputFields/PoIDropdown/PoiDropdown';
import SubmitButton from '../inputFields/SubmitButton/SubmitButton';
import './SubmissionFrame.css';

interface ISubmissionFrameProps {

}

const SubmissionFrame: React.FC<ISubmissionFrameProps> = (props: ISubmissionFrameProps) => {
    return (
        <>
            <div className="submissionFrame">
                <Card
                    sx={{
                        width: '100%',
                        height: 'inherit',
                        padding: '16px 16px 32px 16px',
                        // '&:hover': {
                        // backgroundColor: 'primary.main',
                        // opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <div className='input-header'>
                        <span className="input-title">Search Hotels</span>
                    </div>
                    <Divider sx={{
                                marginBottom: 2,
                                marginTop: 1
                            }}/>
                    <div className="input-body">
                        <div className="input-city"><CityDropdown></CityDropdown></div>
                        <div className="input-poi"><PoiDropdown></PoiDropdown></div>
                        
                        <div className="input-bottom">
                            <Divider sx={{
                                marginBottom: 2,
                                marginTop: 2,
                            }} />
                            <div className="input-maxdist"><MaximumDistance></MaximumDistance></div>
                            <div className="input-submit"><SubmitButton></SubmitButton></div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default SubmissionFrame;
