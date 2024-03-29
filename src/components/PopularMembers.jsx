import * as React from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import Typography from "@mui/material/Typography";
import { useMediaQuery } from '@mui/material';

const puppies = [
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    },
    {
        name: 'Pupi',
        picture: '/Pupi.png'
    }
]

const PopularMembers = () => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <Box height='fit-content'>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 1
            }}>
                <Typography variant="subtitle" color='text.secondary'>
                    Miembros populares
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                zIndex: 1,
                height: 'fit-content',
                paddingBottom: 1
            }}>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={15}
                    slidesPerView={5}
                    navigation
                >
                    {puppies.map((user, i) => (
                        <SwiperSlide key={i}>
                            <Box sx={{
                                textAlign: 'center',
                                width: 'fit-content',
                                cursor: 'pointer',
                            }}>
                                <Avatar sx={{
                                    border: '1.5px solid #F59E0B',
                                    height: isSmall ? '48px' : '68px',
                                    width: isSmall ? '48px' : '68px',
                                }}
                                    src={`/images/samples/${user.picture}`}
                                />
                                <Box>
                                    {user.name}
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    )
}

export default PopularMembers
