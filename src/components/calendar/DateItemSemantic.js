import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasks';
import { deleteTask } from '../../actions/tasks';
import { Table, Form, Popup, Button, Grid, List } from 'semantic-ui-react'
import "../../styles/calendarsemantic.css";

const DateItem = props => {

  const [ task, setTask ] = useState("");
  const [ hours, setHours ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  const [ open, setOpen ] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    props.submitAdd({
      year: props.year,
      month: props.month,
      day: props.day,
      tasks: [{
        task: task,
        h: hours,
        min: minutes < 10 ? '0' + minutes : minutes
      }]
    })
    setTask("");
    setHours(0);
    setMinutes(0);
    setOpen(false);
  }

  return (
    <Popup
      open={open}
      eventsEnabled={true}
      position='bottom center'
      trigger={
        <Table.Cell onClick={() => {setOpen(!open)}}>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                {props.day}
              </Grid.Column>
              <Grid.Column>
                <List divided>
                  {props.tasks.tasks ? props.tasks.tasks.map(y =>
                    <List.Item
                      key={props.tasks.id}
                      onClick={(e) => {props.onRemoveClick(e, props.tasks.id)}}>
                      <List.Content>
                        {y.task}
                      </List.Content>
                      <List.Content>
                        {y.h}:{y.min}
                      </List.Content>
                    </List.Item>
                    ): null
                  }
                  </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
      }
    >
      <Popup.Header>Add task</Popup.Header>
      <Popup.Content>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Input
            type="text"
            id="task"
            name="task"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <Form.Group widths='equal'>
            <Form.Input
              type="number"
              min="0" max="23"
              value={hours}
              onChange={e => setHours(e.target.value)}
            />
            <Form.Input
              type="number"
              min="0" max="59"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
            />
          </Form.Group>
          <Button>Add</Button>
        </Form>
      </Popup.Content>
    </Popup>
  )
};

const mapDispatchToProps = (dispatch) => ({
  submitAdd: (payload) => {
    dispatch(addTask(payload))
  },
  // submitUpdate: (payload) => {
  //   dispatch(updateTask(payload))
  // },
  onRemoveClick: (e, id) => {
    e.preventDefault();
    dispatch(deleteTask(id))
  },
});

export default connect(null, mapDispatchToProps)(DateItem);
