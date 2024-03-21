import type { ActionFn, Next, ScenarioContext, EventEmitter } from "artillery";
import { URL } from "url";

export const loadEnvironmentVariable: ActionFn = (
  context: ScenarioContext,
  _ee: EventEmitter,
  next: Next,
) => {
  try {
    const emailedUrlString = process.env.npm_config_emailed_url;
    if (!emailedUrlString)
      throw new Error("The emailed_url param must be provided");
    context.vars.emailedUrl = emailedUrlString;
    const emailedUrl = new URL(emailedUrlString);
    const token = emailedUrl.searchParams.get("token");
    if (!token) throw new Error("The URL must have a token.");
    context.vars.token = `Bearer ${token}`;
    const dashboardLinkUrl = new URL(emailedUrl);
    dashboardLinkUrl.pathname = "/api/get-credential-links";
    dashboardLinkUrl.search = "";
    context.vars.dashboardLinkUrl = dashboardLinkUrl.toString();
    next();
  } catch (e: unknown) {
    next(e instanceof Error ? e : new Error(`${e}`));
  }
};

export const processDirectDeepLink: ActionFn = (
  context: ScenarioContext,
  _ee: EventEmitter,
  next: Next,
) => {
  console.log("Direct Deep Link", context.vars.directDeepLink);
  next();
};
