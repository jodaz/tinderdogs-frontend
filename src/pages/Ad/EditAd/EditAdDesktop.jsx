import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { useAuth, renewToken } from '../../../context/AuthContext'
import TextInput from '../../../components/Forms/TextInput';
import SwitchInput from '../../../components/Forms/SwitchInput';
import { apiProvider, fileProvider } from '../../../api';
import GalleryInput from '../../../components/GalleryInput';
import InterestInput from '../../../components/InterestInput';
import formDataHandler from '../../../utils/formDataHandler';
import PublicationWait from '../../../components/Modals/PublicationWait';
import OverlayLoader from '../../../components/Modals/OverlayLoader';
import useEffectOnce from '../../../utils/useEffectOnce'
import DeletePhotoWarning from '../../../components/Modals/DeletePhotoWarning';
import DogInformation from '../DogInformation';
import { DESCRIPTION, ADD_PHOTOS } from '../../../validations';
import DialogTitle from '../../../components/DialogTitle';
import { useNavigate } from 'react-router-dom';

const selectedItems = labels => labels.map(({ id }) => id).filter(item => item);

const EditAdDesktop = () => {
    const { state: { user }, dispatch } = useAuth();
    const navigate = useNavigate();
    const [openWarning, setOpenWarning] = React.useState(false)
    const [openDeletePhoto, setOpenDeletePhoto] = React.useState(false);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)
    const [openOverlayLoader, setOpenOverlayLoader] = React.useState(false)
    const [interests, setInterests] = React.useState([])
    const { control, handleSubmit, watch, setValue, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            interests: user.publication.interests ? selectedItems(user.publication.interests) : null,
            description: user.publication.description,
            permission_geolocation: user.publication.permission_geolocation,
            permission_whatsapp: user.publication.permission_whatsapp,
            permission_tlf: user.publication.permission_tlf
        }
    });
    const insterestsValues = watch('interests')

    const onSubmit = async (data) => {
        let filteredFiles = []
        const { files, ...rest } = data;

        if (files.length) {
            filteredFiles = files.filter(file => typeof(file) != 'string')
        }

        const parsedData = {
            ...rest,
            files: filteredFiles
        }

        setOpenOverlayLoader(true)
        const formData = await formDataHandler(parsedData, 'files')

        try {
            const res = await fileProvider.put(`/api/publication/edit/${user.publication.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                setOpenWarning(true)
                setOpenOverlayLoader(false)
            }
        } catch (error) {
            setOpenOverlayLoader(false)
            console.log(error)
        }
    };

    const fetchInterests = async () => {
        try {
            const res = await apiProvider.get('api/interest/interests')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setInterests(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    useEffectOnce(() => { fetchInterests() }, []);

    const handleCloseWarning = () => {
        setOpenWarning(false);
    }

    const handleOpenDeletePhoto = (file) => {
        setOpenDeletePhoto(true);
        setSelectedPhoto(file)
    }

    const handleCloseDeletePhoto = () => {
        setOpenDeletePhoto(false)
        setSelectedPhoto(null)
    }

    React.useEffect(() => {
        setValue("files", JSON.parse(user.publication.multimedia))
    }, [user.publication.multimedia.length])

    return (
        <Box sx={{
            background: '#fff',
            boxShadow: '0px 2px 20px rgba(133, 133, 133, 0.25)',
            borderRadius: '12px',
            position: 'relative',
            maxHeight: { md: '500px', lg: '600px' },
            width: '800px',
            overflowY: 'auto',
            position: 'relative'
        }} id="interests-drawer-container">
            <DialogTitle onClose={() => navigate(-1)}>
                Editar anuncio
            </DialogTitle>
            <Box id="drawer-container" sx={{
                display: 'flex',
                maxHeight: '660px',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
            }} component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box margin={'0 2rem'}>
                    <GalleryInput
                        control={control}
                        name='files'
                        rules={ADD_PHOTOS.rules}
                        validations={ADD_PHOTOS.messages}
                        deletePhotoHandler={handleOpenDeletePhoto}
                        accept={{
                            'image/*': []
                        }}
                        maxFiles={15}
                        message='Tienes un máximo de 15 fotos'
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    padding: '0 1rem 1rem 1rem'
                }}>
                    <Box sx={{
                        display: 'flex',
                        flex: 1
                    }}>
                        <Box padding='0 1rem 1rem 1rem'>
                            <DogInformation desktop/>
                        </Box>
                        <Box sx={{ pt: 2, pb: 2 }}>
                            <InterestInput
                                control={control}
                                options={interests}
                                currentValues={insterestsValues}
                                isSubmitting={isSubmitting}
                            />
                        </Box>
                    </Box>
                    <Box p={2}>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            fontWeight={500}
                            textTransform='uppercase'
                            gutterBottom
                        >
                            Descripción
                        </Typography>
                        <TextInput
                            name='description'
                            control={control}
                            placeholder='Escribir aquí'
                            multiline
                            maxRows={3}
                            rows={3}
                            rules={DESCRIPTION.rules}
                            validations={DESCRIPTION.messages}
                            labelColor="text"
                            sx={{
                                border: 'none !important',
                                padding: 0,
                                '&.Mui-focused': {
                                    boxShadow: 'none',
                                    borderColor: 'none'
                                },
                            }}
                        />
                    </Box>
                    <Box p={2}>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            fontWeight={500}
                            textTransform='uppercase'
                            gutterBottom
                        >
                            Permisos
                        </Typography>
                        <SwitchInput
                            label='Visualizar número de teléfono'
                            control={control}
                            name='permission_tlf'
                        />
                        <SwitchInput
                            label='Activar geolocalización'
                            control={control}
                            name='permission_geolocation'
                        />
                        <SwitchInput
                            label='Habilitar Whatsapp'
                            control={control}
                            name='permission_whatsapp'
                        />
                    </Box>
                </Box>
                <Box sx={{ padding: '0 1rem 1rem 1rem', textAlign: 'center' }}>
                    <Button variant="contained" type="submit">
                        Guardar
                    </Button>
                </Box>
            </Box>
            <PublicationWait open={openWarning} handleClose={handleCloseWarning} />
            <OverlayLoader open={openOverlayLoader} />
            <DeletePhotoWarning
                open={openDeletePhoto}
                handleClose={handleCloseDeletePhoto}
                file={selectedPhoto}
                endpoint={`api/publication/img_posted/${user.publication.id}`}
                sideAction={() => renewToken(dispatch, user)}
            />
        </Box>
    );
}

export default EditAdDesktop
