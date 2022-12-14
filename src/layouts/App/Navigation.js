import * as React from 'react'
import LinkBehavior from '../../components/LinkBehavior'
import { Toolbar, IconButton, Tooltip } from "@mui/material"
import { useLocation } from 'react-router-dom';
// Icons
import { ReactComponent as HuellaIcon } from '../../assets/icons/Huella.svg'
import { ReactComponent as HuellaActiveIcon } from '../../assets/icons/PawHouseActive.svg'
import { ReactComponent as StoreIcon } from '../../assets/icons/Store.svg'
import { Newspaper } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Home } from 'lucide-react';
import { User } from 'lucide-react';
import { Dog } from 'lucide-react';
import PrivateRoute from '../../components/PrivateRoute';

const generalLinks = [
    {
        label: 'Inicio',
        icon: <HuellaIcon />,
        active: <HuellaActiveIcon />,
        route: '/home',
        role: 'user,guest'
    },
    {
        label: 'Marketplace',
        icon: <StoreIcon />,
        active: <StoreIcon />,
        route: '/market',
        role: 'user,guest'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blog',
        role: 'user,guest'
    }
];

const onlyUserLinks = [
    {
        label: 'Chat',
        icon: <MessageCircle color='#ccc' />,
        active: <MessageCircle color='#A167C9' />,
        route: '/chat',
        role: 'user'
    },
    {
        label: 'Perfil',
        icon: <Dog color='#ccc' />,
        active: <Dog color='#A167C9' />,
        route: '/profile',
        role: 'user'
    },
]

const onlyBussines = [
    {
        label: 'Inicio',
        icon: <Home color='#ccc' />,
        active: <Home color='#A167C9' />,
        route: '/home',
        role: 'bussines'
    },
    {
        label: 'Blog',
        icon: <Newspaper color='#ccc' />,
        active: <Newspaper color='#A167C9' />,
        route: '/blog',
        role: 'bussines'
    },
    {
        label: 'Marketplace',
        icon: <StoreIcon color='#ccc' />,
        active: <StoreIcon />,
        route: '/market',
        role: 'bussines'
    },
    {
        label: 'Perfil',
        icon: <User color='#ccc' />,
        active: <User color='#A167C9' />,
        route: '/profile',
        role: 'bussines'
    }
]

const Navigation = ({ isSmall }) => {
    const location = useLocation();

    const renderLinks = icons => icons.map((icon, i) => (
        <Tooltip key={i} title={icon.label}>
            <IconButton component={LinkBehavior} to={icon.route} sx={{ margin: '0 0.75rem'}}>
                {
                    React.cloneElement(
                        (location.pathname.startsWith(icon.route)) ? icon.active : icon.icon,
                        {}
                    )
                }
            </IconButton>
        </Tooltip>
    ))

    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#fff',
            height: isSmall ? '100%' : 'unset'
        }}>
            <PrivateRoute authorize='user,guest' unauthorized={null}>
                {renderLinks(generalLinks)}
            </PrivateRoute>
            <PrivateRoute authorize='user' unauthorized={null}>
                {renderLinks(onlyUserLinks)}
            </PrivateRoute>
            <PrivateRoute authorize='bussines' unauthorized={null}>
                {renderLinks(onlyBussines)}
            </PrivateRoute>
        </Toolbar>
    )
}

export default Navigation
