import React, { useState } from "react";
import MainContentDiv from "./components/MainContentDiv";

const App = () => {
  return (
    <div className="bg-bgsecondary">
      <div className="mx-auto max-w-[1440px] overflow-hidden">
        <MainContentDiv />
      </div>
    </div>
  );
};

export default App;
