import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import { Phone, MapPin, ArrowRight } from 'lucide-react'
import Typography from '@mui/material/Typography';
import { fileProvider } from '../../../api';
import formDataHandler from '../../../utils/formDataHandler'
import { useForm } from 'react-hook-form';
import { clearForm, useMultiStepForm } from '../../../context/MultiStepContext';
import PublicationWait from '../../../components/Modals/PublicationWait';
import OverlayLoader from '../../../components/Modals/OverlayLoader';
import { useNavigate } from 'react-router-dom';
import { useAuth, renewToken } from '../../../context/AuthContext';
import PhotoGallery from '../../../components/Modals/ShowCard/PhotoGallery';
import getUserPhoto from '../../../utils/getUserPhoto';
import ContactBusiness from '../../../components/Modals/ContactBusiness';
import LinkBehavior from '../../../components/LinkBehavior';
import StepsFormButtons from '../StepsFormButtons';

const EditBusinessStep4 = () => {
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const navigate = useNavigate()
    const { state: { user }, dispatch: dispatchAuth } = useAuth();
    const { state, dispatch } = useMultiStepForm();
    const { handleSubmit } = useForm();
    const [openContactDialog, setOpenContactDialog] = React.useState(false)

    const toggleOpenContactDialog = () => setOpenContactDialog(!openContactDialog)

    const onSubmit = async () => {
        let filteredFiles = []
        setOpenOverlayLoader(true)

        try {
            const {
                files,
                province,
                city,
                ...restData
            } = state

            if (files.length) {
                filteredFiles = files.filter(file => typeof(file) != 'string')
            }

            const data = {
                ...restData,
                province: province.nombre,
                city: city.nombre,
                files: filteredFiles,
                email: user.email
            }

            const formData = await formDataHandler(data, 'files')

            const res = await fileProvider.put(`/api/business-ann/ann-edit/${user.publication.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatchAuth, user)
                setOpenWarning(true)
                setOpenOverlayLoader(false)

                clearForm(dispatch)
                navigate('/businesses')
            }
        } catch (error) {
            setOpenOverlayLoader(false)
            console.log(error)
        }
    }

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    if (!Object.keys(state).length) return <></>

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    fontWeight={500}
                    textAlign='left'
                >
                    Fijate como quedó tú anuncio
                </Typography>
            </Box>
            <Box p={2}>
                <Card
                    sx={{
                        p: 3,
                        borderRadius: '8px',
                        background: '#F6F6F6',
                        position: 'relative',
                    }}
                >
                    <PhotoGallery
                        images={state.files.map(item => typeof(item) == 'string' ? getUserPhoto(item) : item.preview)}
                    />
                    <CardContent
                        sx={{
                            background: '#fff',
                            borderRadius: '10px',
                        }}
                    >
                        <Stack
                            orientation='vertical'
                            spacing={1}
                            sx={{ p: 2, mb: 1 }}
                        >
                            <Typography
                                variant="h5"
                                color="text.primary"
                                fontWeight={500}
                                textAlign='left'
                            >
                                {state.business_name}
                            </Typography>
                            <Button
                                color="info"
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    justifyContent: 'start',
                                    textAlign: 'left'
                                }}
                                component={LinkBehavior}
                                to={`location`}
                                state={state}
                                textAlign='left'
                            >
                                <MapPin size={18} /> {state.city}, {state.province}
                            </Button>
                            <Typography
                                variant="subtitle1"
                                color="info.main"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={toggleOpenContactDialog}
                            >
                                <Phone size={18} /><Box mr='10px' />  +{state.code_phone} {state.whatsApp}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                gutterBottom
                            >
                                {state.description}
                            </Typography>
                        </Stack>
                        <Stack
                            orientation='vertical'
                            spacing={1}
                            sx={{ p: 2 }}
                        >
                            {state.web_site && (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    target='_blank'
                                    href={`//${state.web_site}`}
                                    component={Link}
                                >
                                    Ir a la página
                                    <ArrowRight />
                                </Button>
                            )}
                            {state.facebook && (
                                <Button
                                    color="info"
                                    variant="contained"
                                    target='_blank'
                                    href={`//${state.facebook}`}
                                    component={Link}
                                >
                                    Ir a facebook
                                    <ArrowRight />
                                </Button>
                            )}
                            {state.instagram && (
                                <Button
                                    color="success"
                                    variant="contained"
                                    target='_blank'
                                    href={`//${state.instagram}`}
                                >
                                    Ir a instagram
                                    <ArrowRight />
                                </Button>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
            <StepsFormButtons next='Publicar' />
            {openContactDialog && (
                <ContactBusiness
                    {...state}
                    open={openContactDialog}
                    handleClose={toggleOpenContactDialog}
                />
            )}
            <PublicationWait open={openWarning} handleClose={handleCloseWarning} />
            <OverlayLoader open={openOverlayLoader} />
        </Box>
    );
}

export default EditBusinessStep4
