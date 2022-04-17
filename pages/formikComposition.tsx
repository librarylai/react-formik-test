import type { NextPage } from 'next'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from '../styles/Home.module.css'
/* 
    使用 Formik 套件提供的一系列 component 組合
    <Formik> <Form> <Field> <ErrorMessage>
*/
const FormikCompositionPage: NextPage = () => {
  return (
    <div className={styles.container}>
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
        <Form>
          <div style={{ margin: '20px' }}>
            <label>Email：</label>
            <Field autoComplete='off' type='email' name='email' o />
            <ErrorMessage name='email'>{(errMsg) => <span style={{ color: 'red' }}>{errMsg}</span>}</ErrorMessage>
          </div>
          <div style={{ margin: '20px' }}>
            <label>Password：</label>
            <Field autoComplete='off' type='password' name='password' />
            <ErrorMessage name='password'>{(errMsg) => <span style={{ color: 'red' }}>{errMsg}</span>}</ErrorMessage>
          </div>
          <div style={{ margin: '20px' }}>
            <button type='submit'>Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default FormikCompositionPage
