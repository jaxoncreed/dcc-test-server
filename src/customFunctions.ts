import "./lcwMock/pollyfill";
import type { ActionFn, Next, ScenarioContext, EventEmitter } from "artillery";
import { URL } from "url";
import { mockLCW } from "./lcwMock";

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
    // TODO swap back because it is not always the case that this is an emailed
    // url
    // const dashboardLinkUrl = new URL(emailedUrl);
    // const dashboardLinkUrl = new URL("http://localhost:3000");
    const dashboardLinkUrl = new URL("http://dashboard.dcconsortium.org");
    dashboardLinkUrl.pathname = "/api/get-credential-links";
    dashboardLinkUrl.search = "";
    context.vars.dashboardLinkUrl = dashboardLinkUrl.toString();
    next();
  } catch (e: unknown) {
    next(e instanceof Error ? e : new Error(`${e}`));
  }
};

export const processDirectDeepLink = async (
  context: ScenarioContext,
): Promise<void> => {
  const [lcwUrl, didAuth] = await mockLCW(
    context.vars.directDeepLink as string,
  );
  context.vars.lcwUrl = lcwUrl;
  context.vars.didAuth = didAuth;
};
