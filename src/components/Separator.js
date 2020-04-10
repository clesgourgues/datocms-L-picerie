import React from 'react';

const Separator = ({ vertical = false }) => {
  return <div className={`separator ${vertical && 'separator-vertical'}`} />;
};

export default Separator;
