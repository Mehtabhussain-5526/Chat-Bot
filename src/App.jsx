import Login from "./components/Login.jsx";
import MainContentDiv from "./components/MainContentDiv";
import SignUp from "./components/SignUp.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-[1440px] overflow-hidden">
        <HashRouter>
          <Routes>
            <Route path="/mainpage" element={<MainContentDiv />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;
