import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    PROVINCE,
    CITY,
    BUSINESS_ADDRESS
} from '../../../validations';
import { useForm } from 'react-hook-form';
import SelectInput from '../../../components/Forms/SelectInput';
import provincias from '../../../utils/provincias'
import ciudades from '../../../utils/ciudades'
import MapInput from '../../../components/Forms/MapInput';
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';

const CreateBusinessStep2 = () => {
    const navigate = useNavigate()
    const { dispatch } = useMultiStepForm();
    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            lat: 37.32485,
            leng: -5.934162
        }
    });
    const [cities, setCities] = React.useState([])
    const province = watch('province')

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/create/step-3')
    }

    React.useEffect(() => {
        if (province) {
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight={500}
                >
                    PASO 2
                </Typography>
            </Box>
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    Ingresar información sobre el lugar
                </Typography>
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='business_dir'
                    label='Dirección'
                    rules={BUSINESS_ADDRESS.rules}
                    validations={BUSINESS_ADDRESS.messages}
                    placeholder='Ingrese una dirección'
                />
            </Box>
            <Box p={2}>
                <SelectInput
                    control={control}
                    name="province"
                    label='Provincia'
                    options={provincias}
                    optionLabel='nombre'
                    InputProps={{
                        placeholder: 'Seleccione una provincia'
                    }}
                    noOptionsText='Sin resultados'
                />
            </Box>
            {!!(cities.length) && (
                <Box p={2}>
                    <SelectInput
                        control={control}
                        name="city"
                        label='Ciudad'
                        options={cities}
                        optionLabel='nombre'
                        InputProps={{
                            placeholder: 'Seleccione una ciudad'
                        }}
                        noOptionsText='Sin resultados'
                    />
                </Box>
            )}
            <Box sx={{
                height: 'fit-content',
                flex: 1
            }} p={2}>
                <MapInput control={control} watch={watch} setValue={setValue} />
            </Box>
            <Box sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default CreateBusinessStep2
