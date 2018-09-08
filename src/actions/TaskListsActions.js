import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const TaskListsActions = {
  loadTaskLists() {
    api.listTaskLists()
    .then(data => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LISTS_LOAD_SUCCESS,
        items: data.items
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LISTS_LOAD_FAIL,
        error: err
      });
    });
  },

  createTaskList(params) {
    api.insertTaskList({ title: params.name })
    .then(data => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LIST_CREATE_SUCCESS,
        taskList: data
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LIST_CREATE_FAIL,
        error: err
      });
    });
  },

  updateTaskList(params) {
    api.updateTaskList({ tasklist: params.tasklist, title: params.title })
    .then(data => {
        AppDispatcher.dispatch({
          type: Constants.TASK_LIST_UPDATE_SUCCESS,
          taskList: data
        });

        AppDispatcher.dispatch({
          type: Constants.TASK_UPDATE_TASK_LIST_NAME_SUCCESS,
          name: data.title
        });
    })
    .catch(err => {
        AppDispatcher.dispatch({
          type: Constants.TASK_LIST_UPDATE_FAIL,
          error: err
        });
    });
  },

  deleteTaskList(taskListId) {
    api.deleteTaskList(taskListId)
    .then(data => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LISTS_DELETE_SUCCESS,
        taskListId: taskListId
      });
    })
    .catch(err => {
      AppDispatcher.dispatch({
        type: Constants.TASK_LISTS_DELETE_FAIL,
        err: err
      });
    });
  }

};

export default TaskListsActions;
