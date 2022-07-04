import { base } from "./base";
import Request from "../utils/request";

export default class User {
  static user = new Request({
    baseURL: `${base.server3}/user`,
  });

  // 用户登录
  static login({
    userCount,
    userPassword,
  }: {
    userCount: string;
    userPassword: string;
  }) {
    return User.user
      .request({
        url: "/login",
        method: "POST",
        data: {
          userCount,
          userPassword,
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

  // 用户注销
  static logout(userCount: string) {
    return User.user
      .request({
        url: "/logout",
        method: "POST",
        data: {
          userCount,
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

  // 用户注册
  static register({
    userCount,
    userPassword,
    code,
  }: {
    userCount: string;
    userPassword: string;
    code: string;
  }) {
    return User.user
      .request({
        url: "/register",
        method: "POST",
        data: {
          userCount,
          userPassword,
          code,
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

  // 获取验证码
  static getCode({ userCount }: { userCount: String }) {
    return User.user
      .request({
        url: "/getCode",
        method: "GET",
        params: {
          userCount,
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

  // 获取用户数据
  static getUserData(userCount: string | null) {
    return User.user
      .request({
        url: "/getUserData",
        method: "GET",
        params: {
          userCount,
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
