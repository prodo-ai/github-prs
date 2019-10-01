import * as React from "react";
import { state, watch, dispatch } from "../model";
import { push } from "@prodo/route";

const setSearch = (value: string) => {
  state.search = value;
  state.searchError = undefined;
};

const navigateToRepo = () => {
  const value = state.search.replace("https://github.com/", "");
  const match = value.match(/(.+)\/(.+)/);
  if (match == null || match.length !== 3) {
    state.searchError = "Invalid search";
    return;
  }

  state.searchError = undefined;

  const owner = match[1];
  const repo = match[2];

  dispatch(push)(`${owner}/${repo}`);
};

const Home = () => {
  const error = watch(state.searchError);

  return (
    <div className="center">
      <div>
        <h1>Search pull requests for a Github Repo</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch(navigateToRepo)();
          }}
        >
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            placeholder="owner/repo"
            value={watch(state.search)}
            onChange={e => dispatch(setSearch)(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
