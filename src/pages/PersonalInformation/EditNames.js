import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';
import { useAuth, renewToken } from '../../context/AuthContext';
import SettingsLayout from '../../layouts/SettingsLayout';
import { useForm } from 'react-hook-form';
import { fileProvider } from '../../api';
import { useNavigate } from 'react-router-dom';
import formDataHandler from '../../utils/formDataHandler';

const EditNames = () => {
    const { control, handleSubmit, formState: {
        isSubmitting
    }} = useForm({ reValidateMode: "onBlur" });
    const { state: { user }, dispatch } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async values => {
        try {
            const formData = await formDataHandler(values)
            const res = await fileProvider.put(`/api/auth/user-edit/${user.id}`, formData)

            if (res.status >= 200 && res.status < 300) {
                renewToken(dispatch, user)
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SettingsLayout title='Nombres y apellidos'>
            <Box sx={{
                pt: 1,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}  component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <TextInput
                            control={control}
                            name='name'
                            label="Nombre"
                            defaultValue={user.name}
                            placeholder='Ingrese su nombre'
                            disabled={isSubmitting}
                        />
                    </Box>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <TextInput
                            control={control}
                            name='lastName'
                            label="Apellido"
                            defaultValue={user.lastName}
                            placeholder='Ingrese su apellido'
                            disabled={isSubmitting}
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </SettingsLayout>
    );
}

export default EditNames
