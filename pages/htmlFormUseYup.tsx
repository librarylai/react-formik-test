import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

const HtmlFormUseYup: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMessages, setErrMessage] = useState({});
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
        return !value?.includes('admin');
      }),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password')],
        '需與密碼相同， 當下 confirmPassword 輸入值 ${value} 。 oneOfArray 值 ${resolved}'
      )
      .required('密碼必填'),
  });

  /* 客製化驗證流程 */
  const customValidation = async () => {
    let isPass = false;
    validationSchema
      .validate(
        {
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      )
      .then((value) => {
        console.log('value', value);
        if (value) isPass = true;
      })
      .catch((err: ValidationError) => {
        console.log({ err });
        const { inner } = err;
        const errObject = {};
        inner.forEach((item) => {
          // 如果 path 或 message 為 undefined 的話，直接 return
          if (!item.path || !item.message) return;
          // 因為有可能一個欄位會有多個驗證錯誤，因此這邊是設計把全部記在一個 array 裡面
          // 例如： password 就會有一次出現兩種 error 的情況（ 開頭必須英文、長度至少 8 碼 ）
          errObject[item.path] = errObject[item.path]
            ? [...errObject[item.path], item.message]
            : [item.message];
        });
        console.log('errObject', errObject);
        setErrMessage(errObject);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isPass = await customValidation();
  };

  const renderErrorMessageText = (fieldKey) => {
    return errMessages[fieldKey]?.map((msg, index) => {
      return (
        <p key={index} style={{ color: 'red' }}>
          {msg}
        </p>
      );
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px' }}>
          <label>Email：</label>
          <input
            autoComplete="off"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {renderErrorMessageText('email')}
        </div>
        <div style={{ margin: '20px' }}>
          <label>Password：</label>
          <input
            autoComplete="off"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {renderErrorMessageText('password')}
        </div>
        <div style={{ margin: '20px' }}>
          <label>Confirm Password：</label>
          <input
            autoComplete="off"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {renderErrorMessageText('confirmPassword')}
        </div>
        <div style={{ margin: '20px' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default HtmlFormUseYup;
