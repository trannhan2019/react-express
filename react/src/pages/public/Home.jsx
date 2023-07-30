import React from "react";
import { apiRefresh } from "../../apis/user";

function Home() {
  const submit = () => {
    apiRefresh();
  };
  return (
    <div>
      <h1>Test cookie</h1>
      <button onClick={submit}>cookie</button>
    </div>
  );
}

export default Home;
