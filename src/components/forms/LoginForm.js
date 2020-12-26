import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { signIn } from '../../actions/auth';

const LoginForm = props => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.submit({email: email, password: password});
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Make it secure"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Field>

      <Button primary>Login</Button>
    </Form>
  )
};

export default connect(null, { submit: signIn })(LoginForm);
