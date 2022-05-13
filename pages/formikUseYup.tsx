import type { NextPage } from 'next'
import { useFormik } from 'formik'
import styles from '../styles/Home.module.css'
import * as Yup from 'yup'
/* 
    使用 Yup 做驗證
*/
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email 沒有值').email('Email 格式不對'),
  password: Yup.string()
    .required('密碼沒有填') // 必填項目
    .matches(/^([A-Z])/, '第一個字必須英文大寫') // 開頭大寫
    .min(8, '至少要填寫 8 碼 min: ${min}') // 最少 8
    .max(10, '最多只能填寫 10 碼 max: ${max}') // 最多 10
    .matches(/([0-9])$/, '結尾必須是數字') // 結尾必須是數字
    .test('noAdmin', '不可包含 admin 字眼 ${path}', (value) => {
      // 不可包含 admin 字眼
      return !value?.includes('admin')
    }),

  /* 版本1：使用 when 與 oneOf */
  //   confirmPassword: Yup.string().when('password', (password, schema) => {
  //     return password ? schema
  //                 .oneOf([password], '需與密碼相同， 當下 confirmPassword 輸入值 ${value} 。 oneOfArray 值 ${resolved}')
  //                 .required('密碼必填') : schema
  //   }),

  /*版本2：使用 ref 與 oneOf */
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], '需與密碼相同， 當下 confirmPassword 輸入值 ${value} 。 oneOfArray 值 ${resolved}')
    .required('密碼必填'),
})
const FormikGetFieldPropsPage: NextPage = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    // 重點在此 validationSchema
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 400)
    },
  })
  const { handleSubmit, errors, touched } = formik
  console.log('errors', errors)
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px' }}>
          <label>Email：</label>
          <input autoComplete='off' type='email' {...formik.getFieldProps('email')} />
          {errors.email && touched?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div style={{ margin: '20px' }}>
          <label>Password：</label>
          <input autoComplete='off' type='text' {...formik.getFieldProps('password')} />
          {errors.password && touched?.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div style={{ margin: '20px' }}>
          <label>Confirm Password：</label>
          <input autoComplete='off' type='text' {...formik.getFieldProps('confirmPassword')} />
          {errors.confirmPassword && touched?.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <div style={{ margin: '20px' }}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default FormikGetFieldPropsPage
