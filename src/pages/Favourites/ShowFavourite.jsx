import * as React from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Mail, Phone, ChevronLeft, Trash2, Compass } from 'lucide-react'
import LikeButton from '../../components/Buttons/LikeButton';
import PublicationDescription from '../../components/PublicationDescription';
import ListCertificates from '../certificates/ListCertificates'
import ShowVaccines from '../Vaccines/ShowVaccines';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../../components/Modals/ShowCard/PhotoGallery';
import Menu from '../../components/Menu';
import MessageButton from '../../components/Buttons/MessageButton';
import formatPhone from '../../utils/formatPhone';

const getImages = arrImages => arrImages.map(image => getUserPhoto(image));

const ShowFavourite = ({ item, deleteFav, close }) => {
    const {
        Ad: {
            multimedia,
            publi,
            description,
            LikesCount,
            permission_tlf
        }
    } = item
    const adPictures = getImages(JSON.parse(multimedia))
    console.log(item)
    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Box sx={{
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{
                    flex: 1,
                    height: 300,
                    width: '100%',
                    position: 'relative'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        left: 20,
                        top: 20
                    }}>
                        <IconButton onClick={close}>
                            <ChevronLeft color="#fff" />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        zIndex: 100,
                        bgcolor: 'rgba(0, 0, 0, 0.36)',
                        borderRadius: '100px',
                        right: 20,
                        top: 20
                    }}>
                        <Menu iconColor='#fff'>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }} onClick={() => deleteFav(item)}>
                                <Trash2 />
                                <Box sx={{ paddingLeft: '0.5rem' }}>
                                    Eliminar favorito
                                </Box>
                            </Box>
                        </Menu>
                    </Box>
                    <PhotoGallery images={adPictures} />
                </Box>
                <Box sx={{
                    borderRadius: '24px 24px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {publi.name}
                        </Typography>
                        <PublicationDescription
                            color='info.main'
                            dotColor='info'
                            age={publi.dogAge}
                            breed={publi.breed}
                            province={publi.Owner.province}
                            city={publi.Owner.city}
                        />
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Mail size={20} />
                                <Box marginRight='1rem' />
                                {publi.Owner.email}
                            </Typography>
                            {permission_tlf && (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Box>
                                        <Phone size={20} />
                                    </Box>
                                    <Box marginRight='1rem' />
                                    {formatPhone(publi.Owner)}
                                </Typography>
                            )}
                            {!!publi.characteristic.length && (
                                <Typography
                                    variant="body2"
                                    sx={{ display: 'flex', alignItems: 'start' }}
                                    color="text.secondary"
                                >
                                    <Box marginRight={'1rem'}>
                                        <Compass />
                                    </Box>

                                    Busco: {' '}
                                    {publi.characteristic.map(interest => `${interest.name}. `)}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {description}
                        </Typography>
                    </Box>
                    <Stack direction="row">
                        <Box sx={{ p: 1 }}>
                            <ShowVaccines
                                name={publi.Owner.name}
                                lastName={publi.Owner.lastName}
                                img_profile={publi.Owner.img_profile}
                                dog={publi}
                            />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <ListCertificates
                                name={publi.Owner.name}
                                lastName={publi.Owner.lastName}
                                img_profile={publi.Owner.img_profile}
                                dog={publi}
                            />
                        </Box>
                    </Stack>
                    <Box sx={{ p: 2 }}>
                        <Stack spacing={2} direction="row" mt={2}>
                            <LikeButton likes={LikesCount} item={item.Ad} />
                            <MessageButton itemID={publi.id_user} shouldCreate />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Slide>
    )
};

export default ShowFavourite
