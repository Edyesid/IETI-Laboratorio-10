import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import './Card.css';

export default function FormDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={() => props.handleOpenChangeFilter(false)} aria-labelledby="Añadir items">
        <DialogTitle id="form-dialog-title">Task filter</DialogTitle>
        <DialogContent>

        <TextField className="filter"
                id="date"
                onChange={props.handleFilterDateChange}
                value={props.state.filterDate}
                select
                label="Duedate"
              > 
               {props.handleDatesForFilter().map((dueDate, i) => (
                    <MenuItem key={dueDate + i} value={dueDate}>
                        {dueDate}
                    </MenuItem>
                ))}
            </TextField>

            <TextField className="filter"
                id="email"
                onChange={props.handleFilterEmailChange}
                value={props.state.filterEmail}
                select
                label="Email"
              > 
               {props.handleEmailsForFilter().map((email, i) => (
                    <MenuItem key={email + i} value={email}>
                        {email}
                    </MenuItem>
                ))}
            </TextField>

            <TextField className="filter"
                id="status"
                onChange={props.handleFilterStateChange}
                value={props.state.filterState}
                select
                label="Status"
              > 
              <MenuItem value="expecting">
                expecting
              </MenuItem>

              <MenuItem value="ready">
                  ready
              </MenuItem>

            </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancelFilter} color="primary">
            Clear all
          </Button>
          <br/>
          <Button onClick={props.filter} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
