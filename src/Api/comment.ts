import { base } from "./base";
import Request from "../utils/request";

export default class Article {
  static article = new Request({
    baseURL: `${base.server3}/comment`,
  });

  // 获取资讯评论
  static getComment(articleId: string) {
    return Article.article
      .request({
        url: "/get_comment",
        method: "GET",
        params: {
          articleId,
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

  //评论点赞
  static getLike(id: string, isAdd: number) {
    return Article.article
      .request({
        url: "/giveLike_comment",
        method: "GET",
        params: {
          id,
          isAdd,
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
