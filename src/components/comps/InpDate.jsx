import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';



const InpDate = (props) => {

    const { label, inputValue, action } = props;

    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);


    const handleChange = (event, valid) => {

        const addZero = (num) => String(num).padStart(2, '0');

        if (!valid.validationError) {
            if (event) {
                const d = event.$d;
                const date = `${d.getFullYear()}-${addZero(d.getMonth()+1)}-${addZero(d.getDate())}`     
                action(date);
            } else action(null);           
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
            <DemoContainer components={['DatePicker']} sx={{position: 'relative'}}>
                <DatePicker 
                    sx={{ m: 0, width: 420 }}
                    slotProps={{
                        field: { clearable: true, onClear: () => setCleared(true) },
                    }}
                    
                    label={label}
                    value={inputValue != null ? dayjs(inputValue) : null}

                    onChange={handleChange}
                                       
                />
                {cleared && (
                    <Alert
                    sx={{ position: 'absolute', top: 12, right: 50 }}
                    severity="success"
                    >
                    Поле очищено!
                    </Alert>
                )}
            </DemoContainer>     
        </LocalizationProvider>
  );
}

export default InpDate;