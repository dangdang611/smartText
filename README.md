# 智能资讯平台

**在线地址**：[SPD-智能资讯 (tcloudbase.com)](http://smarttext-7gdnmt748ea147ba-1313352825.ap-shanghai.app.tcloudbase.com/#/)

**注意**：不要使用 http 访问，因为服务器没有设置 SSL 证书

部分效果截图：![image-20220822100916861](http://101.35.194.184:8080/club/img/foreign/731/1661138239195431529176.png)

![image-20220822100953199](http://101.35.194.184:8080/club/img/foreign/425/1661138282921431529176.png)

![image-20220822101021413](http://101.35.194.184:8080/club/img/foreign/808/1661138310952431529176.png)

## 涉及技术

### 前端：

- 框架：Vue3
- UI：Element-plus

* 语言：TypeScript

- 打包工具：Vite
- 其他：
  - 富文本编辑器：Mavon-Editor next
  - 路由：Vue-Router
  - 图表可视化：Echarts

### 后端：

- 框架：Midway

- 环境：nodeJS

- 缓存：Redis

- 数据库：MySQL

**注意**：后端在另外一个库中[dangdang611/smartText-Midway: 智能资讯平台的 Node 端（Midway） (github.com)](https://github.com/dangdang611/smartText-Midway)

### 算法：

- 语言：Python（不是很成熟）

### 功能点：

- 资讯推送

- 资讯发布、编辑

- 智能标题、摘要生成

- 登录/注册/注销

- 评论

- 点赞

- 关注

- 数据可视化

- 修改信息

- 审核文章（管理端权限）

- ........

### 本地运行：

前后端一样：

`npm install` 安装依赖

`npm run dev ` 运行

`npm run build` 打包

### 提示：

- 项目后台功能禁用部分，尚未开发完成
- 注册部分，利用手机发送验证码接口没有部署上服务器，验证码随便填一个就行
