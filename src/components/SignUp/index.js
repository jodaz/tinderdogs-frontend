import * as React from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '../DialogTitle';
import Link from '@mui/material/Link';
import PasswordInput from '../Forms/PasswordInput'
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextInput from '../Forms/TextInput';
import LinkBehavior from '../LinkBehavior';
import { useNavigate } from 'react-router-dom';
import SocialAuth from '../SocialAuth'
import PhoneInput from '../Forms/PhoneInput'
import { apiProvider } from '../../api'
import { Divider } from '@mui/material';
import { useAuth, loginUser } from '../../context/AuthContext'
import getSearchParams from '../../utils/getSearchParams';
import useMediaQuery from '@mui/material/useMediaQuery';
// Other components
import {
    NAME,
    LAST_NAME,
    PHONE,
    EMAIL,
    CONFIRM_PASSWORD,
    PASSWORD
} from '../../validations'

export default function SignUp({ location }) {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const navigate = useNavigate()
    const { dispatch } = useAuth();
    const { control, handleSubmit, setError, watch, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: React.useMemo(() => ({ 'code_phone': 34 }))
    });
    const password = watch("password", "");
    const isPhoneRegister = getSearchParams(location, 'withPhone');

    const onSubmit = async (data) => {
        try {
            const { code_phone, ...restData } = data;

            if (isPhoneRegister) {
                restData.code_phone = data.code_phone
            }

            const res = await apiProvider.post('/api/auth/new', restData)

            if (res.status >= 200 || res.status < 300) {
                const { data } = res;

                loginUser(dispatch, data)
                navigate('/register/welcome')
            }
        } catch (error) {
            if (error.response.data.msg) {
                const message = error.response.data.msg;

                if (message.includes('There is a user with the provided email')) {
                    setError('email', {
                       type: 'unique'
                    })
                }
                if (message.includes('There is a user with the provided that phone')) {
                    setError('phone', {
                        type: 'unique'
                    })
                }
            }
        }
    };

    const handleClose = () => navigate('/')

    return (
        <Dialog
            onClose={handleClose}
            open={location.pathname == '/register'}
        >
            <DialogTitle onClose={handleClose} />
            <Box sx={{
                m: 1,
                display: 'flex',
                width: isSmall ? 'fit-content' : '800px',
                height: 'fit-content',
                p: isSmall ? 1 : 3,
                color: theme => theme.palette.text.secondary
            }}>
                {!isSmall && (
                    <>
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
                            Al crear una cuenta TinderDogs est??s aceptando continuar de acuerdo a
                                nuestros <Link href="terms-conditions" underline="none">T??rminos y condiciones</Link> y con nuestra
                                    <Link href="privacy" underline="none">  Pol??tica de Privacidad</Link>
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
                                <SocialAuth hidePhone={isPhoneRegister} />
                            </Box>
                            <Box>
                                ??Ya tienes una cuenta?
                                <Link
                                    href="/login"
                                    underline="none"
                                    component={LinkBehavior}
                                    to='/login'
                                    sx={{ marginLeft: '1rem' }}
                                >
                                    Inicia sesi??n
                                </Link>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem>o</Divider>
                    </>
                )}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 1, flex: 1 }}>
                    {(isSmall) && (
                        <Box component='h2' margin='0 0 1rem 0' color="text.primary">
                            Crear cuenta
                        </Box>
                    )}
                    <Box sx={{ p: 1 }}>
                        <TextInput
                            label="Nombre"
                            control={control}
                            name="name"
                            placeholder='Ingresar nombre'
                            rules={NAME.rules}
                            validations={NAME.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextInput
                            label="Apellido"
                            control={control}
                            name="lastName"
                            placeholder='Ingresar apellido'
                            rules={LAST_NAME.rules}
                            validations={LAST_NAME.messages}
                            disabled={isSubmitting}
                        />
                    </Box>
                    {(isPhoneRegister) ? (
                        <>
                            <Box sx={{ p: 1 }}>
                                <PhoneInput
                                    label="Tel??fono"
                                    control={control}
                                    name="phone"
                                    rules={PHONE.rules}
                                    validations={PHONE.messages}
                                    placeholder='Ingresar tel??fono'
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
                                rules={EMAIL.rules}
                                validations={EMAIL.messages}
                                disabled={isSubmitting}
                                placeholder='Ingresar correo electr??nico'
                            />
                        </Box>
                    )}
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Contrase??a'
                            control={control}
                            name="password"
                            rules={PASSWORD.rules}
                            validations={PASSWORD.messages}
                            disabled={isSubmitting}
                            placeholder='Ingresar contrase??a'
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <PasswordInput
                            label='Confirmar contrase??a'
                            control={control}
                            name="confirm"
                            rules={{
                                ...CONFIRM_PASSWORD.rules,
                                validate: value => value === password
                            }}
                            validations={CONFIRM_PASSWORD.messages}
                            disabled={isSubmitting}
                            placeholder='Repita la contrase??a'
                        />
                    </Box>
                    <Box textAlign='center'>
                        <Box sx={{ p: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Siguiente
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {isSmall &&  (
                <Box marginTop='1rem' sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box pl={2} pr={2}>
                        <Divider orientation="horizontal" flexItem>o crear cuenta con</Divider>
                    </Box>
                    <SocialAuth location={location} />
                    <Box sx={{ margin: '0 auto 2rem auto' }}>
                        ??Ya tienes una cuenta?
                        <Link
                            href="/login"
                            underline="none"
                            component={LinkBehavior}
                            to='/login'
                            sx={{ marginLeft: '0.5rem' }}
                        >
                            Inicia sesi??n
                        </Link>
                    </Box>
                </Box>
            )}
        </Dialog>
    );
}
