import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const TaskCreateModal = React.createClass({
    getInitialState() {
        return {
            text  : '',
            due   : null,
            notes : ''
        };
    },

    handleClose() {
        const { onClose } = this.props;

        this.setState({
          text : ''   ,
          due  : null ,
          notes: ''
         });

        if (onClose) {
            onClose();
        }
    },

    handleSubmit() {
        const { onSubmit } = this.props;

        if (onSubmit) {
          console.log("onsubmit "+ this.state.text + " " + this.state.notes + " "+ this.state.due);
            onSubmit({
                text  : this.state.text,
                due   : this.state.due?this.state.due.toISOString():null,
                notes : this.state.notes
            });
        }

        this.setState({
          text : ''   ,
          due  : null ,
          notes: ''
        });
    },

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    },

    handleNotesChange(e) {
        this.setState({
           notes: e.target.value
        });
    },

    handleDateChange(event, newDate) {
      this.setState({
        due: newDate
      });
    },

    render() {
        const { text, due, notes } = this.state;
        const { isOpen } = this.props;

        return (
            <Dialog
                className='TaskCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleClose}
                    />,
                    <FlatButton
                        primary
                        label='Submit'
                        disabled={!text}
                        onTouchTap={this.handleSubmit}
                    />
                ]}
                open={isOpen}
                onRequestClose={this.handleClose}
            >
                <h3 className='TaskCreateModal__modal-title'>Add task</h3>
                <TextField
                    fullWidth
                    ref={c => this.taskInput = c}
                    value={text}
                    onChange={this.handleTextChange}
                    hintText='e.g. buy a bottle of milk'
                    floatingLabelText='Enter task description'
                />
                <TextField
                    fullWidth
                    ref={c => this.taskInputNotes = c}
                    value={notes}
                    onChange={this.handleNotesChange}
                    hintText='e.g. very important!'
                    floatingLabelText='Enter task notes'
                />
              <DatePicker
                hintText="deadline for the task"
                defaultValue={due}
                onChange={this.handleDateChange}
              />
            </Dialog>
        );
    }
});

export default TaskCreateModal;
