import { base } from "./base";
import Request from "../utils/request";
import * as qs from "qs";

export default class Article {
  static article = new Request({
    baseURL: `${base.server3}/article`,
  });

  // 创建资讯
  static insertArticle(data: object) {
    return Article.article
      .request({
        url: "/insert_article",
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

  // 获取资讯
  static getArticle(
    path: string,
    userId: string | null,
    page: number = 0,
    size: number = 0
  ) {
    return Article.article
      .request({
        url: path,
        method: "GET",
        params: {
          userId,
          page,
          size,
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

  // 获取资讯内容
  static getDetail(articleId: string) {
    return Article.article
      .request({
        url: "/get_articleDetail",
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

  // 获取智能标题
  static getSmartTitle(context: string, minWords: number, maxWords: number) {
    return Article.article
      .request({
        url: "/getSmartTitle",
        method: "POST",
        data: {
          context,
          minWords,
          maxWords,
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

  // 获取智能摘要
  static getSmartDigest(context: string, minWords: number, maxWords: number) {
    return Article.article
      .request({
        url: "/getSmartDigest",
        method: "POST",
        data: {
          context,
          minWords,
          maxWords,
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
    return Article.article
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
  // 搜索资讯
  static searchArticle(keyword: string, page: number, size: number) {
    return Article.article
      .request({
        url: "/get_search",
        method: "GET",
        params: {
          keyword,
          page,
          size,
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

  //文章点赞
  static getLike(id: string, userId: string, isAdd: number) {
    return Article.article
      .request({
        url: "/giveLike_article",
        method: "GET",
        params: {
          id,
          userId,
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

  // 搜索自动补全
  static autoComplete(keyword: string) {
    return Article.article
      .request({
        url: "/get_autoComplete",
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

  //浏览量加1
  static addShowNum(articleId: string) {
    return Article.article
      .request({
        url: "/add_showNum",
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
