import { combineReducers} from 'redux';
import auth from './auth';
import todos from './todos';
import tasks from './tasks';
import books from './books';

export default combineReducers({
  auth,
  todos,
  tasks,
  books
});
