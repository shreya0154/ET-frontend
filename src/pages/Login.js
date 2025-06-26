// import React, {useState, useEffect} from 'react'
// import { Form, Input , message} from 'antd'
// import styled from "styled-components"
// import { Link , useNavigate} from 'react-router-dom'
// import axios from 'axios';
// import Spinner from '../components/Spinner'
// import Footer from '../components/layouts/Footer';
// const Login = () => {
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(()=>{
//         if(localStorage.getItem('user')){
//           navigate("/");
//         }
//       }, [navigate]);
      
//     const submitHandler = async (values)=>{
//         console.log("login submitted")
//         setLoading(true);
//         if(handleValidation(values)){
//             // const {email, password} = values;

//             // call api 
//             console.log("validated")

//             try{
//                 const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
//                 console.log("response from server")
//                 setLoading(false);
//                 if(data.status === false){
//                     console.log("from false")
//                     // toast.error(data.message, toastOptions)
//                     message.error(data.message)
//                 }
//                 if(data.status === true){
//                     console.log("from true")
//                     message.success('Successfully logged in')
//                     localStorage.setItem("user", JSON.stringify(data.user))
//                     navigate("/")
//                 }
//             }
//             catch(err){
//                 setLoading(false);
//                 console.log(err);
//                 message.error('unknown error occurred, Please try again')
//             }
//         }
//     }
//     // const toastOptions  = {
//     //     position: "top-right",
//     //     autoClose: 4000,
//     //     pauseOnHover : true,
//     //     draggable: true,
//     //     theme: "light"
//     // }

//     const handleValidation = (values)=>{
//         const {password,email} = values;
//         if(password === undefined || email === undefined){
//             setLoading(false);
//             message.error("Email and password are required.");
//             console.log("false");
//             return false;
//         }
       
//         console.log("true");

//         return true;
//     }


    
//     return (
//         <Container>
//         <div className='login-page'>
//         {loading && <Spinner/>}
//         <div className="background-pic">
//           {/* <img src=".../assets/background@MoneyManager.jpg" alt="picture" /> */}
//           <img src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-6264415-5167525.png?f=webp" height="300" width="300" alt="picture"></img>
//           <h2 className='WebsiteName mt-5 ms-5'>BUDGET-BOOK</h2>
//         </div>

//         <div className="form-login">
//               <div className='loginHeader'>
//               <h1>Login</h1>
//               </div>
//               {/* <Form.Item label="Username" name = "username">
//                 <Input />
//               </Form.Item> */}
//               <Form layout="vertical" onFinish={submitHandler}>
//               <div className="items">
//               <Form.Item label="Email" name = "email">
//                 <Input type='email'/>
//               </Form.Item>
//               <Form.Item label="Password" name = "password">
//                 <Input type='password'/>
//               </Form.Item>
//               </div>
//               <button className='btn btn-primary'>Login</button>
//               {/* <div className='d-flex justify-content-between'> */}
//                 <span> Don't Have an Account ? <Link to="/register">Register</Link></span>
//               {/* </div> */}
//             </Form>
//             </div>
//         </div>
//         <Footer/>
//         </Container>
//   )
// }


// const Container = styled.div`
// .login-page{

// // background-color: 
// }
// `;

// export default Login






















import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/layouts/Footer';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const submitHandler = async (values) => {
    setLoading(true);
    if (handleValidation(values)) {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
        setLoading(false);
        if (data.status === false) {
          message.error(data.message);
        }
        if (data.status === true) {
          message.success('Successfully logged in');
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        message.error('Unknown error occurred, please try again');
      }
    }
  };

  const handleValidation = (values) => {
    const { password, email } = values;
    if (!email || !password) {
      setLoading(false);
      message.error('Email and password are required.');
      return false;
    }
    return true;
  };

  return (
    <Container>
      <div className="auth-page">
        {loading && (<div className='pb-4'><Spinner /></div>)}
        <div className="auth-background">
          {/* <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-6264415-5167525.png?f=webp"
            height="300"
            width="300"
            alt="finance graphic"
          /> */}
          <h2 className="auth-brand shiny-text">BUDGET BOOK</h2>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">Login</h1>
          </div>
          <Form layout="vertical" onFinish={submitHandler} className="auth-form">
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <button className="auth-submit">Login</button>
            <p className="auth-switch">
              Don't have an account? <Link to="/register">Register</Link>
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
    background: linear-gradient(to bottom, #0f0f0f, #111111);
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
    color: #00f0ff;
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
    backdrop-filter: blur(10px);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .auth-title {
    background: linear-gradient(90deg, #ffffff, #00f0ff, #ffffff);
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
    background: #1a1a1a;
    border: 1px solid #333;
    color: #fff;
    border-radius: 8px;
  }

  .auth-submit {
    background-color: #00f0ff;
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
    background-color: #00cfe0;
  }

  .auth-switch {
    margin-top: 15px;
    color: #aaa;
    text-align: center;
  }

  .auth-switch a {
    color: #00f0ff;
    font-weight: bold;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

export default Login;


