import { base } from "./base";
import Request from "../utils/request";
import * as qs from "qs";

export default class CheckingArticle {
  static article = new Request({
    baseURL: `${base.server3}/publish`,
  });

  //发布资讯
  static publishArticle(data: object) {
    return CheckingArticle.article
      .request({
        url: "/publish_article",
        method: "PUT",
        data: qs.stringify(data),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

  //获取审核中的资讯
  static getDetail(articleId: string) {
    return CheckingArticle.article
      .request({
        url: "/get_articleDetail",
        method: "GET",
        params: {
          id: articleId,
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

  // 删除文章
  static delAticle(articleId: string) {
    return CheckingArticle.article
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

  // 通过文章
  static passAticle(articleId: string) {
    return CheckingArticle.article
      .request({
        url: "/pass_articel",
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

  // 不通过文章
  static failAticle(articleId: string) {
    return CheckingArticle.article
      .request({
        url: "/fail_articel",
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
