/**
 * 登录、注册、注销
 */
import { base } from "./base";
import Request from "../utils/request";

export default class User {
  static user = new Request({
    baseURL: `${base.server3}`,
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
    phone,
    password,
    code,
  }: {
    phone: string;
    password: string;
    code: string;
  }) {
    return User.user
      .request({
        url: "/register",
        method: "POST",
        data: {
          phone,
          password,
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

  //修改用户
  static updated(user: User) {
    return User.user
      .request({
        url: "/user/update_user",
        method: "POST",
        data: user,
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

  // 获取用户统计数据
  static getUserCount(userId: string) {
    return User.user
      .request({
        url: "/user/count_user",
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

  //获取用户的数据
  static getUserData(userId: string) {
    return User.user
      .request({
        url: "/user/get_user",
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

  //获取一周的用户数据
  static getUserWeekData(userId: string) {
    return User.user
      .request({
        url: "/user/count_week_user",
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
}
