import * as React from "react";
import { dispatch } from "../model";
import { push } from "@prodo/route";

const Home = () => {
  const [search, setSearch] = React.useState("");

  return (
    <div className="home">
      <h1>Enter a Github owner and repo</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(push)(search);
        }}
      >
        <input
          placeholder="owner/repo"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button>Go</button>
      </form>
    </div>
  );
};

export default Home;
