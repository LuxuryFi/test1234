import React from 'react';

export default function PageHeader({ title }) {
  return (
    <div className="title-page mg-header">
      <div className="overlay">
        <h2 className="title">{title}</h2>
      </div>
    </div>
  );
}
