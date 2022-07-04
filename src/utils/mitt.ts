// mitt库默认导出的是一个函数，需要执行它从而得到事件总线的对象
// 暴露这个事件总线对象
import mitt from "mitt";
const emitter = mitt();
export default emitter;
