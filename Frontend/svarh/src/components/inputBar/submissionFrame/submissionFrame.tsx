import { Box } from '@mui/material';
import React, { useState } from 'react';
import './submissionFrame.css';

interface ISubmissionFrameProps {

}

const SubmissionFrame: React.FC<ISubmissionFrameProps> = (props: ISubmissionFrameProps) => {
    return (
        <>
            <div className="submissionFrame">
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                    },
                }}
            />
            </div>
        </>
    )
}

export default SubmissionFrame;