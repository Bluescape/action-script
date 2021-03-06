import { context } from "@actions/github";
import { parsedContext } from "../utils/parse-context";
import { DEPLOY_LABEL_TEXT } from "./constants";

const defaultBrach = [
  "refs/heads/develop",
  "refs/heads/master",
  "refs/heads/main",
];
export async function isAutoDeployCommit({ github }: any): Promise<boolean> {
  console.log(process.env);
  const { owner, repo, sha, ref, branch } = parsedContext(context);

  if (defaultBrach.includes(ref)) {
    return true;
  }
  console.log(owner, repo, sha, ref, branch);
  const result = await github.repos.listPullRequestsAssociatedWithCommit({
    owner,
    repo,
    commit_sha: sha,
  });

  if (result.status != 200) {
    throw new Error("Failed to get pull details");
  }
  const { data: pulls } = result;
console.log(pulls);
  return pulls.some((pull: any) => {
    const {
      labels,
      head: { ref: pullRef },
    } = pull;
    const labelMatch = labels.some((label: any) => {
      const { name } = label;
      return name.toLowerCase().includes(DEPLOY_LABEL_TEXT);
    });
    console.log(labelMatch, branch, pullRef);
    return labelMatch && branch == pullRef;
  });
}
