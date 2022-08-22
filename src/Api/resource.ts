import { base } from "./base";
import Request from "../utils/request";

export default class Resource {
  static resource = new Request({
    baseURL: `${base.server4}/club`,
  });

  // 上传图片
  static uploadPic(formData: FormData) {
    return Resource.resource
      .request({
        url: "/fileupload/pic.do", //请求地址
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
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
