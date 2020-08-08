import React from 'react'
import { Form, FormGroup, FormCheckProps } from 'react-bootstrap'
import { Field, FieldProps, FieldAttributes } from 'formik'

// import { Container } from './styles';
interface OwnProps {
  label?: string
  formGroupProps?: FormGroup
  inputProps?: FormCheckProps
  disableValid: boolean
}

type Props = OwnProps & FieldAttributes<any>

const Check: React.FC<Props> = props => {
  return (
    <Field {...props}>
      {({
        field: { name, value, onChange },
        form: { isValid, isSubmitting },
        meta
      }: FieldProps) => (
        <Form.Group controlId={props.id} {...props.formGroupProps}>
          <Form.Check
            disabled={isSubmitting}
            {...props.inputProps}
            id={props.id || props.name}
            label={props.label}
            checked={value}
            onChange={onChange}
            isValid={!meta.error && meta.touched && !props.disableValid}
            isInvalid={!!meta.error}
          />
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </Field>
  )
}
Check.defaultProps = {
  disableValid: false
}

export default Check
