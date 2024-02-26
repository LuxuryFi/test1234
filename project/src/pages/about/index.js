import React from 'react';

import Navigation from '../../components/Navigation';
import PageHeader from '../../components/PageHeader';
import Header from '../../components/Header';
import AboutUs from '../../components/AboutUs';
import Doctor from '../../components/Doctor';
import Appointment from '../../components/Appointment';
import Footer from '../../components/Footer';
import Partner from '../../components/Partner';

export default function AboutPage() {
  return (
    <>
      <Header />
      <Navigation />
      <PageHeader title="About" />
      <div className="aboutpage-container mg-header">
        <AboutUs />
        <Doctor />
        <Appointment />
        <Partner />
      </div>
      <Footer />
    </>
  );
}
