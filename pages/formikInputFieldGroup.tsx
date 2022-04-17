import React from 'react'
import ReactDOM from 'react-dom'
import { Formik, useField } from 'formik'

const CustomInputGroup: React.FC<any> = ({ label, ...props }) => {
  // useField() 的回傳值為 [formik.getFieldProps(), formik.getFieldMeta()]
  // field 主要為 onChange values 等欄位
  // meta 主要為 error 、 touch 等欄位
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}

const FormikInputFieldGroup = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        console.log('validation', values)
        const errors: { email?: String; password?: String } = {}
        if (!values.email) {
          errors.email = 'Email 沒有值'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Email 不正確'
        }
        if (!values.password) errors.password = '密碼沒有填'
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      <CustomInputGroup label={'email'} name={'email'} />
    </Formik>
  )
}

export default FormikInputFieldGroup
