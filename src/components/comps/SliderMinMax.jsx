import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


const SliderMinMax = (props) => {

    const { val, action, MIN, MAX, step, disabled } = props;

    const marks = [
        { value: MIN, label: '' },
        { value: MAX, label: '' },
    ];

    const changeSliderVal = (_, newValue) => {
        action(newValue);
    };

    return (
        <Box sx={{ width: 250 }}>
            <Slider
                disabled={disabled}
                marks={marks}
                step={step}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={changeSliderVal}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="body2"
                    onClick={() => action(MIN)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MIN} min
                </Typography>
                <Typography
                    variant="body2"
                    onClick={() => action(MAX)}
                    sx={{ cursor: 'pointer' }}
                >
                    {MAX} max
                </Typography>
            </Box>
        </Box>
    );
}

export default SliderMinMax;