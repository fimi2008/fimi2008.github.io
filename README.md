# Lionxxw 的个人博客

Astro 7 静态站。文章、日常小记、训练手记和 AI 专栏统一使用 Markdown。

## 本地预览

使用 Node.js 24 和 npm。在仓库根目录运行：

```bash
npm ci
npm run dev
npm run check
```

`npm run check` 会构建并检查站点页面、旧 URL 和段落锚点、内部链接、RSS 与站点地图。

## 写作

在 `src/content/entries/` 新增 Markdown。技术文章用 `kind: article`，路径为 `/articles/<slug>/`。日常小记用 `kind: note`，路径为 `/notes/<slug>/`。两类均填写 `title`、`description`、`date` 和 `path`，日期采用带引号的 `"YYYY-MM-DD"`。设置 `draft: true` 可以保存草稿。正式发文前可用真实随记替换预览小记。

训练手记用 `kind: training`，路径为 `/training/<slug>/`，并填写 `activity`（`strength` 撸铁、`running` 长跑、`cycling` 公路车、`hiking` 徒步）。填写同样的标题、摘要、日期和路径，发布后会出现在首页、归档、训练手记和 RSS。

旧文已经迁为 Markdown，保留原 URL 和段落锚点。《Idea 实战汇总》的六张历史截图原本指向本机，仓库中没有图片文件，正文保留了对应位置和原图编号。

## Codex 定时稿件入口

定时任务在本仓库生成或更新 `src/content/entries/<series>-YYYY-MM-DD.md`。`series` 采用 `skills` 或 `weekly`，日期用北京时间的当期统计截止日期。按相同的截止日期重跑会更新同一文件并沿用同一 URL。可直接参照该目录下的两篇样稿：

```yaml
---
title: "标题"
description: "列表页摘要"
date: "2026-11-14"
kind: ai
series: weekly
issue: "2026-11-14"
period:
  start: "2026-11-08"
  end: "2026-11-14"
sources:
  - title: "一手来源名称"
    url: "https://example.org/source"
---
```

- **Skills**：记录平台排名、统计窗口、可验证的安装量、用途和 Codex 命令。若来源只有滚动 24 小时数据，`start` 和 `end` 填查询日，并在正文写清统计窗口。
- **前沿技术**：用「GitHub 热榜」和「最近 AI 动态」两个小节。热榜记录查询日期和增量口径，动态标注实际发布日期及原始来源。
- 可以加入「值得试一个」，给出可复现的短任务。只记录亲自验证过的结果。取不到数据时省略对应条目。定时稿件可直接使用默认样稿标记 `sample: false`，两篇预览样稿显式设置了 `sample: true`。
- 写稿后运行 `npm ci` 和 `npm run check`，通过后提交。推荐在定时工作流分支创建 PR，或者按已授权的发布策略提交到默认分支。每期 URL 和 RSS 由 Astro 自动生成。

## GitHub Pages 发布

正式切换时在仓库 Settings → Pages 中选择 **GitHub Actions** 作为构建来源。工作流在 PR 和分支推送时构建检查，只有默认分支的推送或手动运行才部署，使用现有 `fimi2008.github.io` 域名。预览阶段在独立本地分支运行。
