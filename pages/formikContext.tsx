import type { NextPage } from 'next'
import { useFormik, Form, ErrorMessage, FormikConfig } from 'formik'
import styles from '../styles/Home.module.css'
import React, { useContext } from 'react'
/* 
    自己實作 Formik Component 並透過 React Context
    傳遞給所有的『子組件』讓 child component 透過 context 
    與整個表單連結。
*/

// Create empty context
const FormikContext = React.createContext<any>({})
// 簡單實作 Formik Component
export const CustomFormik: React.FC<any> = ({ children, ...props }) => {
  const formikStateContext = useFormik(props)
  return <FormikContext.Provider value={formikStateContext}>{children}</FormikContext.Provider>
}
/* 簡單實作 Field Component（用 input 來舉例） */
const CustomField: React.FC<any> = (props) => {
  const formikState = useContext(FormikContext)
  return <input {...props} {...formikState.getFieldProps(props)} />
}
const FormikContextPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomFormik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
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
        <CustomField autoComplete='off' type='email' name='email' />
      </CustomFormik>
    </div>
  )
}

export default FormikContextPage
