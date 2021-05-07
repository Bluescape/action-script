export function parsedContext(context: any): any {
  console.log(context);
  const {
    payload: {
      repository: { name: repo1, organization },
    },
    sha,
    ref,
    eventName,
  } = context;
  const owner = process.env.GITHUB_REPOSITORY_OWNER || "";
  const repository = process.env.GITHUB_REPOSITORY || "";
  const repo = repository.slice(owner.length + 1);
  let branch = ref.slice("refs/heads/".length);
  if (eventName == "pull_request") {
    branch = process.env.GITHUB_HEAD_REF;
  }

  return {
    sha,
    repo,
    owner,
    ref,
    branch,
  };
}
