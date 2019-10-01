import * as React from "react";
import { state, watch, dispatch } from "../model";
import { PullRequest as PullRequestModel, getPullRequests } from "../github";

export interface Props {
  owner: string;
  repo: string;
}

const loadPullRequests = async (owner: string, repo: string) => {
  state.prError = undefined;
  const key = `${owner}/${repo}`;

  try {
    state.pullRequests[key] = await getPullRequests(owner, repo);
  } catch (e) {
    delete state.pullRequests[key];
    state.prError = e.message;
  }
};

const PullRequest: React.FC<{ pullRequest: PullRequestModel }> = ({
  pullRequest,
}) => {
  const created = new Date(pullRequest.createdAt);

  return (
    <a href={pullRequest.url} target="_blank" className="none">
      <div className="pull-request">
        <img className="pull-request__avatar" src={pullRequest.authorImage} />
        <div className="pull-request__info">
          <h2 className="pull-request__title">{pullRequest.title}</h2>
          <span className="pull-request__detail">
            #{pullRequest.prNumber} opened {created.getDay()}/
            {created.getMonth()}/{created.getFullYear()} by {pullRequest.author}
          </span>
        </div>
      </div>
    </a>
  );
};

const Repo: React.FC<Props> = props => {
  React.useEffect(() => {
    dispatch(loadPullRequests)(props.owner, props.repo);
  }, [props.owner, props.repo]);

  const pullRequests = watch(
    state.pullRequests[`${props.owner}/${props.repo}`],
  );
  const error = watch(state.prError);

  return (
    <div>
      <h1>
        Pull Requests for{" "}
        <a
          className="none"
          href={`https://github.com/${props.owner}/${props.repo}/pulls`}
        >
          <em>
            {props.owner}/{props.repo}
          </em>
        </a>
      </h1>

      {error && <div className="error">{error}</div>}

      {pullRequests == null ? (
        <h1>Loading...</h1>
      ) : (
        <div className="pull-requests">
          {pullRequests.map(pr => (
            <PullRequest key={pr.id} pullRequest={pr} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repo;
