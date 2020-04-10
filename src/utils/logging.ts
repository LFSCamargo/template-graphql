import { Request } from "koa";
import { ENV } from "~/config";

export const logRequest = (request: Request) => {
  if (ENV === "DEV") {
    console.log("HEADERS", request.header);
    console.log("BODY", request.body);
  }
};
