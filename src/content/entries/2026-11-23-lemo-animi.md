---
title: "我用 lemo-animi 做了支小动画，仙人掌先撑了把伞"
description: "换到这台 Mac，从安装开始实做一遍：20 秒原创动画，12 张素材、15 次生图，记录三处返工和一次审片修改。"
date: "2026-11-23"
kind: article
path: "/articles/lemo-animi/"
---

我之前已经在另一台电脑上跑通过 lemo-animi。这次，我让 Codex 在这台 Mac 上重新安装，换一个自己编的故事，把从生图、返工到审片的过程都留下来。

故事很简单：**小熊给花浇水，轮到仙人掌时，仙人掌自己撑开了一把小黄伞。**

小熊愣了一下。仙人掌在伞下眨眨眼，意思大概是：今天不想洗澡。

做成 20 秒，黏土风格，竖屏，带中文旁白和字幕。下面是这次在本机做出来的片子，文章里的角色、动作图和截图，也都来自这次制作。

<figure class="article-figure">
  <video class="article-film" controls playsinline preload="metadata" width="1080" height="1920" poster="/images/lemo-animi/practice/film-watering.webp">
    <source src="/media/lemo-animi/cactus-umbrella.mp4" type="video/mp4">
    <a href="/media/lemo-animi/cactus-umbrella.mp4">打开这次制作的 20 秒动画</a>
  </video>
  <figcaption>《今天不想洗澡》· 本机制作，1080×1920，24 帧/秒。配有声音，播放时可以打开音量。</figcaption>
</figure>

## 先从安装说起

我最初是在 [Lemomo 的帖子](https://x.com/lemomo_ai/status/2123038832815907084)里看到这个项目的。它是一个给 Codex 和 Claude Code 使用的动画 Skill。用大白话说，就是给 AI 配了一套做动画的方法，让它照着步骤把一支片子做完。

这次实际用的是 Codex，安装命令就是下面两条：

```sh
codex plugin marketplace add lemomo-ai/lemo-animi
codex plugin add lemo-animi@lemomo-ai
```

安装成功，版本是 **0.1.5**。接下来还得准备做片子的环境。

这台电脑已经有 Python 和视频处理工具，不用重新安装。但它仍然要建自己的运行环境，下载配乐用的乐器采样。装完以后，整个环境目录大约占了 **1.7 GB**。第一次使用，这段等待要算进去。

环境检查通过以后，又实际试了本地审片页面需要的端口和在线配音服务，两项都能用，才开始做片。

普通用户不一定要看懂这些工具的名字。把仓库链接交给 Codex，让它按项目说明检查就行。遇到缺少的东西，先补齐；后面做第二支、第三支，就可以继续用已经装好的环境。

## 小熊和仙人掌，是这次现画的

我给小熊安排了黄色背带裤和蓝色水壶。仙人掌住在淡紫色花盆里，手里拿着一把黄色小伞。

先把角色的长相定下来，再画行走、举壶、倒水和撑伞的动作。后面的图片继续参考前面的设定，尽量让同一只小熊从头到尾都长一个样。

<figure class="article-figure">
  <a href="/images/lemo-animi/practice/bear-character.webp"><img src="/images/lemo-animi/practice/bear-character.webp" alt="本次生成的小熊角色设定，黄色背带裤、蓝色水壶，展示正面、四分之三侧面、侧面和背面" width="1800" height="600" loading="lazy"></a>
  <a href="/images/lemo-animi/practice/cactus-character.webp"><img src="/images/lemo-animi/practice/cactus-character.webp" alt="本次生成的仙人掌角色设定，淡紫花盆和折叠的小黄伞" width="1800" height="600" loading="lazy"></a>
  <figcaption>这次生成的两位主角。点击图片可以看大图。</figcaption>
</figure>

花园也画了三个机位：正面看小熊走过来，侧面看它浇水，最后靠近仙人掌，看清楚撑伞后的表情。

这里有个我觉得挺有意思的地方。它会先把这些角色、背景和动作画成图片，再用代码安排图片什么时候出现、动到哪里、停多久。一支短片，就是这样一点点拼起来的。

下面这张图，就是仙人掌从收着伞到撑开伞的动作素材。

<figure class="article-figure">
  <a href="/images/lemo-animi/practice/umbrella-actions.webp"><img src="/images/lemo-animi/practice/umbrella-actions.webp" alt="本次实际生成并使用的八格开伞动作，从举起折叠伞到把伞撑在仙人掌头顶" width="1500" height="1000" loading="lazy"></a>
  <figcaption>最终用上的开伞动作表。生成以后还要切成单独的小图，对齐花盆的位置。</figcaption>
</figure>

整支片子最后用了 **12 张素材**。算上返工，一共做了 **15 次生图**。

从写故事开始，到第一版完整视频出来，制作记录大约是 **20 分钟**。这中间也在读说明、检查图片、调整动作，不能当成每个人都能复现的固定速度。后面的审片、修改和整理文章，还要继续花时间。

## 真正费心的，是这些小地方

第一个问题就出在伞上。

第一版动作里，仙人掌确实把伞打开了，但伞面偏在旁边，头还露在外面。单看图片挺可爱，放进这个故事就不对：它得挡住水，观众才能明白这个笑点。

于是重新画，明确要求伞面盖过头顶两边。下面是这次留下的前后对照。

<figure class="article-figure">
  <div class="article-image-pair">
    <img src="/images/lemo-animi/practice/umbrella-before.webp" alt="第一次生成的开伞动作，伞面偏在仙人掌右侧，没有罩住整个头部" width="384" height="514" loading="lazy">
    <img src="/images/lemo-animi/practice/umbrella-after.webp" alt="修改后实际使用的开伞动作，黄色伞面移到了仙人掌头顶" width="374" height="584" loading="lazy">
  </div>
  <figcaption>左：第一次生成，伞在旁边。右：重新生成以后，伞面罩住头顶。两张都保留了原始素材。</figcaption>
</figure>

第二个问题，是水壶的位置。

小熊原来的倒水动作，壶嘴还在肚子附近。放进画面才发现，伞面比壶嘴高，水得往上飞才能浇到它。

这张也得重画，让小熊真的把水壶举到头顶。举壶动作改了，后面收回水壶、吃惊的动作也要跟着改，不然手和水壶会突然跳到另一个位置。

所以这次三张返工，分别是**开伞、举壶，以及举壶之后的反应**。漂亮的单张图片，到了动画里，还得能接得起来。

第一版视频出来以后，又发现开头举壶停得有点久。我把开场从 7 秒压到 5 秒，早点进入浇水和撑伞。片尾再留一点表情和眨眼，第二版的节奏就比第一版紧了一些。

这些改动，也是我觉得值得自己试一次的原因。实际做的时候，看的都是很具体的事：伞有没有挡住头，水从哪里流出来，角色的脚有没有踩住地面。

## 审片台也实际走了一遍

做完以后，它在本地打开了一个审片页面。可以暂停在某一刻，再写下修改要求，页面会记住时间和对应的镜头。

这次还专门做了一次**制作自检演示**：让 Codex 在页面里留下一条意见，把片尾旁白从第 17 秒提前到第 15.8 秒，让说完以后多留一会儿画面。

这条意见明确标了“由 Codex 填写”，用于测试修改流程。提交以后，脚本实际读到了这条意见，随后修改旁白时间，重新输出了一版。

<figure class="article-figure">
  <a href="/images/lemo-animi/practice/review-selfcheck.webp"><img src="/images/lemo-animi/practice/review-selfcheck.webp" alt="本次本机审片台的真实截图，影片暂停在17秒，右侧保留明确标注由Codex填写的制作自检演示意见" width="1680" height="834" loading="lazy"></a>
  <figcaption>本机审片截图。这条是制作自检演示意见，用来验证提交和修改，未代替本人点击“通过”。</figcaption>
</figure>

这个用法挺适合我。很多要求，空口描述时想不到，看到画面才知道哪里需要停一下、哪里应该快一点。能在那个位置直接留话，比重新组织一大段说明容易。

声音方面，这次实际生成了三句中文旁白、配乐和 19 条动作音效安排，视频也通过了响度和峰值检查。发音、听感和笑点是否合适，仍然要打开声音完整看一遍；不能把脚本检查通过写成“已经听过了”。

## 想照着试，可以直接用这段

如果你也想复做这个故事，可以把下面这段发给装好插件的 Codex：

> 用 lemo-animi 做一支 20 秒的黏土定格动画，竖屏，带中文女声旁白、中文字幕、配乐和动作音效，不要片头片尾。
>
> 故事是小熊拿着蓝色水壶给花浇水，轮到淡紫花盆里的仙人掌时，仙人掌自己撑开一把小黄伞，把水挡住。小熊收回水壶愣了一下，仙人掌在伞下眨眼微笑。
>
> 开伞是笑点，要看清伞面罩住头顶，水从壶嘴向下落在伞上。先做完整版本，中途不需要停下来预览角色，完成后打开审片台。其他制作细节你来决定。

第一次先做这样的小故事，我觉得比较合适。两个角色，一件事，一个结尾。先看自己能不能把想法讲清楚，做出一版以后再改。

给朋友做生日祝福，给自己画的小角色编一段日常，或者把给孩子讲的小故事做出来，都可以从这个规模开始。真正要换的，是故事里那件你在意的小事。

这次做完，我最想留下的就是这几个画面：小熊费劲地举着水壶，仙人掌不慌不忙撑开伞，水滴落在伞上。二十秒，能把这件事讲明白，我就愿意接着做下一支。

---

工具：[lemo-animi](https://github.com/lemomo-ai/lemo-animi)，作者 Lemomo（LemoLab）。影片署名：**lemo-animi by Lemomo (LemoLab)**。

本文配图和视频均来自 2026 年 11 月 23 日的本机制作，未使用官方样片配图。故事及素材清单、提示词和制作记录放在[这次的实践文件中](https://github.com/fimi2008/fimi2008.github.io/tree/master/research/2026-11-23/lemo-animi)。生图消耗以账号额度为准，商用和自媒体变现条件请看项目[当前授权说明](https://github.com/lemomo-ai/lemo-animi/blob/main/LICENSE)。
