import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkBehavior from '../../components/LinkBehavior';
import {
    PlusSquare,
    Newspaper
} from 'lucide-react';
import CustomButton from './CustomButton';
import getSearchParams from '../../utils/getSearchParams';
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleButton from '../../components/ToggleButton';
import ToggleButtonGroup from '../../components/ToggleButtonGroup';
import ProfileOptions from './ProfileOptions';
import { useForm } from 'react-hook-form';
import { useAuth, renewToken } from '../../context/AuthContext'
import PhotoInput from '../../components/Forms/PhotoInput';
import { fileProvider, apiProvider } from '../../api'
import formDataHandler from '../../utils/formDataHandler';
import MyAdCard from '../Ad/MyAds/MyAdCard';
import LatestPublishedBlogs from '../Blog/LatestPublishedBlogs';

const RegisterDog = React.lazy(() => import('../../components/RegisterDog'));

const getCurrDogPhoto = data => JSON.parse(data)[0]

const PetProfile = () => {
    const [error, setError] = React.useState('')
    const { state: { user }, dispatch } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const registerDog = getSearchParams(location, 'dog');
    const { handleSubmit, control, watch } = useForm();

    const onSubmit = async (values) => {
        try {
            const formData = await formDataHandler(values, 'files')

            const res = await fileProvider.put(`/api/dog/img-dog/${user.dog.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
            }
        } catch (error) {
            setError('Ha ocurrido un error inesperado.')
        }
    }

    React.useEffect(() => {
        const subscription = watch(handleSubmit(onSubmit))

        return () => subscription.unsubscribe();
    }, [handleSubmit, watch])

    return (
        <>
            <Box sx={{ pt: 1, width: '100%', textAlign: 'center', backgroundColor: '#f6f6f6' }}>
                <ToggleButtonGroup>
                    <ToggleButton value='/profile'>
                        Perfil mascota
                    </ToggleButton>
                    <ToggleButton value='/profile/owner'>
                        Perfil persona
                    </ToggleButton>
                </ToggleButtonGroup>
                <Box sx={{
                    marginTop: '1rem',
                }}>
                    <ProfileOptions />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flex: 1,
                        p: 2
                    }}>
                        {(user.dog) && (
                            <PhotoInput
                                name="files"
                                control={control}
                                defaultValue={(user.dog) && getCurrDogPhoto(user.dog.dogPhotos)}
                            />
                        )}
                    </Box>
                    {(user.dog) && (
                        <Typography
                            color="text.tertiary"
                            variant="subtitle1"
                            textAlign='center'
                        >
                            {user.dog.name}
                        </Typography>
                    )}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flex: 1,
                        paddingTop: '4rem',
                        width: 'fit-content',
                        margin: '0 auto'
                    }}>
                        <CustomButton
                            size={32}
                            icon={<Newspaper />}
                            title='Crear publicación'
                            color="primary"
                            component={LinkBehavior}
                            to='/blogs/create'
                        />
                        {(!user.publication) && (
                            <CustomButton
                                size={32}
                                icon={<PlusSquare />}
                                title='Crear anuncio'
                                color="info"
                                component={LinkBehavior}
                                to={(user.dog) ? '/profile/ads/create' : '?dog=true'}
                                notify={!user.dog}
                            />
                        )}
                    </Box>
                    {(registerDog) && (
                        <React.Suspense>
                            <RegisterDog
                                open={registerDog}
                                handleClose={() => navigate('/profile')}
                                redirect='/profile/ads/create'
                            />
                        </React.Suspense>
                    )}
                </Box>
            </Box>
            <Box sx={{ width: '100%', mb: 1 }}>
                {!!(user.publication) && (
                    <>
                        <Typography
                            variant="h6"
                            padding='2rem 2rem 0 1rem'
                        >
                            Mi anuncio
                        </Typography>
                        <MyAdCard {...user} />
                    </>
                )}
            </Box>
            <LatestPublishedBlogs />
        </>
    );
}

export default PetProfile
