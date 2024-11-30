import React from "react";
import StatusForm from "./components/StatusForm";
import Stock from "./components/Stock";
import Nevbar from "./components/Nevbar";

function App() {
  return (
    <div>
      <Nevbar />
      {" "}
      <div className="min-h-screen bg-pink-200 flex flex-col md:flex-row items-center md:items-start justify-center p-4">
        {/* Form Section */}
        <div className="w-full md:w-1/2 ">
          <StatusForm />
        </div>

        {/* Stock Table Section */}
        <div className="w-full md:w-2/3  overflow-x-auto">
          <Stock />
        </div>
      </div>
    </div>
  );
}

export default App;
