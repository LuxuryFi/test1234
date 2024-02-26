import React from 'react';

import { Animate } from '../AnimateIn';
import partnerImg1 from '../../assets/img/partner1.jpeg';
import partnerImg2 from '../../assets/img/partner2.jpeg';
import partnerImg3 from '../../assets/img/partner3.jpeg';
import partnerImg4 from '../../assets/img/partner4.jpeg';
import partnerImg5 from '../../assets/img/partner5.jpeg';
import partnerImg6 from '../../assets/img/partner6.jpeg';
import partnerImg7 from '../../assets/img/partner7.jpeg';
import partnerImg8 from '../../assets/img/partner8.jpeg';

export default function Partner() {
  return (
    <div className="partner-container">
      <Animate.ScaleInCenter>
        <div className="section-title">
          <h4 className="heading">Partners</h4>
          <h3 className="title">Featured Customer & Partners</h3>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse
          </p>
        </div>
      </Animate.ScaleInCenter>
      <div className="partner-content">
        <div className="container-fluid">
          <ul className="partner-list">

          </ul>
        </div>
      </div>
    </div>
  );
}
