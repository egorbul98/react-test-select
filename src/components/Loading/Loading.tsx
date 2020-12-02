import React from 'react';
import './styles.css';
const Loading = () => {
  return (
    <div className="lds-facebook loading"><div></div><div></div><div></div></div>
  );
}

export default React.memo(Loading);
