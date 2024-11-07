import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';



const filter = createFilterOptions();

const InpSelectSearch = (props) => {

  const { label, itemsArr, inputValue, action, width } = props;

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: '',
      form: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: '',
    form: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    action(`${dialogValue.name}, ${dialogValue.form}`);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={inputValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                form: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              form: '',
            });
          } else {
            newValue ?
            action(`${newValue.name}, ${newValue.form}`):
            action(null)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Новый: "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={itemsArr}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return `${option.name}, ${option.form}`;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        sx={{ width: width }}
        freeSolo
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Добавление нового контрагента</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Укажите контрагента и форму организации.
            </DialogContentText>
            <TextField
              autoFocus
              sx={{width: '70%'}}
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="контрагент"
              type="text"
              variant="standard"
            />
            <FormControl variant="standard" margin="dense" sx={{width: '30%', textAlign: 'center'}}>
              <InputLabel id="demo-simple-select-label">форма</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 
                value={dialogValue.form}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    form: event.target.value,
                  })}
              >
                <MenuItem value={"ИП"}>ИП</MenuItem>
                <MenuItem value={"ООО"}>ООО</MenuItem>
                <MenuItem value={"ОАО"}>ОАО</MenuItem>
                <MenuItem value={"ЗАО"}>ЗАО</MenuItem>
              </Select>
            </FormControl>            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type="submit" disabled={!dialogValue.form && true} >Добавить</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default  InpSelectSearch;
