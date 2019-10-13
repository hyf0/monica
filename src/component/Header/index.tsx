import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import {
  ArrowBack as BackIcon,
} from '@material-ui/icons';

export default function Header({onBack, title}: {title?: string; onBack?: (...args: any[]) => unknown}) {
    
    return (
      <AppBar
        style={{
          backgroundColor: 'white',
        }}
        position="static"
      >
        <Toolbar>
          <IconButton edge="start" onClick={onBack}>
            <BackIcon />
          </IconButton>
          <Typography style={{color: '#000'}} variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  