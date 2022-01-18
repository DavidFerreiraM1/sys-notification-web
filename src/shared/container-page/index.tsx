import React from 'react';
import clsx from 'clsx';
import {
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AddIcon from '@material-ui/icons/Add';

import { containerPageStyles } from './styles';
import { ComponentWithChildrenProps } from '../../utils/interfaces/with-children-props';

export function ContainerPage(props: ComponentWithChildrenProps) {
  const classes = containerPageStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = React.useCallback(() => {
    open ? setOpen(false) : setOpen(true);
  }, [open]);

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={
          clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })
        }
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerOpen}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Criar novo app" />
          </ListItem>
        </List>
      </Drawer>
      <Container maxWidth="lg">
        <>
          {props?.children}
        </>
      </Container>
    </div>
  )
}
