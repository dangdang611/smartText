import { base } from "./base";
import Request from "../utils/request";

export default class Article {
  static article = new Request({
    baseURL: `${base.server3}/article`,
  });

  // 创建资讯
  static insertArticle(data: object) {
    return Article.article
      .request({
        url: "/insertArticle",
        method: "PUT",
        data: {
          data,
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

  // 获取资讯
  static getArticle(
    path: string,
    userId: string | null,
    page: number,
    size: number
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
          console.log(value);
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
  static delAticle(newsId: string) {
    return Article.article
      .request({
        url: "/delAticle",
        method: "DELETE",
        params: {
          newsId,
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
        url: "/searchArticle",
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
  static getLike(id: string, isAdd: number) {
    return Article.article
      .request({
        url: "/giveLike_article",
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
