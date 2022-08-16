import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { getUserProfile, logoutUser } from '@js-camp/react/store/auth/dispatchers';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/auth/selectors';

import logo from '../../assets/logo.png';
import { routePaths } from '../../utils/routePaths';

import styles from './NavBar.module.css';

const NavBarComponent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  const onLogoutClick = async() => {
    await dispatch(logoutUser());
    navigate(routePaths.login);
  };

  return (<AppBar position="static">
    <Toolbar className={styles['navbar']}>
      <IconButton component={Link} to={routePaths.home}>
        <Avatar alt="Home page" srcSet={logo}/>
      </IconButton>
      {!isUserLoading && (
        <>
          {user === null &&
        <Button component={Link} color="inherit" to={routePaths.login}>Login</Button>
          }
          {user !== null && (
            <>
              <Typography>{user.email}</Typography>
              <Button color="inherit" onClick={() => onLogoutClick()}>Logout</Button>
            </>
          )}
        </>
      )}

    </Toolbar>
  </AppBar>
  );
};

export const NavBar = memo(NavBarComponent);
