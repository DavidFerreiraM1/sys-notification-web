import React from 'react';
import { Box } from '@material-ui/core';
import Image from 'next/image';

import UpgradingImage from '../../assets/images/upgrading-1.png';
import { upgradingStyles } from './styles';

export function Upgrading() {
  const classes = upgradingStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Image
          src={UpgradingImage}
          alt="upgrading-image"
        />
      </Box>
    </Box>
  )
}
