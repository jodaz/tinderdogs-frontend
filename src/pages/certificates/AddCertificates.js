import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText'
import { Plus } from 'lucide-react';
import FileInput from './FileInput';
import TrashButton from '../../components/Buttons/TrashButton';
// import AddCertificateModal from '../../components/Modals/AddCertificateModal';

const AddCertificates = ({ control }) => {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);

    const addCertificate = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeCertificate = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {indexes.map((index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, p: 1 }}>
                        <FileInput control={control} name={`certificates`} />
                    </Box>
                    <Box>
                        <TrashButton onClick={removeCertificate(index)} />
                    </Box>
                </Box>
            ))}
            <Box>
                <Button onClick={addCertificate} disabled={counter == 4} size='small' sx={{ fontSize: '14px' }}>
                    <Plus size={18} /> Añadir más
                </Button>
            </Box>
            {(counter == 4) && (
                <Box sx={{ p: 2}}>
                    <FormHelperText error>
                        Haz alcanzado el límite de certificados.
                    </FormHelperText>
                </Box>
            )}
            {/* <AddCertificateModal open={isModalOpen} handleClose={() => setIsModalOpen(false)}  /> */}
        </Box>
    );
}

export default AddCertificates
