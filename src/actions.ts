import { state } from "./model";
import * as api from "./api";

export const loadPullRequests = async (owner: string, repo: string) => {
  const key = `${owner}/${repo}`;
  state.pullRequests[key] = await api.getPullRequests(owner, repo);
};
