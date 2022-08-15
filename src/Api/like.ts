import { base } from "./base";
import Request from "../utils/request";

export default class Like {
  static like = new Request({
    baseURL: `${base.server3}/like`,
  });

  // 上传图片
  static isLike(userId: string, articleId: string) {
    return Like.like
      .request({
        url: "/isLike", //请求地址
        method: "GET",
        params: { userId, articleId },
      })
      .then(
        (value) => {
          console.log(value);
          return value;
        },
        (reason) => {
          console.log(reason);
          return reason;
        }
      );
  }
}
