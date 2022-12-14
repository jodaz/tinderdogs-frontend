import * as React from 'react'
import Box from '@mui/material/Box'
import BackgroundDogs from '../../assets/images/background-dogs.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import LinkBehavior from '../../components/LinkBehavior';
import { Outlet, useNavigate } from 'react-router-dom'
import getSearchParams from '../../utils/getSearchParams';
import DeletedAccount from '../../components/Modals/DeletedAccount';
import { closeGuestWarning, useGuest } from '../../context/GuestContext';

const Landing = ({ location }) => {
    const { dispatch: guestDispatch } = useGuest()
    const navigate = useNavigate();
    const openDeleteModal = getSearchParams(location, 'delete')
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
                background: `url(${BackgroundDogs}) no-repeat center center fixed`,
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
                    fontSize: matches ? '3rem' : '4rem',
                    lineHeight: '76px'
                }}>
                    Conecta con todos los perros del mundo
                </Box>
                <Box sx={{
                    fontSize: '1.2rem',
                    lineHeight: '28px'
                }}>
                    Conoce nuevas mascotas, en diferentes lugares, pero con los mismos gustos que t??
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    to='/register'
                    component={LinkBehavior}
                >
                    Crear una cuenta
                </Button>
                <Outlet />
            </Box>
            <DeletedAccount open={openDeleteModal} handleClose={() => navigate('/')} />
        </Box>
    );
}

export default Landing;
