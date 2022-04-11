import type { NextPage } from 'next'
import { Formik } from 'formik'
import styles from '../styles/Home.module.css'
/* 
    本頁面用來測試 當設定 Validate 且設定 handleBlur 時，
    測試當一觸發 onChange 時就會等到 onBlur 才顯示該欄位的錯誤訊息
*/
const FormikValidationTouchedPage: NextPage = () => {
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
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
            console.log('touched：',touched)
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ margin: '20px' }}>
                <label>Email：</label>
                <input autoComplete='off' type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
                {/* 注意這邊加上了 touched.email */}
                {errors.email && touched?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div style={{ margin: '20px' }}>
                <label>Password：</label>
                <input
                  autoComplete='off'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {/* 注意這邊加上了 touched.password */}
                {errors.password && touched?.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
              <div style={{ margin: '20px' }}>
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormikValidationTouchedPage
