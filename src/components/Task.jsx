import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Task = React.createClass({
    getInitialState() {
        return {
            isEditing: false,
            data : this.props.dueTime
        };
    },

    handleEdit(e) {
        this.setState({ isEditing: true }, this.focusInput);
    },

    handleDelete() {
      this.props.onDelete();
    },

    handleCancel() {
        this.cancelTask();
    },

    handleSave() {
        this.saveTask();
    },

    handleCheck() {
        this.props.onStatusChange({
            isCompleted: !this.props.isCompleted
        });
    },

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTask();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelTask();
        }
    },

    focusInput() {
        this.input.focus();
    },

    saveTask() {
        this.props.onUpdate({
          text: this.input.value,
          data: this.state.data?this.state.data.toISOString():null,
          notes: this.inputNotes.value
         });

        this.setState({ isEditing: false });
    },

    cancelTask() {
        this.setState({
          isEditing: false,
          data: this.props.dueTime
        });
    },

    handleDateChange(event, newDate) {
      this.setState({
        data: newDate
      });
    },

    render() {
        return (
            this.state.isEditing
            ?
                <div className='Task editing'>
                    <p>название:</p>
                    <input
                        className='Task__input'
                        type='text'
                        defaultValue={this.props.text}
                        onKeyDown={this.handleKeyDown}
                        ref={c => this.input = c}
                    />
                  <p>описание:</p>
                  <input
                    className='Task__input'
                    type='text'
                    defaultValue={this.props.notes}
                    onKeyDown={this.handleKeyDown}
                    ref={c => this.inputNotes =c}
                  />
                  <p>срок выполнения:</p>
                  {
                    this.state.data?
                    <DatePicker hintText="Срок выполнения" defaultDate={this.state.data} onChange={this.handleDateChange} />
                    :<DatePicker hintText="Срок выполнения" onChange={this.handleDateChange} />
                  }

                    <div className='Task__toolbar'>
                        <div>
                            <RaisedButton primary onClick={this.handleSave} label='Save' />
                            <FlatButton onClick={this.handleCancel} label='Cancel' />
                            <FlatButton onClick={this.handleDelete} label='Delete' />
                        </div>
                    </div>
                </div>
            :
                <div className='Task'>
                    <Checkbox
                        className='Task__checkbox'
                        checked={this.props.isCompleted}
                        onCheck={this.handleCheck}
                    />

                    <div className='Task__text' onClick={this.handleEdit}>
                        <div className='Task__title'>
                          {`${this.props.text}`}
                          {this.props.dueTime?<br/>:``}
                          {
                            this.props.dueTime?
                              `срок выполнения: ${this.props.dueTime.toLocaleString("ru",
                               {
                                 year:'numeric',
                                 month:'long',
                                 day: 'numeric',
                                 weekday: 'long'
                               })}`
                               :``
                          }
                          {this.props.notes?<br/>:``}
                          {
                            this.props.notes?
                            `описание: ${this.props.notes}`
                            :``
                          }
                        </div>
                    </div>

                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
                    </IconMenu>
                </div>
        );
    }
});

export default Task;
