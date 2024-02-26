import { Row, Col, Form, Input, DatePicker, Radio } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { isLogin } from '../../helpers/isLogin';

export default function PatientInformation({ form }) {
  useEffect(() => {
    if (isLogin()) {
      const currentPatient = JSON.parse(localStorage.getItem('currentPatient'));
      form.setFieldsValue({
        email: currentPatient.email,
        name: currentPatient.full_name,
        phone: currentPatient.phone,
        gender:
          currentPatient.gender.charAt(0).toUpperCase() +
          currentPatient.gender.slice(1),
        date_of_birth: moment(currentPatient.date_of_birth),
      });
    }
  }, [form]);

  return (
    <div className="information__container">
      <Row>
        <Col className="left" md={12} lg={12} xl={11} xxl={11}>
          {/* Name */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
            className="form-input-group"
          >
            <Input className="input" placeholder="Full name" />
          </Form.Item>

          {/* Date of birth and Gender */}
          <div className="container-wrap">
            <Form.Item
              name="date_of_birth"
              className="form-input-group date"
              rules={[
                {
                  required: true,
                  message: 'Please enter your date of birth!',
                },
              ]}
            >
              <DatePicker
                className="input"
                allowClear={false}
                format="DD-MM-YYYY"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              className="form-input-group gender"
              rules={[
                {
                  required: true,
                  message: 'Please select your gender!',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Female">Female</Radio>
                <Radio value="Male">Male</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Phone */}
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please enter your phone',
              },
            ]}
            className="form-input-group"
          >
            <Input className="input" placeholder="Phone" />
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
            <Input className="input" placeholder="Email!" />
          </Form.Item>
        </Col>
        <Col className="right" md={12} lg={12} xl={13} xxl={13}>
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
              placeholder="Detailed description your symptoms or your needs"
              showCount
              rows={12}
              maxLength={1000}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
