import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function FullScreenLoading() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
}
