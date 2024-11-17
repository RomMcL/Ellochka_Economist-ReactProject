import React from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

const LoadingData = (props) => {

    const { progressGenerateIncome, progressGenerateExpense } = props;

    return (
        <React.Fragment>
            <h4>Любочка сводит Дебет с Кредитом...</h4>
            <Stack spacing={2} direction="row" alignItems="center">
                <p>Формирование доходов</p>
                <CircularProgressWithLabel value={progressGenerateIncome} />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
                <p>Формирование расходов</p>
                <CircularProgressWithLabel value={progressGenerateExpense} />
            </Stack>
            { progressGenerateExpense === 100 && 
                <>
                  <h4>Почти готово...</h4>
                  <h5>Эллочка сортирует и записывает данные...</h5>
                  <CircularProgress />
                </>
            }
        </React.Fragment>
    )
}

export default LoadingData;