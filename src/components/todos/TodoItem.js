import React from 'react';
import Moment from 'react-moment';
import { Table, Icon } from 'semantic-ui-react'

const TodoItem = ({ todos, onRemoveClick, onUpdateClick }) => (

  <Table.Row>
    <Table.Cell>
      {todos.todo}
    </Table.Cell>
    <Table.Cell>
      <Moment format="DD.MM.YYYY hh:mm" unix>
        {todos.date.seconds}
      </Moment>
    </Table.Cell>
    <Table.Cell>
      <Icon
        color={todos.done ? "green" : "red"}
        name="check circle outline"
        onClick={(e) => {onUpdateClick(e, todos.id)}}
      />
    </Table.Cell>
    <Table.Cell textAlign='center'>
      <Icon
        name="delete"
        onClick={(e) => {onRemoveClick(e, todos.id)}}
      />
    </Table.Cell>
  </Table.Row>
);

export default TodoItem;
