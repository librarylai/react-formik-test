import type { NextPage } from 'next'
import { Formik } from 'formik'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          console.log('validation',values)
          const errors: { email?: String } = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => {
          console.log('touched', touched)

          return (
            <form onSubmit={handleSubmit}>
              <input type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
              {errors.email && touched.email && errors.email}
              <input type='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} />
              {errors.password && touched.password && errors.password}
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

export default Home
