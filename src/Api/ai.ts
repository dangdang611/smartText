import { base } from "./base";
import Request from "../utils/request";

export default class AIHttp {
  static r = new Request({
    baseURL: `${base.AIroot}`,
  });
  // 获取智能标题
  static getSmartTitle(context: string, minWords: number, maxWords: number) {
    context = this.loadContent(context);
    return AIHttp.r
      .request({
        url: "/",
        method: "POST",
        data: {
          content: context,
          maxWords,
          limitLen: minWords,
        },
      })
      .then(
        (value) => {
          // titles
          console.log("donsadasdasdasd}}}");
          console.log(value);
          return this.loadData(value);
        },
        (reason) => {
          return reason;
        }
      );
  }
  static loadData(inData: object) {
    let fData = {
      code: "",
      data: {
        titles: [],
      },
    };
    // @ts-ignore
    fData["code"] = "200";
    // @ts-ignore
    fData["data"]["titles"].push(inData["title"]);
    // @ts-ignore
    fData["data"]["digests"] = inData["overview"];
    console.log(fData);
    return fData;
  }
  static loadContent(content: string) {
    let len = content.length;
    let gethead = false;
    let rollback = "";
    for (let i = 0; i < len; i++) {
      if (content[i] == "<") {
        gethead = true;
        continue;
      }
      if (
        content[i] == ">" ||
        (content[i] == "/" && i + 1 < length && content[i + 1] == ">")
      ) {
        gethead = false;
        continue;
      }
      if (gethead == true) continue;
      rollback = rollback + content[i];
    }
    return rollback;
  }
}
