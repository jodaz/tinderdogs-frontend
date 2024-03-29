import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Background from '../../assets/images/landing-background.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import LinkBehavior from '../../components/LinkBehavior';
import { Outlet } from 'react-router-dom'
import { closeGuestWarning, useGuest } from '../../context/GuestContext';
import { guestUser, useAuth } from '../../context/AuthContext'
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Intro = () => {
    const [translations] = useTranslation('global')
    const { dispatch: guestDispatch } = useGuest()
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { state: { isAuth }, dispatch: authDispatch } = useAuth();

    React.useEffect(() => {
        closeGuestWarning(guestDispatch);
    }, [])

    return (
        <Box sx={{
            height: '100vh',
            transition: 'all 0.3s ease-out 0s',
            position: 'relative',
            backgroundColor: theme => theme.palette.text.secondary,
            display: 'flex',
            '&:before': {
                content: '""',
                background: `url(${Background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 0
            }
        }}>
            <Box sx={{
                height: 'inherit',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                flex: matches ? 1 : 0.5,
                margin: '0 auto',
                color: '#DFDFDF',
                padding: matches ? '0 1rem' : 0,
                textAlign: 'center',
                zIndex: 1,
                alignItems: 'center',
                '& > *': {
                    margin: '1.1rem 0'
                }
            }}>
                <Box sx={{
                    fontWeight: 700,
                    fontSize: matches ? '2rem' : '3rem',
                    lineHeight: '50px'
                }}>
                    {translations('landing.welcome')}
                </Box>
                {!isAuth ? (
                    <Stack spacing={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            to='/register'
                            component={LinkBehavior}
                        >
                            {translations('landing.create-profile')}
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            color="secondary"
                            to='/market'
                            component={LinkBehavior}
                            onClick={() => guestUser(authDispatch)}
                        >
                            {translations('landing.enter-guest')}
                        </Button>
                    </Stack>
                ) : (
                    <Box p={1}>
                        <Button
                            variant="contained"
                            fullWidth
                            color="secondary"
                            to='/market'
                            component={LinkBehavior}
                        >
                            Volver a la app <ArrowRight />
                        </Button>
                    </Box>
                )}
                <Outlet />
            </Box>
        </Box>
    );
}

export default Intro;
