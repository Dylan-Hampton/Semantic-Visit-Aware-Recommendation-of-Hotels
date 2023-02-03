import { Card, Divider } from '@mui/material';
import React, { useState } from 'react';
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
                        width: 'inherit',
                        height: 'inherit',
                        padding: 2,
                        // '&:hover': {
                        // backgroundColor: 'primary.main',
                        // opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <CityDropdown></CityDropdown>
                    <PoiDropdown></PoiDropdown>
                    <Divider sx={{
                        marginBottom: 2,
                        marginTop: 2,
                    }} />
                    <MaximumDistance></MaximumDistance>
                    <SubmitButton></SubmitButton>
                </Card>
            </div>
        </>
    )
}

export default SubmissionFrame;
