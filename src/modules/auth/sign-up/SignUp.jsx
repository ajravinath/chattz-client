import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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

const SignUp = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    let values = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value
    };

    try {
      const data = await authApi.signUp(values);
      if (data.status === 'success') {
        setError(null);
        setSignUpSuccess(true);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error);
      setSignUpSuccess(false);
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
                  <h3>Sign Up</h3>
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
                    <Label for="firstName">First name</Label>
                  </Col>
                  <Col>
                    <Input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Fist name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <Label for="lastName">Last name</Label>
                  </Col>
                  <Col>
                    <Input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last name"
                    />
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
                  <Col className="d-flex justify-content-end">
                    {signUpSuccess && <Redirect to="/login" />}
                    <Button color="success" type="submit">
                      Sign up
                    </Button>
                  </Col>
                </FormGroup>
              </CardText>
            </CardBody>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
