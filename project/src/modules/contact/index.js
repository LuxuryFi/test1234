import React from 'react';
import { Form, Row, Col, Input } from 'antd';
import { MdEmail, MdLocationOn, MdPhoneInTalk } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import {
  selectSupportIsLoading,
  sendSupport,
} from '../../store/slices/supportsSlice';
import PageHeader from '../../components/PageHeader';

export default function Contact() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectSupportIsLoading);

  const handleSubmit = (values) => {
    const request = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      description: values.description,
      subject: values.subject,
    };

    dispatch(sendSupport(request));
    form.resetFields();
  };

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Navigation />
      <PageHeader title="Contact" />
      <div className="contact-container">
        <div className="container-fluid">
          <ul className="contact-list">
            <li className="contact-item">
              <div className="icon-container">
                <MdEmail className="icon" />
              </div>
              <h3 className="title">Email Here</h3>
              <a className="link" href="mailto:medcares@gmail.com">
                bookstore@gmail.com
              </a>
            </li>

            <li className="contact-item">
              <div className="icon-container">
                <MdLocationOn className="icon" />
              </div>
              <h3 className="title">Location Here</h3>
              <p className="link">Nam Tu Liem district, Ha Noi</p>
            </li>

            <li className="contact-item">
              <div className="icon-container">
                <MdPhoneInTalk className="icon" />
              </div>
              <h3 className="title">Call Here</h3>
              <a className="link" href="tel:+123456123">
                +123(456)123
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-container">
        <div className="container-fluid">
          <div className="form-title">
            <h2>Contact Us</h2>
            <h3>Drop us Message for any Query</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="form-content">
            <Form
              form={form}
              className="bookAppointmentForm"
              onFinish={handleSubmit}
              scrollToFirstError
              name="contactForm"
            >
              <Row>
                <Col className="left" sm={24} md={24} lg={12} xl={12} xxl={12}>
                  {/* Name */}
                  <Form.Item
                    name="name"
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your name!',
                      },
                    ]}
                  >
                    <Input className="input" placeholder="Name" />
                  </Form.Item>

                  {/* Phone */}
                  <Form.Item
                    name="phone"
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your phone!',
                      },
                    ]}
                  >
                    <Input className="input" placeholder="Phone" />
                  </Form.Item>
                </Col>
                <Col className="right" sm={24} md={24} lg={12} xl={12} xxl={12}>
                  {/* Subject */}
                  <Form.Item
                    name="subject"
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your subject!',
                      },
                    ]}
                  >
                    <Input className="input" placeholder="Subject" />
                  </Form.Item>

                  {/* Email */}
                  <Form.Item
                    className="form-input-group"
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ]}
                  >
                    <Input className="input" placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Description */}
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please type your description!',
                  },
                ]}
                className="form-input-group"
              >
                <Input.TextArea
                  placeholder="Your description"
                  showCount
                  rows={8}
                  maxLength={1000}
                />
              </Form.Item>

              <Form.Item>
                <Button className="button button--blue--dark" type="submit">
                  {isLoading ? <Spinner /> : 'Send Message'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
