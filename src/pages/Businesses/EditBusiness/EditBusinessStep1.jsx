import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextInput from '../../../components/Forms/TextInput';
import {
    DESCRIPTION,
    BUSINESS_NAME,
    CATEGORY,
    PHONE
} from '../../../validations';
import { apiProvider } from '../../../api';
import Button from '@mui/material/Button';
import SelectInput from '../../../components/Forms/SelectInput';
import useEffectOnce from '../../../utils/useEffectOnce';
import { useForm } from 'react-hook-form'
import { saveStep, useMultiStepForm } from '../../../context/MultiStepContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import PhoneInput from '../../../components/Forms/PhoneInput';
import Stepper from '../Stepper';
import StepsFormButtons from '../StepsFormButtons';

const categoryName = 'TIENDAS DE MASCOTAS';

const EditBusinessStep1 = () => {
    const navigate = useNavigate();
    const { state: { user } } = useAuth();
    const { state, dispatch } = useMultiStepForm();
    const [categories, setCategories] = React.useState([])
    const {
        control,
        handleSubmit,
        setValue
    } = useForm({
        defaultValues: {
            business_name: user.publication.business_name,
            facebook: user.publication.facebook,
            instagram: user.publication.instagram,
            web_site: user.publication.web_site,
            description: user.publication.description
        }
    });

    const fetchCategories = async () => {
        try {
            const res = await apiProvider.get('api/category/categories')

            if (res.status >= 200 && res.status < 300) {
                const { data: { data } } = res;

                setCategories(data);
            }
        } catch (error) {
            console.log("error ", error)
        }
    }

    const onSubmit = data => {
        const { category, ...restData } = data;

        saveStep(dispatch, {
            ...restData,
            id_category: category.id
        });
        navigate('/businesses/edit/step-2')
    }

    useEffectOnce(() => { fetchCategories() }, [])

    React.useEffect(() => {
        setValue('whatsApp', state.whatsApp)
    }, [state])

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stepper title='PASO 1' type='edit' />
            <Box p={2}>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    Ingresar información sobre el negocio
                </Typography>
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='business_name'
                    label='Nombre del negocio'
                    rules={BUSINESS_NAME.rules}
                    validations={BUSINESS_NAME.messages}
                />
            </Box>
            {!!(categories.length) && (
                <Box p={2}>
                    <SelectInput
                        control={control}
                        name="category"
                        label='Categoría'
                        options={categories}
                        defaultValue={categories.find(({ name }) => name === categoryName)}
                        optionLabel='name'
                        rules={CATEGORY.rules}
                        validations={CATEGORY.messages}
                    />
                </Box>
            )}
            <Box p={2}>
                <PhoneInput
                    label="Teléfono"
                    control={control}
                    name="whatsApp"
                    rules={PHONE.rules}
                    defaultCodePhone={state.code_phone}
                    validations={PHONE.messages}
                    placeholder='Ingresar teléfono'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='facebook'
                    label='Facebook (negocio)'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='instagram'
                    label='Instagram (negocio)'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='web_site'
                    label='Sitio web'
                />
            </Box>
            <Box p={2}>
                <TextInput
                    control={control}
                    name='description'
                    label='Descripción'
                    rules={DESCRIPTION.rules}
                    validations={DESCRIPTION.messages}
                    multiline
                    maxRows={4}
                    rows={4}
                    sx={{
                        borderRadius: '16px !important',
                    }}
                />
            </Box>
            <StepsFormButtons />
        </Box>
    );
}

export default EditBusinessStep1
