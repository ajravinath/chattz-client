import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Alert
} from 'reactstrap';
import authApi from '../../../api-client/auth';
import authHelper from './../../shared/helper/authHelper';

const Login = props => {
  const { appContext } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    let values = {
      email: event.target[0].value,
      password: event.target[1].value
    };
    try {
      const response = await authApi.login(values);
      console.log('TEST 1', response);
      if (response.status === 'success') {
        console.log('TEST 2', response.status);
        authHelper.onLogin(response.data.token);
        appContext.onLogin(response.data);
        setError(null);
        setJoinSuccess(true);
      } else {
        console.log('TEST 3', response.status);
        throw new Error(response.error);
      }
    } catch (error) {
      console.log('TEST 4', error);
      setJoinSuccess(false);
      setError(error);
    }
  };

  return (
    <Row className="full-height v-center">
      <Col sm={{ size: 6, offset: 3 }}>
        <Card>
          <Form onSubmit={handleSubmit}>
            <CardBody>
              <CardTitle>
                <Col>
                  <h3>Login</h3>
                </Col>
              </CardTitle>
              <CardText tag="div">
                <FormGroup>
                  <Col>
                    <Alert color="danger" isOpen={!!error}>
                      {error?.message ?? ''}
                    </Alert>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <Label for="exampleEmail">Email</Label>
                  </Col>
                  <Col>
                    <Input
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="john@email.com"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <Label for="examplePassword">Password</Label>
                  </Col>
                  <Col>
                    <Input
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="s0m357r0ngp4s5w0rd"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col className="d-flex justify-content-center">
                    {joinSuccess === true && <Redirect to="/chattz" />}
                    <Button color="success" type="submit">
                      Submit
                    </Button>
                  </Col>
                </FormGroup>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <small>
                      Don't have an account?{' '}
                      <NavLink to="/signup">Sign up</NavLink>
                    </small>
                  </Col>
                </Row>
              </CardText>
            </CardBody>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
