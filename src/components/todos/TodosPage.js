import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../../actions/todos';
import { deleteTodo } from '../../actions/todos';
import { updateTodo } from '../../actions/todos';
import TodoItem from './TodoItem';
import AddTodoModal from './AddTodoModal';
import { Table } from 'semantic-ui-react';

const TodosPage = ({ todos, fetchData, onRemoveClick, onUpdateClick }) => {
  // eslint-disable-next-line
  useEffect(fetchData, []);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{width: "50%"}}>Tasks</Table.HeaderCell>
          <Table.HeaderCell>Added</Table.HeaderCell>
          <Table.HeaderCell>Checked</Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todos={todo}
            onRemoveClick={onRemoveClick}
            onUpdateClick={onUpdateClick}
          />
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>
            <AddTodoModal />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.data
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchTodos())
  },
  onRemoveClick: (e, id) => {
    e.preventDefault();
    dispatch(deleteTodo(id))
  },
  onUpdateClick: (e, id) => {
    e.preventDefault();
    dispatch(updateTodo(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);
