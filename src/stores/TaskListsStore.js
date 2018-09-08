import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _taskLists = [];
let _error = null;

function formatTaskList(data) {
    return {
        id   : data.id,
        name : data.title
    };
}

const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
  getTaskLists() {
    return _taskLists;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
      _taskLists = action.items.map(formatTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_LOAD_FAIL: {
      _taskLists = [];
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_CREATE_SUCCESS: {
      const newTaskList = formatTaskList(action.taskList);
      _taskLists.push(newTaskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_CREATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
      const updatedTaskIndex = _taskLists.findIndex( taskList => taskList.id === action.taskList.id);
      _taskLists[updatedTaskIndex] = formatTaskList(action.taskList);

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LIST_UPDATE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_DELETE_SUCCESS: {
      _taskLists = _taskLists.filter(list=>
        {
          return list.id != action.taskListId;
        }
      );

      TaskListsStore.emitChange();
      break;
    }

    case AppConstants.TASK_LISTS_DELETE_FAIL: {
      _error = action.error;

      TaskListsStore.emitChange();
      break;
    }

    default: {
    }
  }
});

export default TaskListsStore;
