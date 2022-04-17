import type { NextPage } from 'next'
import { useFormik } from 'formik'
import styles from '../styles/Home.module.css'
/* 
    使用 useFormik
    本頁面用來測試 formik.getFieldProps ， 
    透過直接使用 getFieldProps 來減少一些冗長的程式碼設定 
*/
const FormikGetFieldPropsPage: NextPage = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate: (values) => {
      console.log('validation', values)
      const errors: { email?: String; password?: String } = {}
      if (!values.email) {
        errors.email = 'Email 沒有值'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email 不正確'
      }
      if (!values.password) errors.password = '密碼沒有填'
      return errors
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 400)
    },
  })
  const { handleSubmit , errors } = formik
  console.log('formik.getFieldProps()',formik.getFieldProps('email'))
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px' }}>
          <label>Email：</label>
          <input autoComplete='off' type='email' {...formik.getFieldProps('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div style={{ margin: '20px' }}>
          <label>Password：</label>
          <input autoComplete='off' type='password'  {...formik.getFieldProps('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div style={{ margin: '20px' }}>
          <button type='submit' >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormikGetFieldPropsPage
