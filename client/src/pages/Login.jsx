import { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Field, Form } from "react-final-form";
import Input from "../components/Input";
import { api } from "../utils/api";

function Login() {
  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userData = JSON.parse(userCookie);
        saveUser(userData);
        navigate("/");
      } else {
        setLoading(false);
      }
    };

    handleAuthRedirect();
  }, [saveUser, navigate]);

  const handleMouseMove = (event) => {
    if (event.target.tagName === "FORM") {
      return;
    }

    const glitter = document.createElement("div");
    glitter.className = "glitter";
    glitter.style.left = `${event.clientX}px`;
    glitter.style.top = `${event.clientY}px`;
    containerRef.current.appendChild(glitter);
    setTimeout(() => {
      glitter.remove();
    }, 1000);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await api.login(data);
      console.log(res);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="mx-auto my-0 flex flex-col items-center justify-center h-screen gradient-background"
    >
      <div className="mb-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
        Notely
      </div>
      <div className="mb-6 text-xl leading-none tracking-tight text-gray-900 md:text-lg lg:text-base dark:text-white">
        A note taking application with AI built-in for your notes
      </div>
      <Form
        initialValues={{}}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, invalid }) => {
          return (
            <form className="max-w-sm mx-auto w-1/2" onSubmit={handleSubmit}>
              <div className="mb-5">
                <Field name="email">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      meta={meta}
                      type="email"
                      placeholder="john@example.com"
                      label="Email"
                    />
                  )}
                </Field>
              </div>
              <div className="mb-5">
                <Field name="password">
                  {({ input, meta }) => (
                    <Input
                      {...input}
                      meta={meta}
                      placeholder="******"
                      type="password"
                      label="Password"
                    />
                  )}
                </Field>
              </div>
              <button
                type="submit"
                disabled={invalid}
                className="text-white mb-5 disabled:bg-gray-400 disabled:hover:bg-gray-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login In
              </button>
              <button
                type="button"
                onClick={googleLogin}
                className="text-white justify-center bg-[#4285F4] w-full text-center hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>
          );
        }}
      />
      <div className="text-sm mt-4 text-red-500 font-medium">{error}</div>
      <Link to="/signup">
        <div className="mt-4 text-blue-700">
          Don&apos;t have an account? Sign Up Here
        </div>
      </Link>
    </div>
  );
}

export default Login;
