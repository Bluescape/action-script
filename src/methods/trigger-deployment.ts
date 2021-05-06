import { context } from "@actions/github";
import { parsedContext } from "../utils/parse-context";

export async function triggerDeployment({ github }: any): Promise<string> {
  const { owner, repo, sha, ref } = parsedContext(context);
  const image = process.env.TARGET_IMAGE;
  const infraBranch = process.env.TAG ? "release" : "master";
  await github.actions.createWorkflowDispatch({
    owner,
    repo: "infrastructure",
    workflow_id: "remote_deploy.yml",
    ref: infraBranch,
    inputs: {
      image,
      ref: ref,
      tag: sha.substring(0, 7),
    },
  });
  return "Workflow Dispatch Triggered";
}
