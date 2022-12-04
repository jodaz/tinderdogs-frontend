import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import PawPrints from '../../../assets/images/pawprints.svg'
import FeedCard from '../../../components/FeedCard'
import { ReactComponent as Filter2Icon } from '../../../assets/icons/Filter2.svg'
import { useMediaQuery } from '@mui/material';
const PopularMembers = React.lazy(() => import('../../../components/PopularMembers'));

const UsersHome = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Box
            component="main"
            sx={{
                position: 'relative',
                flexGrow: 1,
                bgcolor: 'background.default',
                height: '100vh',
                width: isSmall ? '100%' : 'calc(100vw - 350px)',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '&:before': {
                    content: '""',
                    background: `url(${PawPrints}) center center fixed`,
                    backgroundSize: 'cover',
                    position: 'absolute',
                    bottom: 0,
                    height: '50%',
                    width: '100%',
                    zIndex: 0
                }
            }}
        >
            <React.Suspense>
                <Box width={isSmall ? '300px' : '450px'} margin='2rem 0'>
                    <PopularMembers />
                </Box>
            </React.Suspense>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: 'fit-content',
                margin: '0 auto'
            }}>
                <FeedCard />
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: '-80px'
                    }}
                >
                    <Filter2Icon />
                </Fab>
            </Box>
        </Box>
    );
}

export default UsersHome;
