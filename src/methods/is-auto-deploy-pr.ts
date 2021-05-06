import { context } from "@actions/github";
import { parsedContext } from "../utils/parse-context";
import { DEPLOY_LABEL_TEXT } from "./constants";

export async function isAutoDeployPR({ github }:any): Promise<boolean> {
  const { owner, repo, sha, ref, branch } = parsedContext(context);
  const result = await github.repos.listPullRequestsAssociatedWithCommit({
    owner,
    repo,
    commit_sha: sha,
  });

  if (result.status != 200) {
    throw new Error("Failed to get pull details");
  }
  const { data: pulls } = result;

  return pulls.some((pull:any) => {
    const {
      labels,
      head: { ref: pullRef },
    } = pull;
    const labelMatch = labels.some((label:any) => {
      const { name } = label;
      return name.toLowerCase().includes(DEPLOY_LABEL_TEXT);
    });
    return labelMatch && branch == pullRef;
  });
}
