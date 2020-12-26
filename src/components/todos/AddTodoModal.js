import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Header } from 'semantic-ui-react';
import { addTodo } from '../../actions/todos';

const AddTodoModal = props => {

  const [ open, setOpen ] = useState(false);
  const [ data, setData ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.submit(data);
    setData("");
    setOpen(false);
  }

  return (
    <Modal
      as={Form}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="blue" floated="right">Add todo</Button>}
      onSubmit={e => handleSubmit(e)}
    >
      <Header content="Add task to the list" />
      <Modal.Content>
        <Form.Input
          label="Add todo"
          type="text"
          placeholder="type your task"
          value={data}
          onChange={e => setData(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="submit"
          color="green"
          content="Add"
        />
      </Modal.Actions>
    </Modal>
)
};

export default connect(null, { submit: addTodo })(AddTodoModal);
