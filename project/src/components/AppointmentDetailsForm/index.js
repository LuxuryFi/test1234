import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, DatePicker, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusLg } from 'react-icons/bs';
import moment from 'moment';

import { TIME_WORKING } from '../../constants';
import {
  fetchCategoriesByClinic,
  fetchClinics,
  fetchDoctorsClinic,
  selectCategoriesByClinic,
  selectDoctorByClinic,
} from '../../store/slices/clinicsSlice';
import { selectClinics } from '../../store/slices/clinicsSlice';

const { Option } = Select;

export default function AppointmentDetailsForm({
  time,
  onClickDate,
  onClickTime,
}) {
  const dispatch = useDispatch();
  const clinics = useSelector(selectClinics);
  const categories = useSelector(selectCategoriesByClinic);
  const doctors = useSelector(selectDoctorByClinic);
  const [dayButtons, setDayButtons] = useState([
    {
      buttonID: 0,
      dayText: 'Today',
      dayNum: moment().add(0, 'days').format('DD-MM'),
      isActived: true,
    },
    {
      buttonID: 1,
      dayText: 'Tomorrow',
      dayNum: moment().add(1, 'days').format('DD-MM'),
      isActived: false,
    },
    {
      buttonID: 2,
      dayText: 'Overmorrow',
      dayNum: moment().add(2, 'days').format('DD-MM'),
      isActived: false,
    },
    {
      buttonID: 3,
      dayText: 'Other day ',
      dayNum: <BsPlusLg className="icon" />,
      isActived: false,
    },
  ]);
  const [timeButtons, setTimeButtons] = useState(
    TIME_WORKING.map((time, index) => ({
      buttonID: index,
      time,
      isActived: false,
    }))
  );

  const [toggleDatePicker, setToggleDatePicker] = useState(false);

  useEffect(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const handleClickDate = (index) => {
    // Toggle datepicker when click
    if (
      !toggleDatePicker &&
      index === dayButtons.length - 1 &&
      !dayButtons[index].isActived
    ) {
      setToggleDatePicker(true);
    } else if (
      toggleDatePicker &&
      index === dayButtons.length - 1 &&
      dayButtons[index].isActived
    ) {
      setToggleDatePicker(false);
    } else if (
      !toggleDatePicker &&
      index === dayButtons.length - 1 &&
      dayButtons[index].isActived
    ) {
      setToggleDatePicker(true);
    } else {
      onClickDate(dayButtons[index].dayText);
    }

    // Update status active button
    const cloneDayButtons = dayButtons.map((button) => {
      if (button.buttonID === index) {
        button.isActived = true;
        if (index < dayButtons.length - 1) {
          onClickDate(button.dayNum);
        }
      } else {
        button.isActived = false;
        if (index < dayButtons.length - 1) {
          setToggleDatePicker(false);
        }
      }
      return button;
    });
    setDayButtons(cloneDayButtons);
  };

  const handleClickTime = (item) => {
    const cloneTimeButtons = timeButtons.map((button) => {
      if (button.buttonID === item.buttonID) {
        button.isActived = true;
        onClickTime(item.time);
      } else {
        button.isActived = false;
      }
      return button;
    });
    setTimeButtons(cloneTimeButtons);
  };

  return (
    <section className="appointment-detail">
      <Row>
        <Col className="left" md={12} lg={12} xl={12} xxl={12}>
          {/* Clinic */}
          <Form.Item
            className="form-input-group"
            name="clinic"
            rules={[
              {
                required: true,
                message: 'Please select clinic you want!',
              },
            ]}
          >
            <Select
              onChange={(value) => {
                dispatch(fetchCategoriesByClinic(value));
                dispatch(fetchDoctorsClinic(value));
              }}
              placeholder="Preferred healthcare clinic"
            >
              {clinics.map((clinic, index) => (
                <Option value={clinic.clinic_id} key={index}>
                  {clinic.clinic_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: 'Please select category you want!',
              },
            ]}
            className="form-input-group"
          >
            <Select
              placeholder="Preferred category"
              disabled={categories.length > 0 ? false : true}
            >
              {categories.map((category, index) => (
                <Option value={category.category_id} key={index}>
                  {category.category.category_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Doctors */}
          <Form.Item
            name="doctor"
            rules={[
              {
                required: true,
                message: 'Please select doctor you want!',
              },
            ]}
            className="form-input-group"
          >
            <Select
              disabled={doctors.length > 0 ? false : true}
              placeholder="Preferred doctors"
            >
              {doctors.map((doctor, index) => (
                <Option value={doctor.doctor_id} key={index}>
                  {doctor.doctor.full_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="foreigner" valuePropName="checked">
            <Checkbox>Book for a foreigner</Checkbox>
          </Form.Item>
        </Col>
        <Col className="right" md={12} lg={12} xl={12} xxl={12}>
          {/* Date */}
          <h3 className="title">Appointment</h3>
          <h4 className="label">Appointment date (*)</h4>
          <div className="appointment-date-container">
            {dayButtons.map((item, index) => (
              <div
                onClick={() => handleClickDate(index)}
                key={index}
                className={`date-item ${item.isActived ? 'active' : ''}`}
              >
                <h3 className="day-num">{item.dayNum}</h3>
                <h4 className="day-text">{item.dayText}</h4>
              </div>
            ))}
            <DatePicker
              open={toggleDatePicker}
              onChange={(e) => {
                const cloneDayButtons = [...dayButtons];
                cloneDayButtons[cloneDayButtons.length - 1].dayNum =
                  e.format('DD-MM');
                onClickDate(e.format('DD-MM'));
                setDayButtons(cloneDayButtons);
                setToggleDatePicker(true);
              }}
              disabledDate={(current) => {
                // Disable all Sunday, today and days before today
                return (
                  current.day() === 0 ||
                  // (current && current < moment().endOf('day'))
                  current < moment().startOf('day')
                );
              }}
              allowClear={false}
              format="DD/MM"
              className="date-picker"
            />
          </div>

          {/* Time */}
          <h4 className="label">Appointment time (*)</h4>
          <div className="appointment-time-container">
            {timeButtons.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClickTime(item)}
                className={`time-item ${item.isActived ? 'active' : ''}`}
                disabled={true}
              >
                <h4 className="day-text">{item.time}</h4>
              </div>
            ))}
          </div>
          {!time && (
            <p className="error-required-time">This field is required</p>
          )}
        </Col>
      </Row>
    </section>
  );
}
