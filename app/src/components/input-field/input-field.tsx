import React from 'react';
import './input-field.css';

function InputField(props: any) {
  return (
    <div className="container" style={{marginBottom: `${props.marginBottom}`, width: `${props.width}`}}>
      <div className="title">{props.title}</div>
      <input className="field" type={props.type} placeholder={props.placeholder} style={{width: `${props.width}`}}></input>
    </div>
  );
}

export default InputField;
