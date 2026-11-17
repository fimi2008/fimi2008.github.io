---
title: "Java AI 框架选型调研报告"
description: "对比 Spring AI、Spring AI Alibaba、AgentScope Java 和 LangGraph4j 的发布节奏、社区活跃度与版本基线，并用决策树按技术栈和业务场景选型。"
date: "2026-11-17"
kind: article
path: "/articles/java-ai-framework-selection/"
---

**调研日期**　2026 年 11 月 17 日，北京时间\
**范围**　Spring AI、Spring AI Alibaba、AgentScope Java、LangGraph4j\
**用途**　在既有 Java 技术栈上，为模型接入、Agent 和有状态工作流确定候选方案。

## 架构选型速查

先根据现有 **JDK、Spring Boot、Spring AI 或 LangChain4j 版本**锁定可用的依赖组合，再判断**下一步由业务规则决定，还是由模型根据工具结果决定**。流程出现多个分支、并行汇合、人工暂停或跨进程恢复需求时，再评估是否需要图编排。

| 现有技术栈和场景 | 优先评估 | 架构决策 |
| --- | --- | --- |
| **Spring Boot 3.5、4.0 或 4.1**，做文档问答、摘要、信息抽取、客服助手或少量只读工具调用 | **Spring AI** | Boot 3.5 可评估 Spring AI 1.1.x。Boot 4.0／4.1 可评估 Spring AI 2.0.x。简单顺序由现有 Service 代码组织。 |
| **Spring Boot 3.5 + Spring AI Alibaba 或百炼**，做带分支、人工确认或多个 Agent 的流程 | **Spring AI Alibaba Graph**，按需加 Agent Framework | Graph 可单独用于编排，顺序、并行、路由等 Agent 组合交给 Agent Framework。若只接百炼模型，评估 DashScope 扩展即可。 |
| **已有 LangChain4j**，或 **Boot 4 + Spring AI 2.0.x**，需要 Java 内嵌的有状态流程 | **LangGraph4j** | 先评估 Graph Core 与现有服务的组合。使用 Spring AI 或 LangChain4j 集成模块时，核对该发行版的依赖版本和检查点格式。 |
| **JDK 17+**，工具执行路径因任务而异，需要多轮调查、长会话或动态委派 | **AgentScope Java 2.0.x** | 先验证单 Agent 的工具选择和任务完成率。长任务再评估 Harness 的上下文压缩、会话恢复、工具审批与子 Agent。 |
| **已有 BPMN 或业务流程引擎**，且审批、超时、审计已在该引擎运行 | **沿用现有流程引擎，按需接模型或 Agent** | 在流程节点接入 Spring AI 做提取、总结，或用 AgentScope Java 调查异常。订单、付款、审批等权威状态留在业务系统。 |

版本依据见下文。表中的项目是适用场景示例。

### 选型决策树

[![Java AI 框架选型决策树，根据技术栈、下一步的决策者、审批和恢复需求，选择流程引擎、模型接入和 Agent 框架。](/images/java-ai-framework-selection-tree.png)](/images/java-ai-framework-selection-tree.png)

[查看决策树原图](/images/java-ai-framework-selection-tree.png)

- **业务规则控制流程。** 简单顺序用 Java Service，模型节点用 Spring AI 或已有 SDK。需要人工审批或断点恢复时，由选中的引擎控制节点顺序。已对齐 Boot 3.5、Spring AI 1.1.x 和 Alibaba BOM 的团队可优先评估 Alibaba Graph。其他 JDK 17+ 应用可评估 LangGraph4j Core，并在节点内调用现有模型服务。
- **模型控制工具调用。** 路径不固定时用 AgentScope Java ReAct。只有个别工具需要人工批准，或需要恢复 Agent 自身的会话时，可用 AgentScope Java 2.x Harness。需要跨进程恢复会话时，配置持久化的会话存储。工具少、调用轮次有限的 Spring 应用，也可以先用现有 Spring AI 的 Tool Calling。
- **业务规则与模型都参与。** 组合方式为现有流程引擎、Spring AI Alibaba Graph 或 LangGraph4j Core **加 AgentScope Java**，由图中技术栈分支确定引擎。外层流程负责退款、发布等业务审批和断点，Agent 负责调查或生成建议。若采用 Alibaba Graph 与 AgentScope 2.x 的组合，同进程接入前核对适配器版本，具体限制见「版本和依赖基线」。

跨进程等待审批与故障后续跑都需要持久化流程状态。审批人身份、审批结果和写操作的幂等性由业务系统校验。若现有应用的 JDK 低于 17，可评估升级 JDK 或把 AI 能力部署在独立的 JDK 17+ 服务中。

## GitHub 关注度、更新频率与社区活跃度

Star 是 11 月 17 日采集的快照。活动窗口为 **2026-08-19 至 2026-11-16**，共 90 个完整自然日，按北京时间计算。

| GitHub 主仓库 | Star | GitHub Release 正式／预览 | Maven Central 新增版本 | 默认分支提交／活跃天数 | 新 Issue／同窗关闭 | 合并 PR |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| [Spring AI](https://api.github.com/repos/spring-projects/spring-ai) | 9,653 | 2／3 | 5 | 264／50 | 175／37 | 61 |
| [Spring AI Alibaba](https://api.github.com/repos/alibaba/spring-ai-alibaba) | 11,155 | 0／0 | 1 | 12／4 | 46／9 | 11 |
| [AgentScope Java](https://api.github.com/repos/agentscope-ai/agentscope-java) | 6,390 | 4／1 | 4 | 450／85 | 546／275 | 450 |
| [LangGraph4j](https://api.github.com/repos/langgraph4j/langgraph4j) | 2,112 | 14／4 | 16 | 573／57 | 29／25 | 36 |

- **Spring AI** 在窗口内主要发布 **2.0.x** 正式版与 **2.1.x** 预览版。两个正式 GitHub Release 相隔约两个月，评估 Boot 3 存量应用时应单看 1.1.x 的发版和支持渠道。[GitHub Releases](https://github.com/spring-projects/spring-ai/releases) · [Spring AI 1.1.8 发布公告](https://spring.io/blog/2026/06/12/spring-ai-1-1-8-1-0-9-avaialble-now/)
- **Spring AI Alibaba** 的累计 Star 最多，窗口内主仓库活动较少。GitHub 没有新增 Release，Maven Central 在 9 月 16 日有 `1.1.2.4-security-fix`，BOM、Graph Core 和 Agent Framework 均可查到该版本。DashScope 和其他扩展另有仓库，选型时需分别核对交付的模块。[GitHub Releases](https://github.com/alibaba/spring-ai-alibaba/releases) · [Maven Central Graph Core](https://repo.maven.apache.org/maven2/com/alibaba/cloud/ai/spring-ai-alibaba-graph-core/1.1.2.4-security-fix/) · [Extensions 仓库](https://github.com/spring-ai-alibaba/spring-ai-extensions)
- **AgentScope Java** 在四个项目中有最多的新 Issue 和合并 PR，默认分支在 85 天有提交。窗口内同时维护 2.0.x 和 2.1 预览版，最近的正式 Release 是 11 月 14 日的 **2.0.5**。2.0 文档首页的示例仍标为 2.0.4，升级时把文档与发布说明配合阅读。[2.0.5 发布说明](https://github.com/agentscope-ai/agentscope-java/releases/tag/v2.0.5) · [2.0 文档](https://java.agentscope.io/v2/en/intro)
- **LangGraph4j** 的 Star 和新 Issue 数在四个项目中最少，公开发版最频繁。主线 **1.9.9** 可从 Maven Central 获取。项目将 **1.8.x** 列为 LTS，1.8.28 已有 GitHub Release，本次核查时 Central 的 Core 版 1.8.28 返回 404，已确认可下载的 1.8.x 为 **1.8.27**。[GitHub Releases](https://github.com/langgraph4j/langgraph4j/releases) · [维护分支说明](https://github.com/langgraph4j/langgraph4j#releases) · [Maven Central Core](https://repo.maven.apache.org/maven2/org/bsc/langgraph4j/langgraph4j-core/)

**统计口径。** GitHub Release 按 `published_at` 计数，排除草稿，按预发布标记和 M、RC、Alpha、Beta 等版本后缀区分正式和预览。Central 按版本目录时间统计一个代表性坐标，分别为 `spring-ai-bom`、`spring-ai-alibaba-bom`、`agentscope-core`、`langgraph4j-core`。两个渠道各自计数，同一版本可能在不同日期出现。提交量按默认分支的唯一提交计数，活跃天数按提交者时间戳折算。同窗关闭指在窗口内创建且在窗口内关闭，关闭可能是修复、重复或其他处理，窗口尾部的新 Issue 可被观察的时间也更短。公开仓库数据适合衡量活动量与交付节奏。响应 SLA、支持期限和生产稳定性需要独立验证。[GitHub REST API](https://docs.github.com/en/rest/search/search#search-issues-and-pull-requests)

## 框架特性与可落地项目

| 框架 | 可直接使用的能力 | 项目示例 | 业务系统仍需提供 |
| --- | --- | --- | --- |
| **Spring AI** | `ChatClient` 与模型抽象、流式和结构化输出、Tool Calling、MCP、向量存储与 RAG、会话记忆及可观测性 | 企业知识库问答、合同字段抽取、工单归类、查询订单的客服助手 | 文档权限和检索质量评估、模型输出校验、跨请求长流程的状态与恢复策略。[Spring AI API](https://docs.spring.io/spring-ai/reference/api/) |
| **Spring AI Alibaba** | 基于 Spring AI。Graph 提供条件路由、并行、子图、检查点和人工介入。Agent Framework 提供 `ReactAgent` 与常见组合模式。模型扩展提供 DashScope 接入。 | 售后处置流程、多渠道工单分派、带人工复核的报告生成、已有百炼应用的多 Agent 编排 | 审批身份与权限、检查点存储、执行幂等性。跨库、跨服务的补偿由业务系统实现。[项目概览](https://java2ai.com/en/docs/overview/) · [人工介入](https://www.java2ai.com/en/docs/frameworks/graph-core/examples/human-in-the-loop/) |
| **AgentScope Java** | ReAct 工具循环、工具与 MCP、运行事件与中间件。2.0 的 Harness 还提供工作区、上下文压缩、会话恢复、子 Agent 和工具审批。 | 运维只读诊断助手、企业深度研究助手、跨多个内部系统调查订单异常 | 工具参数和租户访问范围、任务预算、结果验收。模型路径可变，固定业务关口需要由代码或外层流程约束。[AgentScope 2.0 能力](https://java.agentscope.io/v2/en/intro) |
| **LangGraph4j** | Java `StateGraph`、循环、条件边、子图、并行、流式输出、检查点及中断恢复。可接 Spring AI 或 LangChain4j，也可用普通 Java 节点。 | 内容生成与审核、带补查分支的 RAG、可恢复的工单调查、人工确认后的文档发布 | 图状态和存储设计、异常和恢复语义、序列化兼容测试。模型接入和业务工具沿用现有模块。[核心文档](https://langgraph4j.github.io/langgraph4j/1.9/core/core-library/) · [迁移指南](https://langgraph4j.github.io/langgraph4j/1.9/whats-new-v1.9/) |

**两个图框架的直接取舍。** 已经在 Boot 3.5 上使用 Spring AI Alibaba，且需要复用它的 Agent 组合与生态集成时，先评估 Spring AI Alibaba Graph。已经有 Spring AI 或 LangChain4j 服务，只缺一层可独立引入的 Java 图编排时，先评估 LangGraph4j Core。经常跨小时等待审批的项目，两者都应验证持久化存储、进程重启续跑、并发恢复和应用升级后读取旧检查点。聊天记忆保存的是对话上下文，流程检查点还要保存任务进度。

## 版本和依赖基线

| 候选版本线 | 已核对的技术栈 | 对选型的影响 |
| --- | --- | --- |
| **Spring AI 1.1.x／2.0.x** | 公开的 1.1.8 发布基线是 Boot **3.5.15**。官方文档列出 2.0.x 支持 Boot **4.0.x／4.1.x**。 | 存量 Boot 3.5 与新建 Boot 4 分别选对应版本线。跨大版本升级时核对 Starter、工具调用和已有配置。[1.1.8 发布说明](https://spring.io/blog/2026/06/12/spring-ai-1-1-8-1-0-9-avaialble-now/) · [2.0.x 文档](https://docs.spring.io/spring-ai/reference/getting-started.html) · [升级指南](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) |
| **Spring AI Alibaba 1.1.2.x** | `1.1.2.4-security-fix` 的源码基线为 **JDK 17、Boot 3.5.8、Spring AI 1.1.2**。`2.0.0-M1.1` 使用 Boot 4.0.0 和 Spring AI 2.0.0-M1，是里程碑版。 | 已有 Boot 3.5 栈可验证 1.1.2.x 补丁线。Boot 4 项目若有正式版门槛，可先验证其他候选。Spring AI、Alibaba BOM 和 Extensions 的版本应一起核对。[安全修复标签 POM](https://raw.githubusercontent.com/alibaba/spring-ai-alibaba/1.1.2.4-security-fix/pom.xml) · [2.0 里程碑发布说明](https://github.com/alibaba/spring-ai-alibaba/releases/tag/v2.0.0-M1.1) |
| **AgentScope Java 2.0.5** | SDK 源码基线为 **JDK 17**，可作为 Java 或 Spring 应用的一部分接入。Spring AI Alibaba 的 `1.1.2.4-security-fix` 适配器源码声明的是 **AgentScope 1.0.9**。 | AgentScope 2.x 可单独评估。若要与 Alibaba Graph 同进程组合，需要核对具体桥接模块和 API 版本，尤其是从 1.x 升到 2.x。[AgentScope POM](https://github.com/agentscope-ai/agentscope-java/blob/v2.0.5/pom.xml) · [Alibaba 适配器 POM](https://raw.githubusercontent.com/alibaba/spring-ai-alibaba/1.1.2.4-security-fix/spring-boot-starters/spring-ai-alibaba-starter-agentscope/pom.xml) |
| **LangGraph4j 1.9.9／1.8.27 LTS** | **JDK 17+**。1.9.9 的构建基线为 **Spring AI 2.0.1、LangChain4j 1.23.0**，可下载的 1.8.27 也以 **Spring AI 2.0.0** 为基线。 | Boot 3.5 + Spring AI 1.x 可先评估只引入 Core，在节点内调用已有 Java 服务。直接使用现成模型集成模块时，逐个核对 POM。1.8→1.9 要验证流式接口、序列化和已完成任务的检查点行为。[1.9.9 POM](https://github.com/langgraph4j/langgraph4j/blob/v1.9.9/pom.xml) · [1.8.27 POM](https://github.com/langgraph4j/langgraph4j/blob/v1.8.27/pom.xml) · [迁移指南](https://langgraph4j.github.io/langgraph4j/1.9/whats-new-v1.9/) |

表中构建基线来自上游 POM 或官方文档。实际落地以应用的依赖树、启动和集成测试结果为准。

## 架构评审的验证条件

1. **版本与部署。** 记录候选版本、JDK、Boot、模型 SDK、MCP SDK 和存储驱动，核对 BOM 和依赖树。验证当前生产部署方式下可以启动、调用目标模型、使用必要的工具与持久化后端。
2. **流程恢复与业务一致性。** 在等待审批时重启应用，验证能按任务 ID 续跑。重复发送同一审批事件，或模拟外部写操作成功后本地崩溃，验证业务侧只产生一次有效操作。
3. **模型质量、成本与权限。** 使用同一模型和业务样本，记录任务成功率、模型调用次数、P95 延迟和单任务成本。用无权访问、缺少证据、工具超时等用例检查应用的实际结果。
4. **维护与升级。** 为计划采用的模块明确关注哪个发行渠道。需要长期保存的任务状态应测试旧版检查点读取和回滚，并确认所选版本线的维护期限是否符合组织要求。
