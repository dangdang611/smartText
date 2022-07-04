import { base } from "./base";
import Request from "../utils/request";

export default class Search {
  static search = new Request({
    baseURL: `${base.server3}/search`,
  });

  // 搜索自动补全
  static autoComplete(keyword: string) {
    return Search.search
      .request({
        url: "/autoComplete",
        method: "GET",
        params: {
          keyword,
        },
      })
      .then(
        (value) => {
          return value;
        },
        (reason) => {
          return reason;
        }
      );
  }
}
