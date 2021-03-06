# 【筆記】React Formik 表單套件
###### tags: `筆記文章`

![](https://i.imgur.com/vnuXUgq.png)


表單是前端開發上一定會碰到的東西，且往往是要寫不少`onChange` 事件與驗證等功能，而 『Formik』 就是一套方便我們來解決表單輸入的套件，它提供了一系列的 React Component 與 hooks 來讓我們能快速的建立表單功能。

使用 Formik 的優點：
>1. Getting values in and out of form state 
>方便『輸入/取得』表單裡的 state
>2. Validation and error messages 
>方便驗證，與顯示 error message
>3. Handling form submission
>方便處理 submit 事件

## 安裝
npm：
> npm install formik --save

yarn：
> yarn add formik

## 基本使用
目前 React 開發上都是以 functional component 為主，所以官方也提供了 `useFormik` hook 讓我們可以透過這個 hook 快速產生一系列的表單處理 function，直接先來看程式碼再來講解一下相關參數。

我們先從上半段的`useFormik` 開始看，可以看到在使用 `useFormik` 時傳入了 `initialValues` 與 `onSubmit` 這兩個參數，`initialValues` 代表這個表單裡有哪些 fields 並且設定這些 field state 的初始值，`onSubmit`則是當處理 form 的 submit 事件。

>裡面需要特別注意的是：`initialValues` 裡面所寫的 state 名稱需要與下面 `<input>`, `<select>`, `<textarea>` 的 `name` 或是 `id` 需要一至，這樣才會成功匹配到。

```jsx=
import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
    /* 下半段將 formik 塞到 DOM 元素中操作部分 */
    </form>
  );
};

```

接著看下半段 `<form>`,`<input>` 的部分，呼叫完 `useFormik` hook 後它會返回一系列 function 以及這個表單的 `values`，裡面最重要也一定會用到的是：

>  1. handleSubmit: A submission handler 
> 觸發 submit 事件，也就是上面 useFormik 的 onSubmit function
>  2. handleChange: A change handler to pass to each `<input>, <select>, or <textarea>`
>  會自動將輸入的 value 寫到 form 表單中對應的 id or name
> 3. values: Our form’s current values
> 表單的 values    
 

如果是原本的寫法可能會像是以下，需要自己對每個表單輸入框寫它們的 state 與 handle function。
  
```jsx=
const Page = () => {
    const [email,setEmail] = useState('')
    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    return (
        <input onChange={handleEmailChange} value={email} />
    )    
}
```

透過使用 formik 後我們完全不需要寫這些，只需要將 formik 提供的 function 傳到對應的 props 裡面即可，大大減少我們所要寫的 code。 

>以下面範例來說： input 的 onChage 事件就可以改用 formik.handleChage 代替， input 的 value 就可以透過 formik.values.xxx 來取得。

```jsx=
const SignupForm = () => {
  const formik = useFormik({
    /* 上半段 initialValue , onSubmit, validate 等設定部分 */
  });
    /* 下半段將 formik 塞到 DOM 元素中操作部分 */
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />     
      <button type="submit">Submit</button>
    </form>
  );
};
```
    
## 表單驗證
講到表單不免俗一定會有表單驗證的這個部分，因為在實務開發上來說，基本上在送出(Submit)前一定會經過一連串的欄位驗證，而驗證的部分則可以透過 `useFormik` 的 `validate` 或 `validationSchema` 這兩個參數來去對每個 fields 去做客製化驗證判斷，並且依照各個錯誤情況來回應不同的 Error Message。

> 這邊會先著重介紹 `validate` 功能，關於 `validationSchema` 會在後續補充 `yup` 套件時再介紹。
    
我們先來改寫一下剛剛上面的 `useFormik` 程式碼：
    
```jsx=
const Page = () =>{
    
    /* 客製化驗證規則 */
    const customValidateRoles = (values) =>{
        // values 為整個 form 的 state
        let errors = {}
        if(!values.firstName) errors.firstName = '請填寫姓'
        if(!values.lastName) errors.lastName = '請填寫名字'
        return errors

        /* 以往的驗證最後要寫進 component state（使用 Formik 則不用寫此行） */
        setErrorState(error)

    }
    const formik = useFormik({
        initialValue :{/* 審略*/},
        onSubmit:{/*審略*/},
        /* 驗證 */
        validate: customValidateRoles
    })
    
    /* 以往的驗證要設定 error state（使用 Formik 則不用寫此行） */
    const [errors , setErrors] = useState({})
}
 
```

在上面的程式碼中，我們增加了客製化的驗證規則(customValidateRoles)，每當有表單的 value 與驗證規則不符的時候，我們就將錯誤訊息寫到 `errors` 裡面，並且最後將整個 `errors` return 出來。
驗證 function 回傳出來的 errors 會被傳到 `formik.errors` 裡面，因此我們在攥寫畫面時就能很方便的顯示錯誤訊息，而不用又還要將錯誤訊息寫到 component 的 state 裡面(useState....xxxx)，整個省掉了一大步驟。

```jsx=
const Page = () =>{
    const formik = useFormik({.....}) 
    return(
        <div>
            {formik.errors.firstName && 
                <p>`錯誤：${formik.errors.firstName}`</p>}
        </div>
    )
}
```
>補充：Formik 套件不僅會自動幫我們追蹤表單裡的 values，連驗證(validation)與 error message 也會一直持續追蹤，因此每當我們透過 onChange 改變資料時都會觸發 validate function，透過這樣的機制就可以達到即時驗證的效果。

>補充：Formik 的 validate 功能會在每次 onChange 事件觸發後執行以及 onBlur 觸發後執行，還有在送出(onSubmit)前也會執行。 

## Visited fields

還記得上面介紹表單驗證的功能時，有介紹到它會『持續追蹤』使用者的每次變更(onChange、onBlur...等)，這樣雖然可以達到即時驗證的效果，但大多數的時候還是會希望『填寫過欄位』後再顯示錯誤訊息。
    
以下面的範例來說：如果今天使用者先填寫了『姓』的欄位後，觸發了驗證規則(`customValidateRoles`)的判斷，當判斷過程中經過 `!values.lastName`時，就會因為 `lastName` 欄位沒有值而顯示錯誤訊息，這樣容易造成使用者體驗的不理想。

![](https://i.imgur.com/lihgoWD.gif)

    
```jsx=
/* 客製化驗證規則 */
const customValidateRoles = (values) =>{
    // values 為整個 form 的 state
    let errors = {}
    if (!values.email) {
        errors.email = 'Email 沒有值'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email 不正確'
    }
    if (!values.password) errors.password = '密碼沒有填'
    return errors    
}
/* component 元件畫面 */
return(
    <form onSubmit={handleSubmit}>
      <div style={{ margin: '20px' }}>
        <label>Email：</label>
        <input autoComplete='off' type='email' name='email' onChange={handleChange} value={values.email} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div style={{ margin: '20px' }}>
        <label>Password：</label>
        <input autoComplete='off' type='password' name='password' onChange={handleChange} value={values.password} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
    </form>
)
```
    
因此為了防止這樣的情況，可以在顯示錯誤訊息的地方加上 `formik.touched` 的判斷，當使用者有『訪問過』該欄位的話才將錯誤訊息顯示出來。
> 透過傳入 `formik.handleBlur` 到輸入框 onBlur props 後，每當輸入框 onBlur 時就會將『該欄位是否已被 touched 過』紀錄起來，之後就可以透過 touched 物件來增加錯誤顯示判斷。 
ex.`<input name='email' onBlur={formik.handleBlur}/>` 

這邊改寫一下上面的 error 顯示的邏輯，增加 `touched.xxx` 的判斷：
    
```jsx=
/* 改寫 email error 顯示判斷 */
<div style={{ margin: '20px' }}>
    <label>Email：</label>
    <input autoComplete='off' type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} />
    /* 注意這邊加上了 touched.email */
    {errors.email && touched?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
</div>
```

![](https://i.imgur.com/JoyfOHE.gif)

從上面的測試影片中可以發現，當輸入框 onBlur 後將該欄位的`name`當作 key 寫到 `formik.touched` 物件中，紀錄著該欄位已被訪問過了。

## getFieldProps()
以往我們在使用 `useFormik` 時，每次都需要對每個 inputs 填上 formik.handleChange、formik.values、formik.handleBlur...等內容，這不僅讓程式碼變得很冗長也會浪費不少時間在一直寫重複的 code。

因此 `useFormik` 提供了一個 helper function 來幫我們快速的產生這些內容，它就是 `formik.getFieldProps()`，只需要傳入該欄位的 name 名稱到 `getFieldProps` 中，它就會幫我們產生 `onChange`、`onBlur`、`name`、`value` 這幾個屬性的物件，讓整個程式碼變得只需要寫一行就好。

![](https://i.imgur.com/s8W6x7Y.png)

```jsx=
/* 以往寫法 */
<input
    id='email'
    name='email'
    onChange={formik.handleChange}
    value={formik.values.email}
/>
/* 使用 getFieldProps */
<input
    id='email'
    {...formik.getFieldProps('email')}
/>
```

## Formik 套件的 Components 連技
上面的介紹基本上都是圍繞在使用 useFormik 為主軸，我們可以透過 getFieldProps 來減少程式碼的攥寫，整個表單在使用 useFormik 的情況下，大概只剩下需要寫 handleSubmit、getFieldProps 與 error 這三個部分而已。

#### 但...身為工程師懶還要更懶才行！！！
因此 Formik 就提供了一系列的 component 組合技給我們使用，從外到內分別為：`<Formik>`、`<Form>`、`<Field>`、`<ErrorMessage>`，我們只需要使用這個組合技，什麼 handle function、什麼 error message、都不再需要再透過 props 傳入。

```jsx=

<Formik
    initialValues={{ email: '', password: '' }}
    validate={(values) => {/*...審略...*/}}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
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
</Formik>Ï
```

能夠這樣實作的關鍵在於最外層的 Formik Component，它內部使用了 React Context API 將 `useFormik` 的 return value 透過 Provider 傳給所有的子組件，因此所有的 child component 只需要透過 context 就可以拿到整個表單的資訊。

```jsx=
 // Create empty context
 const FormikContext = React.createContext({});
 // 簡單實作 Formik Component
 export const Formik = ({ children, ...props }) => {
   const formikStateContext = useFormik(props);
   return (
     <FormikContext.Provider value={formikStateContext}>
          {children}
     </FormikContext.Provider>
   );
 };
/* 簡單實作 Field Component（用 input 來舉例） */ 
const Field = (props) =>{
    const formikState = useContext(FormikContext);
    return(
        <input {...props} {...formikState.getFieldProps(props)} />
    )
}
```

## 客製化自己的 Input Field
基本上我們不太會去客製化一個`<Formik>`Component，但我們會去客製化自己的輸入框(替換掉官方的`<Field>`)，因為在實務上會依照設計稿上的 UIKit 來去攥寫各種不同的 input component，例如：label + input + error 的輸入框組合，而這方面 Formik 套件也提供我們使用 `useField` hook 去跟 formik 連結。

```jsx=
const CustomInputGroup: React.FC<any> = ({ label, ...props }) => {
  // useField() 的回傳值為 [formik.getFieldProps(), formik.getFieldMeta()]
  // field 主要為 onChange values 等欄位
  // meta 主要為 error 、 touch 等欄位
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  )
}
// 使用 CustomInputGroup
<Formik
  initialValues={{ email: '', password: '' }}
  validate={(values) => {/*審略*/}
  onSubmit={(values) => {/*審略*/}
>
  <CustomInputGroup label={'email'} name={'email'} />
</Formik>
```

>注意：如果要使用 `useField` 的方式去客製化一個 component 的話，在使用上『必須』搭配使用 `<Formik>`，因為它內部會去呼叫 `useFormikContext` hook 來取得 Formik state 和 helper function 來進行操作。

![](https://i.imgur.com/rP6Y6mi.png)


## Reference
1. [FORMIK - 官方](https://formik.org/docs/tutorial#visited-fields)