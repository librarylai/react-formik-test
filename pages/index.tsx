import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href='/formikValidation'>
        <a>
          <h2 style={{color: 'blue'}}>測試即時驗證</h2>
        </a>
      </Link>
      <Link href='/formikValidationTouched'>
        <a>
          <h2 style={{color: 'blue'}}>測試等到 Touched 過後再驗證</h2>
        </a>
      </Link>
    </div>
  )
}

export default Home
