import { createModel } from "@prodo/core";
import loggerPlugin from "@prodo/logger";
import routePlugin from "@prodo/route";
import devtoolsPlugin from "@prodo/devtools";
import { PullRequest } from "./github";

export interface State {
  search: string;
  searchError?: string;
  prError?: string;
  pullRequests: { [key: string]: PullRequest[] };
}

export const model = createModel<State>()
  .with(routePlugin)
  .with(loggerPlugin);

export const { state, watch, dispatch } = model.ctx;
