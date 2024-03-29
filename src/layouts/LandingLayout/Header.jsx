import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import LanguageButton from './LanguageButton';
import Logo from '../../components/Logo';
import { styled } from '@mui/material/styles';
import LinkBehavior from '../../components/LinkBehavior';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '../../context/AuthContext';
import getUserPhoto from '../../utils/getUserPhoto'
import LoginButton from './LoginButton';
import TransparentBackdrop from '../../components/TransparentBackdrop';
import { HashLink } from 'react-router-hash-link';

const AnchorTag = styled(HashLink)(({ theme, dark }) => ({
    textDecoration: 'none',
    padding: '0',
    [theme.breakpoints.up("sm")]: {
        padding: '0 1rem',
    },
    fontWeight: '400',
    color: dark ? theme.palette.primary.main : theme.palette.text.primary,
    cursor: 'pointer',
    transition: '0.3s',
    [theme.breakpoints.down("md")]: {
        color: theme.palette.text.primary,
    },
    '&:hover': {
        color: `${theme.palette.primary.main}`,
    }
}))

const internalLinks = [
    {
        title: 'Home',
        link: '/#',
    },
    {
        title: 'Conecta',
        link: '/#meet'
    },
    {
        title: '¿Cómo funciona?',
        link: '/#how-it-works'
    },
    {
        title: 'Registrar negocio',
        link: '/business',
        dark: true
    }
]

function ResponsiveAppBar({ dark }) {
    const { state: { isAuth, user } } = useAuth()
    const matches = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const generateButtons = () => (
        <>
            <Box p={1} />
            <Box>
                {isAuth ? (
                    <Avatar
                        src={user.img_profile ? getUserPhoto(JSON.parse(user.img_profile)[0]) : '/images/Avatar.svg'}
                        sx={{
                            height: '30px',
                            width: '30px'
                        }}
                    />
                ) : <LoginButton />}
            </Box>
            <Box p={1} />
            <Box>
                <LanguageButton dark={dark} />
            </Box>
        </>
    )

    return (
        <AppBar
            position="fixed"
            sx={{
                background: dark ? 'linear-gradient(0deg, rgba(161, 103, 201, 0.1), rgba(161, 103, 201, 0.1)), #FFFFFF;' : '#FFFFFF',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link component={LinkBehavior} to='/'>
                        <Logo />
                    </Link>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: '300',
                        fontSize: '1rem',
                        color: '#fff',
                        listStyle: 'none',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1
                    }}>
                        {internalLinks.map((link) => (
                            <li>
                                <AnchorTag
                                    aria-label={link.title}
                                    to={link.link}
                                    component={LinkBehavior}
                                    dark={link.dark}
                                    smooth
                                >
                                    {link.title}
                                </AnchorTag>
                            </li>
                        ))}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flex: matches ? 1 : 'unset',
                        alignItems: 'center'
                    }}>
                        {generateButtons()}
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'flex-end'
                        }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color='primary'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                                slots={{
                                    backdrop: TransparentBackdrop
                                }}
                            >
                                {internalLinks.map((link) => (
                                    <AnchorTag
                                        aria-label={link.title}
                                        to={link.link}
                                        component={LinkBehavior}
                                        dark={dark || matches}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <MenuItem>
                                            {link.title}
                                        </MenuItem>
                                    </AnchorTag>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
