import { Field, Form } from "react-final-form";
import Header from "../components/Header";
import Input from "../components/Input";

function NewNote() {
  const validate = (values) => {
    const errors = [];
    if (!values.title) {
      errors.title = "Enter Title";
    }
    return errors;
  };
  return (
    <>
      <Header />
      <div className="mt-4 h-full px-3 max-w-screen">
        <Form
          initialValues={null}
          validate={validate}
          onSubmit={() => null}
          render={({ handleSubmit }) => {
            return (
              <form className="mx-auto w-1/2" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <Field name="title">
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        meta={meta}
                        type="text"
                        placeholder="Enter Title"
                        label="Title"
                      />
                    )}
                  </Field>
                </div>
                <div className="mb-5"></div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add New Note
                </button>
              </form>
            );
          }}
        />
      </div>
    </>
  );
}

export default NewNote;
