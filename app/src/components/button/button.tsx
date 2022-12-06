import React from 'react';
import './button.css';

function Button(props: any) {
  return (
    <button className="button" type={props.type}>{props.text}</button>
  );
}

export default Button;
