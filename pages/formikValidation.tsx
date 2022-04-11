import type { NextPage } from 'next'
import { Formik } from 'formik'
import styles from '../styles/Home.module.css'
/* 
    本頁面用來測試 當只有設定 Validate 沒有設定 handleBlur 時，
    測試當一觸發 onChange 時就顯示錯誤訊息 
*/
const FormikValidationPage: NextPage = () => {
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
        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email：</label>
                <input autoComplete='off' type='email' name='email' onChange={handleChange} value={values.email} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div>
                <label>Password：</label>
                <input autoComplete='off' type='password' name='password' onChange={handleChange} value={values.password} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormikValidationPage
