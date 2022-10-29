import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { Button, useTheme } from '@mui/material';

const Home: NextPage = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <div className={styles.container}>
      <div className={styles.testTsPath}>測試 TS Alias Path</div>
      <Link href="/formikValidation">
        <a>
          <h2 style={{ color: 'blue' }}>測試即時驗證</h2>
        </a>
      </Link>
      <Link href="/formikValidationTouched">
        <a>
          <h2 style={{ color: 'blue' }}>測試等到 Touched 過後再驗證</h2>
        </a>
      </Link>
      <Link href="/formikGetFieldProps">
        <a>
          <h2 style={{ color: 'blue' }}>使用 useformik getFieldProps</h2>
        </a>
      </Link>
      <Link href="/formikComposition">
        <a>
          <h2 style={{ color: 'blue' }}>使用 Formik、Form、Field 等 component</h2>
        </a>
      </Link>
      <Link href="/formikContext">
        <a>
          <h2 style={{ color: 'blue' }}>實作 Formik Component</h2>
        </a>
      </Link>
      <Link href="/formikInputFieldGroup">
        <a>
          <h2 style={{ color: 'blue' }}>使用 useField 去客製化自己的 input 元件</h2>
        </a>
      </Link>
      <Link href="/formikUseYup">
        <a>
          <h2 style={{ color: 'blue' }}>使用 Yup 做驗證</h2>
        </a>
      </Link>
      <Link href="/htmlFormUseYup">
        <a>
          <h2 style={{ color: 'blue' }}>使用 Html form 搭配 Yup 做驗證</h2>
        </a>
      </Link>
      <Button variant="contained" color="green">
        Use custom MUI Button with green color
      </Button>
    </div>
  );
};

export default Home;
