

import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import Spinner from '../components/Spinner';
import axios from 'axios';
import styled from 'styled-components';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const submitHandler = async (values) => {
    setLoading(true);
    if (handleValidation(values)) {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, values);
        setLoading(false);
        if (data.status === false) {
          message.error(data.message);
        }
        if (data.status === true) {
          message.success('Successfully registered');
          navigate('/login');
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        message.error('Unknown error occurred, please try again');
      }
    }
  };

  const handleValidation = (values) => {
    const { password, confirmPassword, email, username } = values;
    if (!username || username.length < 3) {
      setLoading(false);
      message.error('Username must be at least 3 characters long.');
      return false;
    } else if (!email) {
      setLoading(false);
      message.error('Email is required.');
      return false;
    } else if (!password || password.length < 8) {
      setLoading(false);
      message.error('Password must be at least 8 characters long.');
      return false;
    } else if (password !== confirmPassword) {
      setLoading(false);
      message.error('Password and confirm password must match.');
      return false;
    }
    return true;
  };

  return (
    <Container>
      <div className="auth-page register">
        {loading && <Spinner />}
        <div className="auth-background">
          {/* <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/accounting-4701693-3914332.png"
            height="300"
            width="300"
            alt="register visual"
          /> */}
          <h2 className="auth-brand shiny-text">BUDGET BOOK</h2>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title alt">Register</h1>
          </div>
          <Form layout="vertical" onFinish={submitHandler} className="auth-form">
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input type="password" />
            </Form.Item>
            <button className="auth-submit">Register</button>
            <p className="auth-switch">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </Form>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(to bottom,rgb(16, 12, 16),rgb(18, 4, 18));
    color: #fff;
    padding: 80px 20px 60px;
    position: relative;
    overflow: hidden;
  }

  .auth-background {
    text-align: center;
    margin-bottom: 30px;
  }

  .auth-brand {
    color: #00d1ff;
    margin-top: 10px;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .auth-form-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 40px;
    max-width: 400px;
    width: 100%;
    backdrop-filter: blur(12px);
    box-shadow: 0 0 15px rgba(0, 209, 255, 0.15);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .auth-title.alt {
    background: linear-gradient(90deg, #ffffff, #00d1ff, #ffffff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s linear infinite;
    font-size: 2rem;
  }

  .auth-form .ant-form-item-label > label {
    color: #ccc;
  }

  .auth-form input {
    background: #1f1f1f;
    border: 1px solid #333;
    color: #fff;
    border-radius: 8px;
  }

  .auth-submit {
    background-color: #00d1ff;
    color: #000;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .auth-submit:hover {
    background-color: #00bfe0;
  }

  .auth-switch {
    margin-top: 15px;
    color: #aaa;
    text-align: center;
  }

  .auth-switch a {
    color: #00d1ff;
    font-weight: bold;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

export default Register;
