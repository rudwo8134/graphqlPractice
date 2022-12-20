import React from "react";
import Headers from "./Header";

const App = (props) => {
  return (
    <div>
      <Headers />
      {props.children}
    </div>
  );
};

export default App;
