import styled from 'styled-components'
import {
  Container as BootContainer,
  FormControl as BootFormControl,
  Form
} from 'react-bootstrap'

export const Container = styled.div`
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
  text-align: center;
`
export const FormSignIn = styled(Form)`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
`
export const FormControl = styled(BootFormControl)`
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
  &:focus {
    z-index: 2;
  }
  input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`
