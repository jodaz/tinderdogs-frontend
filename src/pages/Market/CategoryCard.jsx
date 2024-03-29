import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import getUserPhoto from '../../utils/getUserPhoto';
import LinkBehavior from '../../components/LinkBehavior';

const CategoryCard = props => (
    <Card
        variant="outlined"
        sx={{
            display: 'flex',
            position: 'relative',
            border: 'none',
            flexDirection: { xs: 'column', sm: 'row' },
            transition: '0.3s',
            cursor: 'pointer',
            width: "100%",
            height: "100px",
            '&: hover': {
                opacity: 0.75
            }
        }}
        component={LinkBehavior}
        to={`/market/category/${props.id}`}
        state={props}
    >
        <CardMedia
            component="img"
            width="inherit"
            height="inherit"
            alt="category_pic"
            src={getUserPhoto(props.img)}
            sx={{
                background: theme => `${theme.palette.text.tertiary} !important`,
                borderRadius: '12px',
            }}
        />
        <Box sx={{
            position: 'absolute',
            bottom: '20px',
            left: '12px'
        }}>
            <Typography
                variant="body1"
                color="#fff"
                fontWeight={500}
                sx={{
                    textAlign: { xs: 'center', sm: 'start' },
                    mt: { xs: 1.5, sm: 0 },
                }}
            >
                {props.name}
            </Typography>
        </Box>
    </Card>
);

export default CategoryCard
