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
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { containerPageStyles } from './styles';
import { ComponentWithChildrenProps } from '../../utils/interfaces/with-children-props';
import { useRouter } from 'next/router';
import { useLocallStorage } from '../../local-storage';


const optionsMenu = [
  {
    label: 'Novo app',
    url: '/app/register',
    icon: <AddIcon />
  },
  {
    label: 'Sair',
    url: '/user/logout',
    icon: <ExitToAppIcon />
  }
]

export function ContainerPage(props: ComponentWithChildrenProps) {
  const classes = containerPageStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = React.useCallback(() => {
    open ? setOpen(false) : setOpen(true);
  }, [open]);

  const { userLoggedInfo } = useLocallStorage();
  const { pathname, push, replace } = useRouter();

  const logoutHandler = React.useCallback(() => {
    userLoggedInfo.remove();
    replace('/');
  }, []);

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
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {
          optionsMenu.map(({ label, url, icon }, index) => {
            const redirect = () => {
              if(url === '/user/logout') {
                logoutHandler();
              } else {
                push({pathname: `${url}`});
              }
            }

            return (
              <List key={index}>
                <ListItem button disabled={url === pathname} onClick={redirect}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </List>
            )
          })
        }
      </Drawer>
      <Container maxWidth="lg">
        <>
          {props?.children}
        </>
      </Container>
    </div>
  )
}
