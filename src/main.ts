import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";
import * as io from "@actions/io";
import * as methods from "./methods";

process.on("unhandledRejection", handleError);
main().catch(handleError);

type Options = {
  log?: Console;
  userAgent?: string;
  previews?: string[];
};

async function main(): Promise<void> {
  const token = core.getInput("github-token", { required: true });
  const debug = core.getInput("debug");
  const userAgent = core.getInput("user-agent");

  const opts: Options = {};
  if (debug === "true") opts.log = console;
  if (userAgent != null) opts.userAgent = userAgent;

  const github = getOctokit(token, opts);
  const methodName: any = core.getInput("method", { required: true });
  const methodNames: any = Object.keys(methods);
  console.log("methodName:", methodName);
  if (!methodNames.includes(methodName)) {
    throw new Error(
      `Method not found. Available methods: ${methodNames.join(",")}`
    );
  }

  const { ...method }: any = methods;
  let result = await method[methodName]({ github });
  let encoding = core.getInput("result-encoding");
  encoding = encoding ? encoding : "json";

  let output;

  switch (encoding) {
    case "json":
      output = JSON.stringify(result);
      break;
    case "string":
      output = String(result);
      break;
    default:
      throw new Error('"result-encoding" must be either "string" or "json"');
  }

  core.setOutput("result", output);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err: any): void {
  console.error(err);
  core.setFailed(`Unhandled error: ${err}`);
}
