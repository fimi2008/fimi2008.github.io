# AI 周稿采集档案 · 2026-11-15 至 2026-11-21

事件日期按 Asia/Shanghai。实际采集在 2026-11-22 09:00 前后进行，公开社区互动和 Skills.sh 累计安装量均注明为采样时数值。11 月 22 日及北京时间截止之后的帖子从本期事实判断中排除。

## 查询与来源

- `query-plan.json` 保存本期目标、独立平台查询、工具版本、运行参数、来源状态与缺口。
- `skills-query.json`、`weekly-query.json` 保存传给 last30days 的计划。两次执行固定上游 ref `f918b496b021fbc4db270ff3442fabf373a4a5f4`，使用 Python 3.13，先预检，再带 `--days 7 --as-of 2026-11-21 --no-browser-cookies --emit=json` 执行。预检为 ready，浏览器 Cookie 读取关闭。
- `skills-discovery.json`、`weekly-discovery.json` 是引擎结构化结果。HN 状态为 ok，Reddit 为 partial。GitHub 事实由已认证 gh 补充核对。引擎线索经日期、实体和一手来源复核后才用于稿件。
- `github-verification.json` 保存官方 README 的核对 ref，以及北京时间目标窗口内的提交 SHA、时间、摘要和 URL。README 引用固定到截止之前的提交。
- `supplemental-sources.json` 保存对稿件有贡献的官方发布、社区原帖和补充说明。

## 连续两周对照

请求的主源快照原样保存在 `github-2026-11-14.json` 和 `github-2026-11-21.json`，每份包裹源 URL 与实际采集时间。两期名义 window_days 都为 7，但相关上期条目有 approx 标记，七天前的精确采样缺失，部分项目实际使用 11 月 9 日基线。因此没有用这些近似增量计算稿件的升温百分比。

替代来源的两列数据统一来自 GitHub Trend，历史页面分别为：

- https://trend.ondo.sh/github/2026-11-14/en.html
- https://trend.ondo.sh/github/2026-11-21/en.html

`ondo-2026-11-14.json` 与 `ondo-2026-11-21.json` 保存从这两个原始历史页面提取的仓库标识、七天新增和可见累计值。`github-comparison.json` 保存选用的九项、变化率计算、累计值补充来源及替代原因。累计值不足的三项来自同一榜源标注截至 11 月 21 日的项目页。主表两个新增列始终使用同一来源。榜源是滚动七天采样，与北京时间完整自然周的截止时刻有差别，正文说明了这一点。

## Skills 安装量

`skills-sh.json` 保存累计榜可见行。`skill-details.json`、`skillevaluator-registry.json` 与 `browser-followup.json` 含单个技能的详情、舍入安装量和观察时间。上期 Skills.sh 采样发生在 11 月 14 日约 15:17，本期为 11 月 22 日约 09:00，两次相隔约八天，且多个数值舍入，所以只列带时间的累计量。

## 社区样本

`browser-discovery.json`、`browser-followup.json`、`social-followup.json` 和 `x-broad-search.json` 保存公开检索所得的相关条目与状态。X 部分结果实际在本期截止之后，按帖子时间排除。X 仅保留一条期内设计工具原帖作为有限样本。抖音先遇到空页面，换广义关键词后成功读取搜索结果，再打开原视频核对 11 月 21 日 10:01 的发布时间。`reddit-audioghost.json` 保存作者帖的绝对日期及采样互动，省略了无关推荐内容。

文章中的实验步骤是读者可执行的验证方案。本次运行完成的是采集、源码与文档核对、构建与发布检查，工具产品的运行效果未写作本次实测。档案只包含公开来源数据和必要摘要。
