import * as React from 'react';
import Box from '@mui/material/Box';
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
import Stepper from '../Stepper';
import StepsFormButtons from '../StepsFormButtons';

const CreateBusinessStep2 = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useMultiStepForm();
    const {
        control,
        watch,
        handleSubmit,
        setValue
    } = useForm();
    const [cities, setCities] = React.useState([])
    const province = watch('province')

    const onSubmit = data => {
        saveStep(dispatch, data);
        navigate('/businesses/create/step-3')
    }

    React.useEffect(() => {
        if (province) {
            setValue('city', undefined)
            const filteredCities = ciudades
                .filter(({ id_provincia }) => id_provincia == province.id)

            setCities(filteredCities)
        }
    }, [province])

    React.useEffect(() => {
        if (Object.keys(state).length) {
            Object.entries(state)
                .forEach(([name, value]) => setValue(name, value))
        }
    }, [Object.keys(state).length])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper
                type="create"
                title="PASO 2"
            />
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
                    rules={PROVINCE.rules}
                    validations={PROVINCE.messages}
                    InputProps={{
                        placeholder: 'Seleccione una provincia'
                    }}
                    defaultValue={state.province}
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
                        rules={CITY.rules}
                        validations={CITY.messages}
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
                <MapInput
                    control={control}
                    setValue={setValue}
                    watch={watch}
                />
            </Box>
            <StepsFormButtons />
        </Box>
    );
}

export default CreateBusinessStep2
