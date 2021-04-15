import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from 'react-datepicker';

export default function FormDialog(props) {

  return (
    <div>
      <Dialog open={props.open} onClose={() => props.handleOpenChange(false)} aria-labelledby="Añadir items">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange = {props.handleDescriptionChange}
            value = {props.state.description}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange = {props.handleNameChange}
            value = {props.state.name}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            onChange = {props.handleEmailChange}
            value = {props.state.email}
          />

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Status"
                type="text"
                fullWidth
                onChange = {props.handleStatusChange}
                value = {props.state.status}
            />

            <DatePicker
                id="due-date"
                selected={props.state.dueDate}
                placeholderText="Due date"
                onChange={props.handleDateChange}>
            </DatePicker>

            <input
              required
              style = {{display: 'none', width: '30px'}}
              id="contained-button-file"
              multiple
              type="file"
              onChange={props.handleFileChange}            
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="default" component="span" style = {{width: "100%"}}>
                Upload image
              </Button>
            </label> <br></br> <br></br>  

        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleOpenChange(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSubmit} color="inherit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
