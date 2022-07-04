import { base } from "./base";
import Request from "../utils/request";

export default class Manage {
  static manage = new Request({
    baseURL: `${base.server3}/manage`,
  });

  // 获取首页数据
  static getHomeData(userCount: string) {
    return Manage.manage
      .request({
        url: "/home",
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

  // 获取作品数据
  static getProductionData(
    userCount: string,
    type: number,
    page: number,
    size: number
  ) {
    return Manage.manage
      .request({
        url: "/productionManage",
        method: "GET",
        params: {
          userCount,
          type,
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

  // 获取评论数据
  static getCommeData(
    userCount: string,
    type: number,
    page: number,
    size: number
  ) {
    return Manage.manage
      .request({
        url: "/commentManage",
        method: "GET",
        params: {
          userCount,
          type,
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
}
