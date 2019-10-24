import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function FullScreenLoading() {

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} className="full-screen-loading">
            <CircularProgress />
        </div>
    )
}