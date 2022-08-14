import { base } from "./base";
import Request from "../utils/request";

export default class Comment {
  static comment = new Request({
    baseURL: `${base.server3}/comment`,
  });

  // 获取资讯评论
  static getComment(
    path: string,
    id: string,
    page: number = 0,
    size: number = 0
  ) {
    return Comment.comment
      .request({
        url: path,
        method: "GET",
        params: {
          id,
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

  //评论点赞
  static getLike(id: string, isAdd: number) {
    return Comment.comment
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

  //添加评论
  static addComment(
    userId: string,
    articleId: string,
    content: string,
    targetId: string | null
  ) {
    return Comment.comment
      .request({
        url: "/add_comment",
        method: "POST",
        data: {
          userId,
          articleId,
          content,
          targetId,
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

  //删除评论
  static delComment(commentId: string) {
    return Comment.comment
      .request({
        url: "/del_comment",
        method: "GET",
        params: {
          commentId,
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
