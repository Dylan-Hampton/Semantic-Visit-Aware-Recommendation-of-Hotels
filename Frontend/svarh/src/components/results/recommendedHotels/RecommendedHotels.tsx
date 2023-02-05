import { Card, Divider } from '@mui/material';
import React, { useState } from 'react';
import './RecommendedHotels.css';

interface IRecommendedHotelsProps {

}

const RecommendedHotels: React.FC<IRecommendedHotelsProps> = (props: IRecommendedHotelsProps) => {
    return (
        <>
            <div className="recommended-hotels-container">
                <div className="recommended-hotels-header">
                    <h3 className="recommended-hotels-title">Recommended Hotels</h3>
                </div>
                <Divider sx={{padding: 1}}/>
                <div className="recommended-hotels-body">
                    
                </div>
            </div>
        </>
    )
}

export default RecommendedHotels;