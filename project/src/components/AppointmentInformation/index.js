import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategoriesByClinic,
  selectClinics,
  selectDoctorByClinic,
} from '../../store/slices/clinicsSlice';

export default function AppointmentInformation({ info }) {
  const doctors = useSelector(selectDoctorByClinic);
  const clinics = useSelector(selectClinics);
  const categories = useSelector(selectCategoriesByClinic);

  return (
    <div className="appointment-information-container">
      {/* Service */}
      <div className="booking-service">
        <h3 className="title">Service</h3>
        <p className="info">
          <span className="left">Type</span>
          <span className="right">Bookstore</span>
        </p>
      </div>

      {/* Customer */}
      <div className="booking-service">
        <h3 className="title">Customer</h3>
        <p className="info">
          <span className="left">Customer</span>
          <span className="right">{info.name}</span>
        </p>
        <p className="info">
          <span className="left">Date of birth</span>
          <span className="right">
            {moment(info.date_of_birth).format('DD/MM/YYYY')}
          </span>
        </p>
        <p className="info">
          <span className="left">Gender</span>
          <span className="right">{info.gender}</span>
        </p>
        <p className="info">
          <span className="left">Phone number</span>
          <span className="right">{info.phone}</span>
        </p>
        <p className="info">
          <span className="left">Description</span>
          <span className="right">{info.description}</span>
        </p>
      </div>

      {/* Doctor */}
      <div className="booking-doctor">
        <h3 className="title">Doctor</h3>
        <p className="info">
          <span className="left">Doctor</span>
          <span className="right">
            Dr.{'  '}
            {
              doctors.find((doctor) => doctor.doctor_id === info.doctor_id)
                .doctor.full_name
            }
          </span>
        </p>
        <p className="info">
          <span className="left">Category</span>
          <span className="right">
            {
              categories.find(
                (category) => category.category_id === info.category_id
              ).category.category_name
            }
          </span>
        </p>
        <p className="info">
          <span className="left">Appointment</span>
          <span className="right">
            {info.date} - {info.time}
          </span>
        </p>
        <p className="info">
          <span className="left">Location</span>
          <span className="right">
            {
              clinics.find((clinic) => clinic.clinic_id === info.clinic_id)
                .clinic_name
            }
          </span>
        </p>
        <p className="info">
          <span className="left">Promotion</span>
          <span className="right">
            Cheapest Book
          </span>
        </p>
      </div>
    </div>
  );
}
