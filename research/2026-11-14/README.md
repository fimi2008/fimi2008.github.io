# AI 周稿采集记录 · 2026-11-08 至 2026-11-14

稿件采用北京时间日期。11 月 14 日下午采样，末日后续更新尚未进入本期。采样文件保留 UTC 时间戳，构建时不会把这个目录发布到站点。

| 文件 | 内容与口径 |
| --- | --- |
| [skills-sh.json](skills-sh.json) | ego-browser 从 Skills.sh 累计榜可见部分提取的原始行。安装数是平台舍入后的累计值，本期没有周初快照。 |
| [github-trending.json](github-trending.json) | ego-browser 提取 GitHub Trending 的本周页面记录。快照含累计 Star 和平台显示的本周新增 Star。 |
| [github-commits.json](github-commits.json) | GitHub 插件返回的提交 SHA、原始 URL、日期和提交说明。 |
| [browser-sources.json](browser-sources.json) | 官方发布页与技能详情的标题、原始链接、提取片段与采样时间。 |
| [community-source.json](community-source.json) | Reddit 原帖、作者全文链接及其自报实验的条件和结果。 |
| [skills-query.json](skills-query.json) · [weekly-query.json](weekly-query.json) | 传给 last30days 的两份查询计划。 |
| [skills-discovery.json](skills-discovery.json) · [weekly-discovery.json](weekly-discovery.json) | last30days 结构化输出，含来源状态、日期和线索。 |

last30days 固定在 `f918b496b021fbc4db270ff3442fabf373a4a5f4`，用项目级 Codex 安装。调用参数为 `--days 7 --as-of 2026-11-14 --no-browser-cookies`，另传对应查询计划。引擎检索起点放宽到 11 月 7 日，写稿按 11 月 8 日至 14 日逐条核对事件日期。它成功返回 Hacker News 数据，Skills 查询经过过滤后无结果。Reddit 直连返回 403，使用公开索引查证原帖。GitHub 数据由 GitHub 插件及周榜页面补齐。X 和 YouTube 的公开检索未取得可入稿的本周证据，未启用它们在 last30days 中的直连。程序输出、社区原帖、官方指标各自保留口径。
