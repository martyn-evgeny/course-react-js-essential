import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import CircularProgress from 'material-ui/lib/circular-progress';

import Task from './Task.jsx';

import './TasksPage.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const TasksPage = React.createClass({
    getInitialState() {
        return {
            isChangeTaskList: false
        };
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.taskListName !== nextProps.taskListName) {
            this.setState({
              isChangeTaskList: false
            });
        }
    },

    handleSubmitTaskList() {
        this.saveTaskList();
    },

    handleEditTaskList() {
      this.setState({ isChangeTaskList: true }, () => this.taskNameInput.focus() );
    },

    cancelEditingTaskList() {
      this.setState({ isChangeTaskList: false });
    },

    saveTaskList() {
      this.props.onUpdateTaskList( this.taskNameInput.getValue() );
      this.cancelEditingTaskList();
    },

    handleTaskListEditKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.saveTaskList();
        }

        if (e.keyCode === ESC_KEY) {
            this.cancelEditingTaskList();
        }
    },

    handleEditChangeTaskList() {
      this.setState({ isChangeTaskList: !this.state.isChangeTaskList });
    },

    renderTasks() {
      return (
          <div className='TasksPage__tasks'>
              {
                  this.props.tasks.map(task =>
                      <Task
                          key={task.id}
                          text={task.text}
                          notes={task.notes}
                          dueTime={task.dueTime}
                          isCompleted={task.isCompleted}
                          onDelete={this.props.onTaskDelete.bind(null, task.id)}
                          onStatusChange={this.props.onTaskStatusChange.bind(null, task.id)}
                          onUpdate={this.props.onTaskUpdate.bind(null, task.id)}
                      />
                  )
              }
          </div>
      );
    },

    render() {
        if (this.props.error) {
          return (
            <div className='TasksPage'>
              <div className='TasksPage_error'>
                {this.props.error}
              </div>
            </div>
          );
        }
        return (
            <div className='TasksPage'>
                <div className='TasksPage__header'>
                    {
                      this.state.isChangeTaskList?
                      <div>
                        <TextField
                            fullWidth
                            ref={c => this.taskNameInput = c}
                            defaultValue={this.props.taskListName}
                            hintText='e.g. shop'
                            floatingLabelText='Enter task description'
                            onKeyDown={this.handleTaskListEditKeyDown}
                        />
                        <RaisedButton primary onClick={this.saveTaskList} label='Save' />
                        <FlatButton onClick={this.cancelEditingTaskList} label='Cancel' />
                      </div>
                      :<h2 className='TasksPage__title' onClick={this.handleEditChangeTaskList}>{this.props.taskListName}</h2>
                    }
                    <div className='TasksPage__tools'>
                        <div>
                            <IconButton onClick={this.props.onAddTask}>
                                <ContentAdd />
                            </IconButton>
                        </div>
                        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                            <MenuItem onClick={this.handleEditChangeTaskList}>Edit</MenuItem>
                            <MenuItem onClick={this.props.onDeleteTaskList}>Delete</MenuItem>
                        </IconMenu>
                   </div>
               </div>
                {
                    this.props.isLoadingTasks
                    ?
                      <CircularProgress />
                    :
                      this.renderTasks()
                }
            </div>
        );
    }
});

export default TasksPage;
