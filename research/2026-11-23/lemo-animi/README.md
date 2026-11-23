# 《今天不想洗澡》本机实践

文章：[我用 lemo-animi 做了支小动画，仙人掌先撑了把伞](https://fimi2008.github.io/articles/lemo-animi/)。

2026-11-23，在本机实际安装 lemo-animi 0.1.5，使用 Codex 内置生图、插件的 Python 合成模板、真实乐器采样与 edge-tts 做了一支原创 20 秒动画。本目录保留实际运行文件，便于核对文章里的数字和返工过程。

## 实际产物

| 项目 | 记录 |
| --- | --- |
| 故事 | 小熊浇花，仙人掌撑开小黄伞挡水 |
| 视频 | 20.000 秒、480 帧、1080×1920、24 fps，H.264 + AAC |
| 素材 | 采用 12 张；生成 15 次；3 张各重画 1 次 |
| 素材构成 | 角色 2、背景 3、动作表 4、特写 1、道具 1、效果 1 |
| 声音 | 三句中文旁白、采样配乐、15 条手写 + 4 条步态触发拟音 |
| 第一版经过时间 | 11:39:32 至 11:59:56，含规划、读文档、生图和返工，约 20 分 24 秒 |
| 影片修改 | v1 调整静止片段得到 v2；实际审片自检提交后调整旁白得到 v3 |
| 第三版声音测量 | -14.1 LUFS，-1.8 dBTP，无长时间死寂警告；Agent 未试听 |

片尾最后一句旁白在第三版从 17 秒提前至 15.8 秒。这一修改在真实审片页面提交、由 `review.py wait` 读回，并由 `review.py reply` 回复。**该意见明确标注由 Codex 填写，是制作自检演示；没有冒充人类用户，也没有代点“通过”。**

## 文件

- `tools/film.py`：基于插件生成的真实合成脚本，保留三镜头、动作时间轴、生成素材加载、锚点、阴影、效果和字幕。发布时仅清除了本机插件的绝对路径，保留自动定位插件的逻辑。
- `sound.json`、`cactus-umbrella.srt`：第三版声音安排与字幕。
- `prompts/*.slots.txt`：实际填写的素材槽位；`*_bad_v1.slots.txt` 是举壶与反应第一版的槽位记录。完整风格提示由插件 `animi.py prompt` 构建，不是手写替代。
- `production-log.md`、`session.json`：制作计划、运行时间、实际返工、自检与限制。
- `render-v1.log`、`render-v2.log`、`render-v3.log`、`sound-times.txt`：实际工具输出，影片工作目录的绝对路径替换为 `<film-folder>`。
- `review.notes.json`、`review.replies.json`：审片自检意见及实际回复。
- 博客展示素材在 `public/images/lemo-animi/practice/`，视频在 `public/media/lemo-animi/cactus-umbrella.mp4`。

原始 PNG、全部切图、逐帧渲染文件和运行环境留在本机，没有全量上传博客仓库。文章中的 WebP 是本次实际素材或视频取帧的格式转换；审片截图来自真实运行页面。

## 复做

需要 macOS 或 Linux、ffmpeg、Python 3.11–3.13 或 uv，以及具备生图额度的 Codex。

```sh
codex plugin marketplace add lemomo-ai/lemo-animi
codex plugin add lemo-animi@lemomo-ai
```

新开对话后，把本篇文章里的复做要求交给 Codex，按安装后的 `SKILL.md` 执行。要对照本目录复做，应保留 `tools/film.py` 的目录层级，生成以下原始素材，再按插件的 check、slice、anchors 流程建立 `work/cells` 和 `work/anchors_<prefix>.json`：

| 原始图名 | 提示类型 | 切图前缀 |
| --- | --- | --- |
| char_bear、char_cactus | character | 角色参考，不直接合成 |
| bg_wide、bg_side、bg_close | bg，竖屏 | 不切图 |
| sheet_walk、sheet_pour、sheet_react、sheet_open | sheet8 | walk、pour、react、open |
| close_cactus | sheet4 | close（2×2，4 格） |
| fx_water | fx | water（2×4，8 格，group grid） |
| prop_leaves | prop | leaves（1×3，3 格） |

使用插件 setup.sh 返回的 Python；依次执行旁白生成、`tools/film.py lint`、`sound.py build sound.json`、`tools/film.py`、自检与审片。背景的其他机位引用主背景，动作图引用角色设定，撑伞近景同时引用修正后的开伞动作。重新生图的结果不保证与本文完全相同。

## 署名与许可

**lemo-animi by Lemomo (LemoLab)** · [原项目](https://github.com/lemomo-ai/lemo-animi) · [原许可](https://github.com/lemomo-ai/lemo-animi/blob/main/LICENSE)。

`tools/film.py` 改编自 lemo-animi 的 film_template.py，风格提示与合成工具来自该项目；改动为本片故事、素材、时序、效果和镜头安排。相关衍生代码与模板遵循附带的 [CC BY-NC 4.0 及附加许可](LICENSE-lemo-animi.txt)，不因放入本博客仓库而改成其他许可证。第三方字体、乐器采样和语音服务保留各自条款。
