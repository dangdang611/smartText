import { number } from "echarts";

export class WeeksDate {
  // 获取当前日期的前7天
  getDays() {
    let oneDay = 24 * 60 * 60 * 1000;
    let endTime = new Date(Date.now() - oneDay);
    let end = this.formatterDate(endTime, "yyyy-MM-dd hh:mm:ss");
    let startTime = new Date(Date.now() - 7 * oneDay);
    let start = this.formatterDate(startTime, "yyyy-MM-dd hh:mm:ss");
    const days = {
      start,
      end,
    };
    return days;
  }
  // 获取前n天的数据
  getPreDays(n: number) {
    let oneDay = 24 * 60 * 60 * 1000;
    let endTime = new Date(Date.now() - n * oneDay);
    let end = this.formatterDate(endTime, "yyyy-MM-dd hh:mm:ss");
    return end;
  }

  //时间格式化
  formatterDate(date: Date, fmt: string) {
    let nowDate = {
      yyyy: date.getFullYear(), // 年
      MM: date.getMonth() + 1, // 月份
      dd: date.getDate(), //日
      hh: date.getHours(),
      mm: date.getMinutes(),
      ss: date.getSeconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    let k: keyof typeof nowDate;
    for (k in nowDate) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? nowDate[k] + ""
            : ("00" + nowDate[k]).substr(("" + nowDate[k]).length)
        );
      }
    }
    return fmt;
  }
}
