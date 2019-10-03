import * as React from "react";
import { state, watch, dispatch, IPullRequest } from "../model";
import * as actions from "../actions";

const formatDate = (dateString: string): string => {
  const created = new Date(dateString);
  return `${created.getDay()}/${created.getMonth()}/${created.getFullYear()}`;
};

const PullRequest: React.FC<{ pullRequest: IPullRequest }> = ({
  pullRequest,
}) => {
  return (
    <a href={pullRequest.url} target="_blank" className="none">
      <div className="pull-request">
        <img src={pullRequest.authorImage} />

        <div>
          <h2>{pullRequest.title}</h2>
          <span className="pull-request__detail">
            #{pullRequest.prNumber} opened {formatDate(pullRequest.createdAt)}{" "}
            by {pullRequest.author}
          </span>
        </div>
      </div>
    </a>
  );
};

export interface Props {
  owner: string;
  repo: string;
}

const Repo: React.FC<Props> = ({ owner, repo }) => {
  React.useEffect(() => {
    dispatch(actions.loadPullRequests)(owner, repo);
  }, [owner, repo]);

  const pullRequests = watch(state.pullRequests[`${owner}/${repo}`]);

  return (
    <div>
      <h1>
        Pull Requests for{" "}
        <a className="none" href={`https://github.com/${owner}/${repo}/pulls`}>
          <em>
            {owner}/{repo}
          </em>
        </a>
      </h1>

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
