export function parsedContext(context: any): any {
  const {
    payload: {
      repository: { name: repo, organization },
    },
    sha,
    ref,
  } = context;
  const branch = ref.slice("refs/heads/".length);
  return {
    sha,
    repo: repo,
    owner: organization,
    ref,
    branch,
  };
}
