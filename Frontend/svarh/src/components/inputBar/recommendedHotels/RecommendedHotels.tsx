import { Card, Divider } from '@mui/material';
import React, { useState } from 'react';
import './RecommendedHotels.css';

interface IRecommendedHotelsProps {

}

const RecommendedHotels: React.FC<IRecommendedHotelsProps> = (props: IRecommendedHotelsProps) => {
    return (
        <>
            <div className="recommendedHotels">
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
                    <h3 style={{
                        textAlign: 'center',
                        marginTop: 0,
                        marginBottom: 0,
                    }}>Recommended Hotels</h3>
                    <Divider sx={{
                        padding: 1,
                    }}/>
                </Card>
            </div>
        </>
    )
}

export default RecommendedHotels;