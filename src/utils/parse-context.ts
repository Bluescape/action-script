export function parsedContext(context: any): any {
  console.log(context);
  const {
    payload: {
      repository: { name: repo1, organization },
    },
    sha,
    ref,
  } = context;
  const owner = process.env.GITHUB_REPOSITORY_OWNER || "";
  const repository = process.env.GITHUB_REPOSITORY || "";
  const repo = repository.slice("refs/heads/".length + 1);

  const branch = ref.slice("refs/heads/".length);
  return {
    sha,
    repo,
    owner,
    ref,
    branch,
  };
}
