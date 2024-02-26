import React, { useCallback, useState } from 'react';
import { Form, Steps } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Button from '../../components/Button';
import AppointmentDetailsForm from '../../components/AppointmentDetailsForm';
import PatientInformation from '../../components/PatientInformation';
import AppointmentInformation from '../../components/AppointmentInformation';
import {
  bookAppointment,
  selectAppointmentIsLoading,
} from '../../store/slices/appointmentsSlice';
import Spinner from '../../components/Spinner';

const { Step } = Steps;

export default function ClientBookAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [date, setDate] = useState(moment().format('DD/MM'));
  const [time, setTime] = useState();
  const [newAppointment, setNewAppointment] = useState({
    customer: '',
    doctor: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    description: '',
    date: '',
    time: '',
    clinic: '',
  });
  const isLoading = useSelector(selectAppointmentIsLoading);

  const handleOnClickDate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  const handleOnclickTime = useCallback((newTime) => {
    setTime(newTime);
  }, []);

  const steps = [
    {
      title: 'Appointment Detail',
      content: (
        <AppointmentDetailsForm
          form={form}
          date={date}
          onClickDate={handleOnClickDate}
          time={time}
          onClickTime={handleOnclickTime}
        />
      ),
    },
    {
      title: `Patient's Information`,
      content: <PatientInformation form={form} />,
    },
    {
      title: 'Confirm Information',
      content: <AppointmentInformation info={newAppointment} />,
    },
    {
      title: 'Finished',
      content: 'Finished',
    },
  ];

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const previous = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleOnClick = (action) => {
    // Check action to next or back
    if (action === 'next') {
      // Appointment Detail Check
      if (
        current === 0 &&
        (time,
        form.getFieldValue('clinic'),
        form.getFieldValue('category'),
        form.getFieldValue('doctor'))
      ) {
        next();
      }
      // Patient's Information Check
      else if (current === 1) {
        // Set appointment information
        const values = form.getFieldsValue();
        let newAppointment = {
          name: values.name,
          doctor_id: form.getFieldValue('doctor'),
          category_id: form.getFieldValue('category'),
          gender: values.gender,
          phone: values.phone,
          description: values.description,
          date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
          email: form.getFieldValue('email'),
          time: time,
          is_foreigner: !form.getFieldValue('foreigner') ? true : false,
          clinic_id: form.getFieldValue('clinic'), // In somehow that form.getFieldsValue() lost track of clinic, doctor and category
        };
        newAppointment.date = moment(
          `${date}-${moment().year()}`,
          'DD-MM-YYYY'
        ).format('YYYY-MM-DD');
        setNewAppointment(newAppointment);
        const errorsObj = form.getFieldsError();
        // Some bugs make step can be nexted whenever form date is filled
        if (
          errorsObj[0].errors.length === 0 &&
          errorsObj[1].errors.length === 0 &&
          errorsObj[2].errors.length === 0 &&
          errorsObj[3].errors.length === 0 &&
          errorsObj[4].errors.length === 0 &&
          errorsObj[5].errors.length === 0
        ) {
          next();
        }
      } else if (current === 2) {
        // Send appointment
        dispatch(
          bookAppointment({
            newAppointment: newAppointment,
            nextStep: () => next(),
          })
        );
      } else if (current === steps.length - 1) {
        // Final step to back homepage
        navigate('/', { replace: true });
      }
    } else if (action === 'previous') {
      previous();
    }
  };

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Navigation activeBg={true} />
      <div className="title-page mg-header">
        <div className="overlay">
          <h2 className="title">Appointment</h2>
        </div>
      </div>
      <div className="client-book-appointment-container">
        <div className="form-appointment-container">
          <div className="container-fluid">
            <div className="wrap">
              <Form
                className="bookAppointmentForm"
                form={form}
                name="appointment"
                scrollToFirstError
              >
                <div className="content">
                  {/* Steps header */}
                  <div className="steps-header">
                    <Steps current={current}>
                      {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                      ))}
                    </Steps>
                  </div>

                  {/* Steps content */}
                  <div className="steps-content">{steps[current].content}</div>

                  {/* Steps buttons */}
                  <div className="steps-button">
                    {current > 0 && current !== steps.length - 1 && (
                      <Button
                        onClick={() => handleOnClick('previous')}
                        type="button"
                        className="button button--light"
                      >
                        Previous
                      </Button>
                    )}

                    {current < steps.length - 2 && (
                      <Button
                        onClick={() => handleOnClick('next')}
                        type="submit"
                        className="button button--blue--dark"
                      >
                        Next
                      </Button>
                    )}

                    {current === steps.length - 2 && (
                      <Button
                        type="sumit"
                        onClick={() => handleOnClick('next')}
                        className="button button--blue--dark"
                      >
                        {isLoading ? <Spinner /> : 'Submit'}
                      </Button>
                    )}

                    {current === steps.length - 1 && (
                      <Button
                        type="submit"
                        onClick={() => handleOnClick('next')}
                        className="button button--blue--dark submit"
                      >
                        Click to return home page
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
