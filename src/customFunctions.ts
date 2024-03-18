import type { ActionFn, Next, ScenarioContext, EventEmitter } from "artillery";

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
    next();
  } catch (e: unknown) {
    next(e instanceof Error ? e : new Error(`${e}`));
  }
};

export const processResult: ActionFn = (
  context: ScenarioContext,
  _ee: EventEmitter,
  next: Next,
) => {
  console.log(context.vars.plainTextResponse);
  console.log("In here");
  next();
};
