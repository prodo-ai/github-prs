import { createModel } from "@prodo/core";
import loggerPlugin from "@prodo/logger";
import routePlugin from "@prodo/route";

export interface IPullRequest {
  id: number;
  prNumber: number;
  title: string;
  url: string;
  author: string;
  authorImage: string;
  createdAt: string;
}

export interface State {
  pullRequests: { [key: string]: IPullRequest[] };
}

export const model = createModel<State>()
  .with(loggerPlugin)
  .with(routePlugin);

export const { state, watch, dispatch } = model.ctx;
