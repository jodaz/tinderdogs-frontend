import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/FiberManualRecord';
import ShowCard from '../../components/Modals/ShowCard';
import getUserPhoto from '../../utils/getUserPhoto';
import PhotoGallery from '../Modals/ShowCard/PhotoGallery';
import FavouriteButton from '../Buttons/FavouriteButton'
import LikeButton from '../Buttons/LikeButton'
import { Mail, Phone } from 'lucide-react';
import formatPhone from '../../utils/formatPhone';
import { useMediaQuery } from '@mui/material';

const createPersonalPhotosArr = data => {
    if (data) {
        const arrayNames = JSON.parse(data);

        return arrayNames.map(file => getUserPhoto(file))
    } else {
        return ['/images/Avatar.svg']
    }
}

const OwnerPublication = ({ open, data, handleClose, handleOpenContactDialog }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const years = 26
    const dogPhoto = open && getUserPhoto(JSON.parse(data.publi?.dogPhotos)[0]);
    const personalPhotos = open && createPersonalPhotosArr(data.publi?.Owner.personalPhotos)

    if (!open) return null

    const { Owner } = data.publi

    return (
        <ShowCard
            open={open}
            handleClose={handleClose}
            photo={dogPhoto}
            name={data.publi.name}
        >
            <Box sx={{
                flex: 1,
                height: isSmall ? 280 : 400,
                width: isSmall ? '100%' : 400
            }}>
                <PhotoGallery images={personalPhotos} />
            </Box>
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <Box flex={1} p={2}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {data.publi.Owner.name}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 'fit-content',
                            width: 'fit-content'
                        }}>
                            {(years) && (
                                <Typography color='info.main'>
                                    {years} años
                                </Typography>
                            )}
                            {(Owner.province && Owner.city) && (
                                <>
                                    <Box sx={{ fontSize: '8px', padding: '0 8px' }}>
                                        <CircleIcon sx={{ fill: '#3B82F6', fontSize: '8px' }} />
                                    </Box>
                                    <Typography color='info.main'>
                                        {Owner.province},&nbsp;
                                        {Owner.city}
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <Box mt={2}>
                            {(data.permission_tlf && Owner.phone) && (
                                <Typography
                                    variant="subtitle1"
                                    color="info.main"
                                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    gutterBottom
                                    onClick={handleOpenContactDialog}
                                >
                                    <Phone />
                                    <Box marginRight='1rem' />
                                    {formatPhone(Owner)}
                                </Typography>
                            )}
                            <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Mail color="#4B4B4B" />
                                <Box marginRight='1rem' />
                                {data.publi.Owner.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box flex={1} p={2}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h5" color="text.secondary" fontWeight={500}>
                            {data.name}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', mb: 2, ml: 2 }}>
                    <Box sx={{ p: 2 }}>
                        <FavouriteButton item={data} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <LikeButton item={data} />
                    </Box>
                </Box>
            </Box>
        </ShowCard>
    );
}

export default OwnerPublication
