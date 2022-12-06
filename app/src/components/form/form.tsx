import React from 'react';
import './form.css';
import InputField from '../input-field/input-field';
import Button from '../button/button';

function Form() {
  return (
    <form className="form">
        <InputField title="Starting Location" placeholder="Enter your starting location" type="text" width="576px" ></InputField>
        <InputField title="Destination Location" placeholder="Enter your destination" type="text" width="576px"></InputField>
        <div className="grid">
            <InputField title="Distance Constraint (m)" placeholder="ex: 10" type="number" width="256px"></InputField>
            <InputField title="Number of PoIs" placeholder="ex: 2" type="number" width="256px"></InputField>
            <InputField title="Algorithms" placeholder="ex: VSS-kDPQ" type="text" width="256px"></InputField>
            <InputField title="PoI Categories" placeholder="ex: Museum" type="text" width="256px"></InputField>
        </div>
        <Button type="submit" text="Generate Routes"></Button>
    </form>
  );
}

export default Form;
