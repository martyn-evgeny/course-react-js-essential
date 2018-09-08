import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants';

import api from '../api';

const SessionActions = {
  authorize(immediate = false, callback ) {
    api.authorize({ immediate })
    .then(() => {
      AppDispatcher.dispatch({
        type: AppConstants.SESSION_AUTHORIZE_SUCCESS
      });

      if (callback) callback();
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.SESSION_AUTHORIZE_FAIL,
        error: err
      });

      if (callback) callback();
    });
  },

  signOut() {
    api.signOut()
    .then(() => {
      AppDispatcher.dispatch({
        type: AppConstants.SESSION_SIGNOUT_SUCCESS
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export default SessionActions;
