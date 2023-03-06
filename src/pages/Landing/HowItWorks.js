import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Market from '../../assets/images/iPhone13.png'
import Blog from '../../assets/images/iPhone-Blog.png'
import Chat from '../../assets/images/iPhone-Chat.png'
import iPhoneAd from '../../assets/images/iPhone-AD.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import DescriptionSection from './DescriptionSection'

const HowItWorks = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.secondary.main,
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4
        }} id="howitworks">
            <Box sx={{
                textAlign: 'left',
                width: { sm: '80%', xs: '80%', md: '30%', lg: '30%' },
                margin: 'auto 0',
                textAlign: 'center'
            }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="text.main"
                    fontSize='2rem'
                    lineHeight={isSmall ? '32px' : '40px'}
                    gutterBottom
                >
                    ¿Cómo funciona?
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontSize='1rem'
                    gutterBottom
                >
                    Descubre las funcionalidades de nuestra App
                </Typography>
            </Box>
            <DescriptionSection
                Image={iPhoneAd}
                marked='Localiza'
                title='y conoce mascotas que se encuentren cerca de ti.'
                subtitle={'Crea un perfil para tu adorable mascota. Utiliza diferentes filtros para encontrar perros cercanos, por ubicación o razas que estes buscando.'}
            />
            <DescriptionSection
                Image={Market}
                marked='Conoce'
                title='nuestro Market'
                subtitle={'Puedes utilizar el buscador  o filtrar por categorías para encontrar la tienda de tu interés. Ademas si tienes un negocio ¡Esta es una gran oportunidad para ti! Tendrás la opción de poder anunciarlo en el Market.'}
                orientation='row'
            />
            <DescriptionSection
                Image={Blog}
                marked='Conoce'
                title={'las últimas noticias sobre las mascotas'}
                subtitle={'Podrás encontrar información y noticias sobre mascotas, interactuar con la comunidad de TinderDogs, comentando y dando like a las diferentes publicaciones de otros usuarios.'}
            />
            <DescriptionSection
                Image={Chat}
                marked='Coincidir'
                title={'y chatear'}
                subtitle={'Accede al chat con pocos clics. Haz coincidir las mascotas con las que te gustaría chatear. Podrás acceder al chat una vez que ambas mascotas coincidan ¡Así que comienza a dar me gusta a las mascotas que te gustan!'}
                orientation='row'
            />
        </Box>
    )
}

export default HowItWorks