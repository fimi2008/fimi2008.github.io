---
title: "Agent 系统设计 08｜MCP 服务怎样接入、授权和运维？"
description: "把 MCP 接入当成能力生命周期管理，覆盖注册、发现、凭据、变更和下线。"
date: "2026-11-28"
kind: article
series: agent-design
path: "/articles/agent-design-08/"
---

财务系统提供一个 MCP 服务，第一版只有查单，后来加了提交和撤销。连接配置可以沿用，新增的两个动作却影响真实业务。平台什么时候同步工具列表，哪些 Agent 可以看见写入工具，以及调用时用谁的身份，都需要定义清楚。

## 把服务登记和工具启用分开

<figure class="article-figure agent-diagram">
  <ol role="list" aria-label="外部 MCP 服务从接入到下线">
    <li><strong>注册与探测</strong>保存负责人、连接配置和支持能力</li>
    <li><strong>发现与启用</strong>同步工具描述，审核后按用途绑定</li>
    <li><strong>调用与运维</strong>解析凭据、重新鉴权并记录健康状态</li>
    <li><strong>变更与退役</strong>检查 schema 变化，处理在途任务</li>
  </ol>
  <figcaption>图 8 · 连接已建立、工具已发布、用户可以执行是三个需要分别管理的状态。</figcaption>
</figure>

MCP 连接初始化会协商协议版本和能力。支持工具的服务可以通过 `tools/list` 提供目录、通过 `tools/call` 接收调用，并可声明目录变更通知能力。平台可以把发现的结果保存成待审核的目录版本，再按 Agent 或工作流绑定具体工具。每次执行仍需检查用户权限和当前业务状态。 [MCP 生命周期](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle) · [MCP 工具规范](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)

| 生命周期位置 | 需要记录和验证 |
| --- | --- |
| 登记服务 | 稳定 ID、负责人、环境、连接方式、凭据引用、健康状态 |
| 发布工具目录 | 工具名称、参数与结果约定、读写风险、目录版本 |
| 绑定能力 | 使用方、允许操作、审批要求和默认限额 |
| 执行调用 | 当前用户、所用授权、工具版本、超时和调用回执 |

## 凭据有自己的生命周期

需要代表用户访问个人报销单时，可以采用用户委派授权。后台同步等服务自身的任务可以采用权限范围明确的服务身份。凭据由运行时按用途取用，模型收到的是工具定义和调用结果。远端 HTTP 服务采用 MCP 授权机制时，按规范处理目标资源、令牌受众、过期和范围不足等情况。 [MCP 授权规范](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

## 工具变更时给在途任务一个出口

目录同步后先比较参数、输出和副作用变化。比如提交接口新增必填的项目编码，旧 SOP 可能需要重新绑定或校验。常规变更可以先用测试环境验证，保留可用的版本直到任务切换。服务下线时停止接受新任务，为在途调用留出收尾或交接路径。遇到授权撤销则实时拦截，即使本轮已加载旧目录。

运行日志要区分服务不可达、凭据失效、参数不兼容和业务拒绝。四种情况都可能显示“调用失败”，但修复动作分别是恢复服务、重新授权、更新绑定和补齐业务条件。

[上一篇：怎样设计一个模型能正确调用的工具？](/articles/agent-design-07/) · [专栏目录](/ai/agent-design/) · [下一篇：工具超时了，业务动作到底做没做？](/articles/agent-design-09/)
