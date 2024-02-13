import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  // Initialize state for form data and alerts
  const [userFormData, setUserFormData] = useState({ loginInput: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  // Setup the LOGIN_USER mutation with useMutation hook
  const [login, { error }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error(error);
      setShowAlert(true);
    },
    onCompleted: (data) => {
      // Use the Auth utility to log user in with the token
      Auth.login(data.login.token);
    },
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Execute the login mutation using the collected form data
      await login({
        variables: { ...userFormData },
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset form data
    setUserFormData({ loginInput: '', password: '' });
  };

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login! {error && <div>{error.message}</div>}
        </Alert>

        {/* Email or Username Field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='loginInput'>Email or Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your email or username'
            name='loginInput'
            onChange={handleInputChange}
            value={userFormData.loginInput}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>

        <Button disabled={!(userFormData.loginInput && userFormData.password)} type='submit' variant='success'>
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;