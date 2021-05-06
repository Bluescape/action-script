import * as core from "@actions/core";
import fetch from "node-fetch";

export async function sendSlackNotification({ github }: any): Promise<string> {
  try {
    // Inputs and validation
    const slackChannelUrl = core.getInput("webhook_url", {
      required: true,
    });
    const message = core.getInput("message", { required: true });

    const res = await fetch(slackChannelUrl, {
      method: "POST",
      body: JSON.stringify({ text: message }),
    });

    if (res.status === 200) {
      core.info("Slack message sent 🚀");
    } else {
      core.setFailed(`❌ Unable to send Slack message: ${res.status}`);
    }
  } catch (error) {
    core.setFailed(`❌ Action failed with error: ${error}`);
  }
  return "slack notification sent";
}
