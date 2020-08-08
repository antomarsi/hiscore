import React from 'react'
import { Form, FormGroup, FormControlProps } from 'react-bootstrap'
import { Field, FieldProps, FieldAttributes } from 'formik'

// import { Container } from './styles';
interface OwnProps {
  label?: string
  formGroupProps?: FormGroup
  inputProps?: FormControlProps
  disableValid: boolean
}

type Props = OwnProps & FieldAttributes<any>

const Input: React.FC<Props> = props => {
  return (
    <Field {...props}>
      {({
        field: { name, value, onChange },
        form: { isValid, isSubmitting },
        meta
      }: FieldProps) => (
        <Form.Group controlId={props.id} {...props.formGroupProps}>
          {props.label && <Form.Label>{props.label}</Form.Label>}
          <Form.Control
            disabled={isSubmitting}
            {...props.inputProps}
            name={name}
            value={value}
            onChange={onChange}
            isValid={!meta.error && meta.touched && !props.disableValid}
            isInvalid={!!meta.error}
          >
            {props.children}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </Field>
  )
}
Input.defaultProps = {
  disableValid: false
}

export default Input
