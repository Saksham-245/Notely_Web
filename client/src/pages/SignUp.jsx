import { useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

function SignUp() {
  const containerRef = useRef(null);
  const [error, setError] = useState('');

  const handleMouseMove = (event) => {
    if (event.target.tagName === 'FORM') {
      return;
    }

    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    glitter.style.left = `${event.clientX}px`;
    glitter.style.top = `${event.clientY}px`;
    containerRef.current.appendChild(glitter);
    setTimeout(() => {
      glitter.remove();
    }, 1000);
  };

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required'
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm Password is not same as password'
    }

    return errors;
  }

  const onSubmit = async values => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.confirmPassword
    }

    try {
      const res = await api.signup(data);
      console.log(res, 'res');
    } catch (e) {
      setError(e.response.data.message);
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="mx-auto my-0 flex flex-col items-center justify-center h-screen gradient-background"
    >
      <div className="mb-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Notely</div>
      <div className="mb-6 text-xl leading-none tracking-tight text-gray-900 md:text-lg lg:text-base dark:text-white">A note taking application with AI built-in for your notes</div>
      <Form
        initialValues={{}}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, invalid }) => {
          return (
            <form className="max-w-sm mx-auto w-1/2" onSubmit={handleSubmit}>
              <div className="mb-5">
                <Field name='name'>
                  {({ input, meta }) => <Input {...input} meta={meta} type='text' placeholder='John Doe' label='Full Name' />}
                </Field>
              </div>
              <div className="mb-5">
                <Field name='email'>
                  {({ input, meta }) => <Input {...input} meta={meta} type='email' placeholder='john@example.com' label='Email' />}
                </Field>
              </div>
              <div className="mb-5">
                <Field name='password'>
                  {({ input, meta }) => <Input {...input} meta={meta} type='password' placeholder='*****' label='Password' />}
                </Field>
              </div>
              <div className="mb-5">
                <Field name='confirmPassword'>
                  {({ input, meta }) => <Input {...input} meta={meta} type='password' placeholder='*****' label='Confirm Password' />}
                </Field>
              </div>
              <button
                type="submit"
                disabled={invalid}
                className="text-white mb-5 disabled:bg-gray-400 disabled:hover:bg-gray-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </form>
          )
        }}
      />
      <div className="text-sm mt-4 text-red-500 font-medium">{error}</div>
      <Link to='/login'>
        <div className="mt-4 text-blue-700">
          Have an account? Login In Here
        </div>
      </Link>
    </div>
  )
}

export default SignUp