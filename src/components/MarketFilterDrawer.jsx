import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DialogTitle from './DialogTitle';
import { useForm } from "react-hook-form";
import ciudades from '../utils/ciudades';
import provincias from '../utils/provincias';
import SelectInput from './Forms/SelectInput';
import SliderInput from './Forms/SliderInput'
import {
    fetchBusinesses,
    useBusinesses,
    toggleFilters,
    resetFilters
} from '../context/BusinessContext';
import TextInput from './Forms/TextInput';
import { alpha } from '@mui/material';
import { useAuth, toggleGeolocation } from '../context/AuthContext';

const MarketFilterDrawer = () => {
    const [cities, setCities] = React.useState([])
    const { state: { userCoords }, dispatch: authDispatch } = useAuth()
    const { control, handleSubmit, watch, reset, formState: {
        isSubmitting
    }} = useForm({
        reValidateMode: "onBlur"
    });
    const province = watch('province')
    const { state: { openFilter }, dispatch } = useBusinesses();

    const resetAndToggleDrawer = () => {
        toggleFilters(dispatch)
        reset();
    }

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key !== 'Tab' || event.key !== 'Shift')) {
            if (event.keyCode == 27) {
                resetAndToggleDrawer()
            }
            return;
        }
        resetAndToggleDrawer()
    };

    const resetFilter = () => {
        reset()
    }

    const onSubmit = async values => {
        const parsedData = {};

        try {
            let {
                province,
                city,
                distance
            } = values;

            if (province) {
                parsedData.province = province.nombre;
            }
            if (city) {
                parsedData.city = city.nombre;
            }
            if (distance) {
                const { latitude, longitude } = userCoords

                parsedData.lat = latitude
                parsedData.lon = longitude
                parsedData.km = distance;
            }

            const res = await fetchBusinesses(dispatch, parsedData)

            toggleFilters(dispatch)
        } catch (error) {
            console.log(error)
        }
    };

    const list = (anchor) => (
        <Box onKeyDown={toggleDrawer(anchor, false)} component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle onClose={toggleDrawer(anchor, false)}>
                Filtros
            </DialogTitle>
            <Divider />
            <Box sx={{ p: 3 }}>
                <TextInput
                    name='country'
                    control={control}
                    label='País'
                    value='España'
                    optionLabel='País'
                    disabled
                />
            </Box>
            <Box sx={{ p: 3 }}>
                <SelectInput
                    name='province'
                    control={control}
                    disabled={isSubmitting}
                    label='Ciudad, estado o provincia'
                    options={provincias}
                    optionLabel='nombre'
                    InputProps={{
                        placeholder: 'Seleccione'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            {!!(cities.length) && (
                <Box sx={{ p: 3 }}>
                    <SelectInput
                        name='city'
                        control={control}
                        disabled={isSubmitting}
                        label='Distrito'
                        options={cities}
                        optionLabel='nombre'
                        InputProps={{
                            placeholder: 'Seleccione'
                        }}
                        noOptionsText='Sin resultados'
                    />
                </Box>
            )}
            <Box sx={{ p: 3 }}>
                <SliderInput
                    label='Distancia'
                    control={control}
                    name="distance"
                    disabled={isSubmitting || !userCoords}
                    handleClick={(isSubmitting || !userCoords)
                        ? () => toggleGeolocation(authDispatch)
                        : null
                    }
                />
            </Box>
            <Box sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    Filtrar
                </Button>
                <Box mt={2} />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => resetFilter()}
                    sx={{
                        backgroundColor: '#ccc',
                        '&:hover': {
                            color: '#fff',
                            backgroundColor: alpha(`#000`, 0.3)
                        }
                    }}
                >
                    Limpiar
                </Button>
            </Box>
        </Box>
    );

    React.useEffect(() => {
        if (province) {
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Drawer
                    anchor={'bottom'}
                    open={openFilter}
                    onClose={toggleDrawer('bottom', false)}
                    sx={{
                        '& .MuiPaper-root': {
                            position: 'absolute',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            width: '99%',
                            bottom: 0
                        },
                    }}
                    PaperProps={{ style: { position: 'absolute' } }}
                    BackdropProps={{ style: { position: 'absolute' } }}
                    ModalProps={{
                        container: document.getElementById('market-drawer-container'),
                        style: { position: 'absolute' }
                    }}
                >
                    {list('bottom')}
                </Drawer>
            </Box>
        </Box>
    );
}

export default MarketFilterDrawer
