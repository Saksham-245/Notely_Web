import { useNavigate } from "react-router";
import { api } from "../utils/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { isArrayEmpty } from "../utils/utils";

const blogs = [
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
];

function MainPage() {
  const navigate = useNavigate();
  const { unsetUser } = useContext(AuthContext);

  const onLogout = async () => {
    try {
      await api.logout();
      unsetUser();
      navigate("/");
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return (
    <>
      <Header onLogout={onLogout} />
      <div className="mt-4 h-full px-3 max-w-screen">
        <button
          onClick={() => navigate("/add")}
          type="button"
          className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add New Note
        </button>
      </div>
      {isArrayEmpty(blogs) && (
        <div className="mt-64 mx-[86px] items-center flex justify-center">
          No Notes Found
        </div>
      )}
      {!isArrayEmpty(blogs) && (
        <div className="mt-20 mx-[24px] grid grid-cols-4 gap-11">
          {blogs.map((item) => {
            return (
              <Link
                key={item.id}
                to="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default MainPage;
