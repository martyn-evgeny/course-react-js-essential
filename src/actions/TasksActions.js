import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
    loadTasks(taskListId) {
      AppDispatcher.dispatch({
          type : AppConstants.TASKS_LOAD_REQUEST,
          name : ''
      });

      Promise.all([
        api.listTasks(taskListId),
        api.taskName(taskListId)
      ])
      .then(valArray => {
          AppDispatcher.dispatch({
              type : AppConstants.TASKS_LOAD_SUCCESS,
              items : valArray[0].items || [],
              name : valArray[1]
          });
      })
      .catch(err => {
          AppDispatcher.dispatch({
              type  : AppConstants.TASKS_LOAD_FAIL,
              error : err
          });
        });
    },

    updateTaskStatus(params) {
        AppDispatcher.dispatch({
            type   : AppConstants.TASK_UPDATE_REQUEST,
            taskId : params.taskId,
            isCompleted   : params.isCompleted
        });

        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    updateTask(params) {
        AppDispatcher.dispatch({
            type   : AppConstants.TASK_UPDATE_REQUEST,
            taskId : params.taskId,
            text   : params.text
        });

        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.text,
            due: params.data,
            notes: params.notes
        })
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    deleteTask(params) {
        api.deleteTask({
            taskListId: params.taskListId,
            taskId: params.taskId
        })
        .then(data => {
            AppDispatcher.dispatch({
              type   : AppConstants.TASK_DELETE_SUCCESS,
              taskId : params.taskId
            });
        })
        .catch(err => {
          AppDispatcher.dispatch({
            type  : AppConstants.TASK_DELETE_FAIL,
            error : err
          });
        });
    },

    createTask(params) {
        api.insertTask({
            taskListId: params.taskListId,
            title: params.text,
            due: params.due,
            notes: params.notes
        })
        .then(data => {
          AppDispatcher.dispatch({
              type : AppConstants.TASK_CREATE_SUCCESS,
              task : data
          });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_CREATE_FAIL,
                error : err
            });
        });
    }

};

export default TasksActions;
