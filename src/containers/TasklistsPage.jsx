import React from 'react';

import TaskListsStore from '../stores/TaskListsStore';
import TaskListsActions from '../actions/TaskListsActions';
import SessionActions from '../actions/SessionActions';

import TasklistsPage from '../components/TasklistsPage.jsx';
import TaskListCreateModal from '../components/TaskListCreateModal.jsx';



function getStateFromFlux() {
  return {
    taskLists: TaskListsStore.getTaskLists()
  };
}

const TasklistsPageContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
      return {
        ...getStateFromFlux(),
        isCreatingTaskList: false
      };
    },

    componentWillMount() {
      TaskListsActions.loadTaskLists();
    },

    componentDidMount() {
      TaskListsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
      TaskListsStore.removeChangeListener(this._onChange);
    },

    handleAddTaskList() {
      this.setState({ isCreatingTaskList: true });
    },

    handleClose() {
      this.setState({ isCreatingTaskList: false });
    },

    handleTaskListSubmit(taskList) {
      TaskListsActions.createTaskList(taskList);

      this.setState({ isCreatingTaskList: false });
    },

    handleLogOut() {
      SessionActions.signOut();
      this.context.router.push('/login');
    },

    render() {
      
        return (
          <div>
            <TasklistsPage
              taskList={this.state.taskLists}
              selectedListId={this.props.params.id}
              page={this.props.children}
              onAddTaskList={this.handleAddTaskList}
              onLogOut={this.handleLogOut}
            />

            <TaskListCreateModal
                isOpen={this.state.isCreatingTaskList}
                onSubmit={this.handleTaskListSubmit}
                onClose={this.handleClose}
            />
          </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasklistsPageContainer;
