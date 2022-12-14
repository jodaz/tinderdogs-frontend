import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { logout, useAuth } from '../../context/AuthContext';
import LinkBehavior from '../../components/LinkBehavior';
import SettingsLayout from '../../layouts/SettingsLayout'
import ListItemLink from '../../components/ListItemLink';
import List from '../../components/List';

const ListTitle = ({ children }) => (
    <ListItem component="div" disablePadding sx={{
        color: 'text.tertiary',
        fontWeight: 'bold',
        variant: 'body2',
        backgroundColor: '#ECECEC',
        borderRadius: '8px',
        padding: '10px',
        fontWeight: '500',
    }}>
        <ListItemText
            primary={children}
            primaryTypographyProps={{
                color: 'text.tertiary',
                variant: 'body2',
                textTransform: 'uppercase'
            }}
        />
    </ListItem>
)

const Settings = ({ title }) => {
    const { dispatch } = useAuth();

    return (
        <SettingsLayout title="Configuraciones">
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <List>
                        <ListTitle>
                            Cuenta
                        </ListTitle>
                        <ListItemLink
                            to="account"
                            title="Cuenta de acceso"
                        />
                        <ListItemLink
                            to="owner"
                            title="Información personal"
                        />
                        <ListItemLink
                            to="pet"
                            title="Información de la mascota"
                        />
                    </List>
                    <List>
                        <ListTitle>
                            Legales
                        </ListTitle>
                        <ListItemLink
                            to="privacy"
                            title="Políticas de privacidad"
                        />
                        <ListItemLink
                            to="terms"
                            title="Términos y condiciones"
                        />
                    </List>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => logout(dispatch)}
                        component={LinkBehavior}
                        to='/'
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default Settings
