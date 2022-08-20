import { base } from "./base";
import Request from "../utils/request";
import * as qs from "qs";

export default class FailArticle {
  static article = new Request({
    baseURL: `${base.server3}/fail`,
  });

  //发布资讯
  static publicArticle(data: object) {
    return FailArticle.article
      .request({
        url: "/publish_article",
        method: "PUT",
        data: qs.stringify(data),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

  //获取审核中的资讯
  static getDetail(articleId: string) {
    return FailArticle.article
      .request({
        url: "/get_articleDetail",
        method: "GET",
        params: {
          id: articleId,
        },
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

  // 删除文章
  static delAticle(articleId: string) {
    return FailArticle.article
      .request({
        url: "/del_articel",
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
}
