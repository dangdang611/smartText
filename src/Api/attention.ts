/**
 * 关注用户
 */
import { base } from "./base";
import Request from "../utils/request";

export default class Attention {
  static attention = new Request({
    baseURL: `${base.server3}/attention`,
  });

  // 关注用户
  static setAttention(userId: string, attention_userId: string) {
    return Attention.attention
      .request({
        url: "/setAttention",
        method: "POST",
        data: {
          userId,
          attention_userId,
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

  // 关注用户
  static getAttention(userId: string) {
    return Attention.attention
      .request({
        url: "/getAttention",
        method: "GET",
        params: {
          userId,
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

  // 删除关注
  static delAttention(userId: string, attention_userId: string) {
    return Attention.attention
      .request({
        url: "/delAttention",
        method: "POST",
        data: {
          userId,
          attention_userId,
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
