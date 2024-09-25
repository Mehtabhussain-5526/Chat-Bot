import AuthCheck from "./components/AuthCheck.jsx";
import Login from "./components/Login.jsx";
import MainContentDiv from "./components/MainContentDiv";
import SignUp from "./components/SignUp.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MyProvider } from "./context/context.jsx";


const App = () => {
  return (
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
  );
};

export default App;
