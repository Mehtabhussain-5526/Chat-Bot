import AuthCheck from "./components/AuthCheck.jsx";
import Login from "./components/Login.jsx";
import MainContentDiv from "./components/MainContentDiv";
import SignUp from "./components/SignUp.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MyProvider } from "./context/context.jsx";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { limit } from "firebase/firestore";

const App = () => {
  return (
    <>
      <MyProvider>
        <div className="">
          <div className="mx-auto">
            <HashRouter>
              <Routes>
                <Route path="/mainpage" element={<AuthCheck />} />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </HashRouter>
          </div>
        </div>
      </MyProvider>
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </>
  );
};

export default App;
