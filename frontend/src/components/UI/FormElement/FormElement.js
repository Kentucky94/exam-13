import React from 'react';
import {Col, FormGroup, Input, Label} from "reactstrap";
import PropTypes from 'prop-types';

const FormElement = props => {
  let inputData = (
    <Input
      type={props.type}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
    />
  );

  if(props.type === 'file'){
    inputData = (
      <Input
        type={props.type}
        name={props.propertyName} id={props.propertyName}
        onChange={props.onChange}
      />
    );
  }

  if(props.type === 'checkbox'){
    inputData = (
      <Input
        addon
        type="checkbox"
        name={props.propertyName}
        id={props.propertyName}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
      />
    )
  }

  return (
    <FormGroup row>
      <Label sm={2} for={props.propertyName}>{props.title}</Label>
      <Col sm={10}>
        {inputData}
      </Col>
    </FormGroup>
  );
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onChange: PropTypes.func.isRequired,
};

export default FormElement;