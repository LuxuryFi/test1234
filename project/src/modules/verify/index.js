import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  resendCode,
  selectUserIsLoading,
  verify,
} from '../../store/slices/usersSlice';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

export default function VerifyForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    const currentPatient = JSON.parse(localStorage.getItem('currentPatient'));
    if (currentPatient.is_verified) {
      navigate(-1);
    }
  }, [navigate]);

  const handleSubmit = (values) => {
    const codeVerify = {
      verify_number: values.pin,
    };
    dispatch(verify(codeVerify));
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="verify-container mg-header">
        <div className="container-fluid">
          <div className="verify-content">
            <h3 className="title">
              Thank you for registering with{' '}
              <Link to="/" className="app-name">
                Bookstore!
              </Link>
            </h3>
            <p className="description">
              Congratulations on registering with Bookstore. If you have not received
              this email, please contact us via Live Chat or at{' '}
              <a href="mailto:medcaresupport@gmail.com">
                bookstoresupport@gmail.com
              </a>
              .
            </p>
            <Form
              form={form}
              className="verifyForm"
              name="verifyForm"
              scrollToFirstError
              onFinish={handleSubmit}
            >
              <Form.Item className="form-input-group" name="pin">
                <Input className="input" placeholder="Enter your PIN"></Input>
              </Form.Item>

              <div className="form-verify-button">
                <Button
                  type="button"
                  className="button button--light square"
                  onClick={() => navigate(-1)}
                >
                  Skip
                </Button>
                <Button
                  type="button"
                  className="button button--blue--dark square"
                  onClick={() => dispatch(resendCode())}
                >
                  {isLoading ? <Spinner /> : 'Re-send email'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
