import React from 'react';

import TasksActions from '../actions/TasksActions';
import TaskListsActions from '../actions/TaskListsActions';
import TasksStore from '../stores/TasksStore';

import TasksPage from '../components/TasksPage.jsx';
import TaskCreateModal from '../components/TaskCreateModal.jsx';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks(),
        error: TasksStore.getError(),
        name : TasksStore.getNameTaskList(),
        isLoadingTasks: TasksStore.isLoadingTasks()
    };
}

const TasksPageContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            ...getStateFromFlux(),
            isCreatingTask: false,
            isDeletingTaskList: false
        };
    },

    componentWillMount() {
        TasksActions.loadTasks(this.props.params.id);
    },

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
          TasksActions.loadTasks(nextProps.params.id);
        }
    },

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    },

    handleStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    },

    handleTaskUpdate(taskId, { text, data, notes }) {
        TasksActions.updateTask({
            taskListId: this.props.params.id,
            taskId: taskId,
            text: text,
            data: data,
            notes: notes
        });
    },

    handleTaskDelete(taskId) {
        TasksActions.deleteTask({
            taskListId: this.props.params.id,
            taskId: taskId
        });
    },

    handleAddTask() {
        this.setState({ isCreatingTask : true });
    },

    handleClose() {
        this.setState({ isCreatingTask : false });
    },

    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;
        TasksActions.createTask({ taskListId, ...task });
        this.setState({ isCreatingTask : false });
    },

    handleDeleteTaskList() {
      this.setState({ isDeletingTaskList: true });
    },

    handleDialogDeleteSubmit() {
      TaskListsActions.deleteTaskList(this.props.params.id);
      this.context.router.push('/lists');
    },

    handleDialogDeleteClose() {
      this.setState({ isDeletingTaskList: false });
    },

    handleUpdateTaskList(title) {
      TaskListsActions.updateTaskList({
        tasklist :  this.props.params.id,
        title    :  title
      });
    },

    render() {
        return (
          <div>
            <TasksPage
              taskListName={this.state.name}
              tasks={this.state.tasks}
              onUpdateTaskList={this.handleUpdateTaskList}
              onAddTask={this.handleAddTask}
              onDeleteTaskList={this.handleDeleteTaskList}
              onTaskStatusChange={this.handleStatusChange}
              onTaskUpdate={this.handleTaskUpdate}
              onTaskDelete={this.handleTaskDelete}
              error={this.state.error}
              isLoadingTasks={this.state.isLoadingTasks}
            />
            <TaskCreateModal
                isOpen={this.state.isCreatingTask}
                onSubmit={this.handleTaskSubmit}
                onClose={this.handleClose}
            />
            <Dialog
                className='TaskCreateModal'
                contentStyle={{ maxWidth: 400 }}
                actions={[
                    <FlatButton
                        label='Cancel'
                        onTouchTap={this.handleDialogDeleteClose}
                    />,
                    <FlatButton
                        primary
                        label='Delete'
                        onTouchTap={this.handleDialogDeleteSubmit}
                    />
                ]}
                open={this.state.isDeletingTaskList}
                onRequestClose={this.handleDialogDeleteClose}
            >
            <h3>Вы точно хотите удалить список задач: {this.state.name} </h3>
            </Dialog>
          </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPageContainer;
