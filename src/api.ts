import { IPullRequest } from "./model";

export const getPullRequests = async (
  owner: string,
  repo: string,
): Promise<IPullRequest[]> => {
  const data = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
  ).then(res => res.json());

  if (data.message != null) {
    throw new Error(data.message);
  }

  const pullRequests: IPullRequest[] = data.map((d: any) => ({
    id: d.id,
    prNumber: d.number,
    title: d.title,
    url: d.html_url,
    author: d.user.login,
    authorImage: d.user.avatar_url,
    createdAt: d.created_at,
  }));

  return pullRequests;
};
