import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../DialogTitle';
import Link from '@mui/material/Link';
import PasswordInput from '../Forms/PasswordInput'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../Forms/TextInput';
import LinkBehavior from '../LinkBehavior';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin'
import Alert from '@mui/material/Alert';
import vars from '../../vars'
import { apiProvider } from '../../api'
import { Divider } from '@mui/material';
import getSearchParams from '../../utils/getSearchParams';

export default function SignUp({ location }) {
    const navigate = useNavigate()
    const [error, setError] = React.useState(false)
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });
    const isPhoneRegister = getSearchParams(location, 'withPhone');

    const onSubmit = async (data) => {
        setError(false);

        const response = await apiProvider.post('/api/auth/signin', {
            ...data,
            tipo: 1
        }).catch(error => {
            if (error.response.status == 401) {
                setError(true)
            }
        });

        const { data: result } = response;

        localStorage.setItem(vars.authToken, result.access_token);
        navigate('/home')
    };

    const handleClose = () => navigate('/')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/register'}
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: '800px',
                height: '400px',
                p: 3,
                color: theme => theme.palette.text.secondary
            }}>
                <Box sx={{
                    flex: 1,
                    m: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box component='h1' margin='0 0 1rem 0' color="text.primary">
                        Crear cuenta
                    </Box>
                    <Box>
                    Al crear una cuenta TinderDogs estás aceptando continuar de acuerdo a
                        nuestros <Link href="#" underline="none">Términos y condiciones</Link> y con nuestra
                            <Link href="#" underline="none">  Política de Privacidad</Link>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '3rem auto'
                    }}>
                        <Box>
                            Continuar con
                        </Box>
                        <SocialLogin hidePhone={isPhoneRegister} />
                    </Box>
                    <Box>
                        ¿Ya tienes una cuenta?
                            <Link
                                href="/login"
                                underline="none"
                                component={LinkBehavior}
                                to='/login'
                                sx={{ marginLeft: '1rem' }}
                            >
                                Inicia sesión
                            </Link>
                    </Box>
                </Box>
                <Divider orientation='vertical'>
                    o
                </Divider>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                    {(isPhoneRegister) ? (
                        <>
                            <Box sx={{ p: 1 }}>
                                <TextInput
                                    label="Nombre"
                                    control={control}
                                    name="name"
                                    placeholder='Ingresar nombre y apellido'
                                />
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <PhoneInput
                                    label="Teléfono"
                                    control={control}
                                    name="phone"
                                    placeholder='Ingresar teléfono'
                                />
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ p: 1 }}>
                            <TextInput
                                label="Email"
                                control={control}
                                name="email"
                                type="email"
                                placeholder='Ingresar correo electrónico'
                            />
                        </Box>
                    )}
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contraseña'
                            control={control}
                            name="password"
                            placeholder='Ingresar contraseña'
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Confirmar contraseña'
                            control={control}
                            name="confirm_password"
                            placeholder='Repita la contraseña'
                        />
                    </Box>
                    <Box textAlign='center'>
                        <Box sx={{ p: 1 }}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}
