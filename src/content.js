// This is the file you edit to change what shows up on the site.
//
// The site is bilingual: every piece of text has an `en` (English) and a
// `zh` (Simplified Chinese) version. When you change one language, remember
// to update the other one too.
//
// - `ui` holds the short interface strings (headings, buttons, loading text).
// - `folders` holds one entry per folder icon on the laptop "desktop".
//   "body" is HTML, so keep using simple tags like <p>, <h3>, <ul>/<li>, <a>.
//   A folder can have a `timeline` instead of (or as well as) a body: a list
//   of entries, newest first, each with date, title, org, highlight and
//   details. They're drawn as a vertical timeline; "details" is hidden
//   behind a "Show details" toggle. To add a new job, add one entry.
//   A timeline entry can also have `photos` (shown under the highlight)
//   and `links` (shown as buttons).
// - A folder can have `projects` (drawn as cards with a cover picture,
//   tags, link buttons and a "Show details" toggle) or `gallery` (a photo
//   wall). Clicking any photo opens it full size.
//
// PHOTOS: put the picture in public/images/ and refer to it with
// img("file-name.jpg"). Don't write "/images/..." by hand: the site lives
// under /Personal-Portfolio/ on GitHub Pages and img() adds that prefix.
// Keep photos about 1600px wide or smaller so the site stays fast.

const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const ui = {
  en: {
    pageTitle: "Lily Lan's Portfolio",
    heading: "Lily Lan's Space",
    welcome: "WELCOME, click on the laptop to explore more...",
    loading: "Loading room... {pct}%",
    loadError: "Could not load model. Check the file path and console for details.",
    backToRoom: "← Back to room",
    close: "Close",
    langToggle: "中文",
    langToggleLabel: "切换到中文",
    showDetails: "Show details",
    minimize: "Minimise",
    powerOff: "Back to room",
    bootText: "Starting up...",
    noteTitle: "Hi, welcome to my laptop!",
    noteBody: "Click a folder to open it. Windows can be dragged around, minimised to the dock, or closed.",
    noteSign: "Lily",
    hideDetails: "Hide details",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
  },
  zh: {
    pageTitle: "Lily Lan 的个人作品集",
    heading: "Lily Lan 的小空间",
    welcome: "欢迎！点击笔记本电脑，探索更多……",
    loading: "房间加载中…… {pct}%",
    loadError: "模型加载失败，请检查文件路径和控制台信息。",
    backToRoom: "← 返回房间",
    close: "关闭",
    langToggle: "EN",
    langToggleLabel: "Switch to English",
    showDetails: "展开详情",
    minimize: "最小化",
    powerOff: "返回房间",
    bootText: "正在启动……",
    noteTitle: "你好，欢迎来到我的电脑！",
    noteBody: "点击文件夹即可打开。窗口可以拖动、最小化到程序坞，或直接关闭。",
    noteSign: "Lily",
    hideDetails: "收起",
    prevPhoto: "上一张",
    nextPhoto: "下一张",
  },
};

export const folders = [
  {
    id: "about-me",
    icon: "🧑‍💻",
    label: { en: "About Me", zh: "关于我" },
    body: {
      en: `
        <p>Hi there! My name is Mengyao Lan, but you can call me Lily. I recently graduated from Monash University with a Master of Information Technology degree. As AI continues to reshape the way we work, I want to combine my technical background with strong soft skills to make a real impact.</p>
        <p>Having lived in Australia for seven years as an international student, I am fluent in both English and Mandarin Chinese, which lets me communicate clearly and bridge the gap between stakeholders from different backgrounds. I am looking for a role where I can grow professionally, learn with a high degree of autonomy, and work in a supporting environment.</p>
        <p>I am currently based in Melbourne, Australia, and open to relocating. Feel free to explore my work experience for more detail.</p>
      `,
      zh: `
        <p>你好！我叫 Mengyao Lan，也可以叫我 Lily。我刚从莫纳什大学（Monash University）信息技术硕士专业毕业。随着 AI 不断重塑我们的工作方式，我希望把技术背景与扎实的软技能结合起来，创造真正的价值。</p>
        <p>我作为国际学生在澳大利亚生活了七年，能流利使用英语和普通话，可以清晰地沟通，在不同背景的利益相关方之间搭建桥梁。我希望找到一个能够持续成长、拥有较高自主学习空间、团队氛围互相支持的岗位。</p>
        <p>我目前居住在澳大利亚墨尔本，也愿意前往其他城市工作。欢迎查看我的工作经历，了解更多详情。</p>
      `,
    },
  },
  {
    id: "education",
    icon: "🎓",
    label: { en: "Education", zh: "教育背景" },
    timeline: [
      {
        date: { en: "Mar 2024 – Dec 2025", zh: "2024年3月 – 2025年12月" },
        title: { en: "Master of Information Technology", zh: "信息技术硕士" },
        org: { en: "Monash University", zh: "莫纳什大学（Monash University）" },
        highlight: { en: "WAM: Distinction · Student Choice Award · Best Prototype nominee", zh: "加权平均成绩：Distinction · 学生选择奖 · 最佳原型奖提名" },
        photos: [
          { src: img("graduation.jpg"), caption: { en: "Graduation day", zh: "毕业典礼" } },
        ],
        details: {
          en: `
            <ul>
              <li>Student Choice Award, Monash FIT Industry Experience Program (2025)</li>
              <li>Best Prototype Award nominee, Monash Innovation Guarantee (2025)</li>
              <li>Most Wanted / Usable App, class showcase (2024)</li>
              <li><a href="https://www.credly.com/badges/608245c9-7ba6-4f78-a2b0-a11b1179883e" target="_blank" rel="noopener">Innovation for Impact badge</a></li>
              <li>Alumni to Student Mentoring Program certificate</li>
              <li>Student volunteer, Orientation Week and Monash Wholefoods</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>莫纳什信息技术学院行业实践项目“学生选择奖”（2025）</li>
              <li>莫纳什创新保障计划“最佳原型奖”提名（2025）</li>
              <li>课堂展示“最受欢迎与最实用应用”奖（2024）</li>
              <li><a href="https://www.credly.com/badges/608245c9-7ba6-4f78-a2b0-a11b1179883e" target="_blank" rel="noopener">Innovation for Impact 徽章</a></li>
              <li>校友导师计划（Alumni to Student Mentoring Program）证书</li>
              <li>迎新周及 Monash Wholefoods 学生志愿者</li>
            </ul>
          `,
        },
      },
      {
        date: { en: "Mar 2020 – Mar 2024", zh: "2020年3月 – 2024年3月" },
        title: { en: "Bachelor of Software Engineering (Honours)", zh: "软件工程荣誉学士" },
        org: { en: "Deakin University", zh: "迪肯大学（Deakin University）" },
        highlight: { en: "Vice-Chancellor's Academic Excellence Scholarship (100% tuition)", zh: "校长学术卓越奖学金（全额学费）" },
        photos: [
          { src: img("deakin-scholars-2023.jpg"), caption: { en: "With Deakin's Vice-Chancellor's scholars, 2023", zh: "与迪肯大学校长奖学金获得者合影，2023" } },
        ],
        details: {
          en: `
            <ul>
              <li>Vice-Chancellor's Academic Excellence Scholarship, covering 100% of tuition</li>
              <li>3rd of 18 projects at the Deakin InnoFes showcase (2022)</li>
              <li>Student Ambassador, Orientation Week and Open Day</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>获得校长学术卓越奖学金，覆盖全部学费</li>
              <li>迪肯大学 InnoFes 创新展 18 个项目中获得第三名（2022）</li>
              <li>迎新周及开放日学生大使</li>
            </ul>
          `,
        },
      },
    ],
  },
  {
    id: "industry-experience",
    icon: "💼",
    label: { en: "Industry Experience", zh: "行业经历" },
    timeline: [
      {
        date: { en: "Aug – Oct 2025", zh: "2025年8月 – 10月" },
        title: { en: "Project Lead & Cloud Engineer · Water Quality Platform", zh: "项目负责人 / 云工程师 · 水质监测平台" },
        org: { en: "Monash FIT Postgraduate Industry Experience Program", zh: "莫纳什大学信息技术学院研究生行业实践项目" },
        highlight: { en: "Student Choice Award among 6 teams · team of 5", zh: "6 支队伍中荣获“学生选择奖” · 5 人团队" },
        photos: [
          { src: img("monash-industry-award-2025.jpg"), caption: { en: "Accepting the Student Choice Award at the expo", zh: "在项目展上领取“学生选择奖”" } },
        ],
        links: [
          { label: { en: "Project portfolio", zh: "项目作品集" }, url: "https://eportfolio.monash.edu/view/view.php?t=6ec52ed7297ec556dedf" },
          { label: { en: "Code (Flask API)", zh: "代码（Flask API）" }, url: "https://github.com/lily-yyyy/The_Mermaids_Flask_API" },
        ],
        details: {
          en: `
            <p><strong>The problem.</strong> Victorians had no simple way to check whether the water at their swimming spots was safe. Our brief was tied to UN Sustainable Development Goal 6, clean water.</p>
            <p><strong>What I did</strong></p>
            <ul>
              <li>Facilitated the team from an open brainstorm to a defined problem, target audience and scope.</li>
              <li>Ran delivery across 3 agile iterations: weekly meetings with agendas and minutes, daily standups, a Kanban board, and tasks matched to each person's strengths.</li>
              <li>Acted as the team's first point of contact for problems across database, backend, frontend and machine learning work.</li>
              <li>Designed and deployed the AWS architecture (EC2, RDS PostgreSQL, S3, Route 53, CloudFront).</li>
              <li>Turned stakeholder criticism of version 1 ("gloomy and hard to understand") into a redesign through Figma prototypes.</li>
            </ul>
            <p><strong>Outcome.</strong> Student Choice Award among 6 teams, the highest class score in 2 of 3 iterations, 99%+ uptime, and real use by 5+ Victorian residents.</p>
          `,
          zh: `
            <p><strong>问题。</strong>维多利亚州居民缺少一个简单的方式来查询游泳地点的水质是否安全。项目主题围绕联合国可持续发展目标 6：清洁饮水。</p>
            <p><strong>我的工作</strong></p>
            <ul>
              <li>带领团队从开放式头脑风暴出发，明确问题定义、目标用户和项目范围。</li>
              <li>主导 3 轮敏捷迭代的交付：组织有议程和会议纪要的周会、每日站会、看板管理，并根据成员特长分配任务。</li>
              <li>作为团队的第一联系人，协助成员解决数据库、后端、前端和机器学习方面的问题。</li>
              <li>设计并部署 AWS 云架构（EC2、RDS PostgreSQL、S3、Route 53、CloudFront）。</li>
              <li>针对利益相关方对第一版“沉闷、难以理解”的批评，通过 Figma 原型主导界面重新设计。</li>
            </ul>
            <p><strong>成果。</strong>在 6 支队伍中荣获“学生选择奖”，3 轮迭代中有 2 轮获得全班最高分，系统可用性 99% 以上，并有 5 位以上维多利亚州居民实际使用。</p>
          `,
        },
      },
      {
        date: { en: "Jul 2025", zh: "2025年7月" },
        title: { en: "Team Lead · Focus Bear", zh: "团队负责人 · Focus Bear" },
        org: { en: "Monash Innovation Guarantee, with industry partner Focus Bear", zh: "莫纳什创新保障计划，行业合作方 Focus Bear" },
        highlight: { en: "Best Prototype Award nominee · team of 9 from 6 disciplines", zh: "“最佳原型奖”提名 · 来自 6 个专业的 9 人团队" },
        photos: [
          { src: img("focus-bear-2025.jpg"), caption: { en: "The Focus Bear team after our final pitch", zh: "Focus Bear 团队在最终路演后合影" } },
        ],
        links: [
          { label: { en: "Pitch deck", zh: "路演幻灯片" }, url: "https://canva.link/53lte3rorlgp7uj" },
        ],
        details: {
          en: `
            <p><strong>The problem.</strong> Focus Bear helps adults with ADHD and autism manage distractions and build routines, but many users quit after a day or two because the nudges felt invasive. The founder's challenge: how can the app nudge adults with ADHD towards productivity without being annoying?</p>
            <p><strong>What I did</strong></p>
            <ul>
              <li>Led a cross-disciplinary team through design thinking, from brief to final pitch in 3 weeks.</li>
              <li>Mapped the root causes of low retention and the stakeholders, from users and competitors to clinicians and employers.</li>
              <li>Directed in-depth interviews and usability testing with 10+ students, and grouped the feedback into underlying problems.</li>
              <li>Pitched redesigned prototypes to Focus Bear's founder.</li>
            </ul>
            <p><strong>What we found.</strong> An overwhelming interface (long onboarding, too many popups), interruptions that broke focus, and features nobody explained. We simplified the modes and redesigned the Start and To-do Player pages.</p>
            <p><strong>Outcome.</strong> Nominated for the Best Prototype Award.</p>
          `,
          zh: `
            <p><strong>问题。</strong>Focus Bear 帮助患有 ADHD 和自闭症的成年人管理干扰、建立日常习惯，但许多用户觉得提醒过于打扰，用一两天就放弃了。创始人提出的挑战是：如何让应用在不惹人烦的前提下，引导 ADHD 成年人提高效率？</p>
            <p><strong>我的工作</strong></p>
            <ul>
              <li>带领跨学科团队运用设计思维，在 3 周内从需求简报推进到最终路演。</li>
              <li>梳理用户留存率低的根本原因，并绘制利益相关方地图，涵盖用户、竞品、临床专家和雇主等。</li>
              <li>主导对 10 名以上学生的深度访谈和可用性测试，并将反馈归纳为核心问题。</li>
              <li>向 Focus Bear 创始人展示重新设计的原型。</li>
            </ul>
            <p><strong>发现。</strong>界面信息过载（引导流程冗长、弹窗过多）、打断专注的干扰，以及缺少说明的功能。我们简化了模式设置，并重新设计了开始页和待办播放页。</p>
            <p><strong>成果。</strong>获得“最佳原型奖”提名。</p>
          `,
        },
      },
      {
        date: { en: "Jun – Jul 2025", zh: "2025年6月 – 7月" },
        title: { en: "Project Lead · Australian Pesticide Research Network", zh: "项目负责人 · 澳大利亚农药研究网络（APRN）" },
        org: { en: "Monash TeaMWork program, remote", zh: "莫纳什 TeaMWork 项目，远程协作" },
        highlight: { en: "Every milestone 2 days early · team of 6 across 3 countries", zh: "所有里程碑提前 2 天完成 · 横跨 3 个国家的 6 人团队" },
        details: {
          en: `
            <p><strong>The problem.</strong> APRN, Australia's peak body for agricultural chemical research, wanted a communication strategy, marketing assets and website recommendations to reach university students.</p>
            <p><strong>What we found.</strong> APRN's channels (a newsletter with 10,000+ followers, LinkedIn, an industry-focused website) weren't reaching students. Students wanted real opportunities, such as projects, research and leadership roles, and spend their time in university clubs and on Instagram.</p>
            <p><strong>What we delivered</strong></p>
            <ul>
              <li>Student project and leadership opportunities, with sample project briefs.</li>
              <li>A promotion strategy built on short videos for Instagram Reels and TikTok.</li>
              <li>Social media assets plus a reusable illustration set and templates.</li>
            </ul>
            <p><strong>Outcome.</strong> Every weekly milestone delivered 2 days early. The outreach strategy became the core of APRN's new student engagement initiative.</p>
          `,
          zh: `
            <p><strong>问题。</strong>APRN 是澳大利亚农业化学品研究领域的权威机构，希望制定传播策略、营销素材和网站优化建议，以更好地触达大学生群体。</p>
            <p><strong>发现。</strong>APRN 现有渠道（拥有 1 万多名订阅者的通讯、领英、面向行业的网站）难以触达学生。学生更希望获得项目、科研和领导力等实际机会，并且主要活跃在大学社团和 Instagram 上。</p>
            <p><strong>交付成果</strong></p>
            <ul>
              <li>面向学生的项目与领导力机会方案，并附示例项目简介。</li>
              <li>以 Instagram Reels 和 TikTok 短视频为核心的推广策略。</li>
              <li>社交媒体素材，以及可重复使用的插画和模板。</li>
            </ul>
            <p><strong>成果。</strong>每周里程碑均提前 2 天交付，外联策略成为 APRN 新学生参与计划的核心。</p>
          `,
        },
      },
      {
        date: { en: "Dec 2023 – Mar 2024", zh: "2023年12月 – 2024年3月" },
        title: { en: "Front End Developer (Internship) · Thoth Tech Education", zh: "前端开发实习生 · Thoth Tech Education" },
        org: { en: "Deakin University's OnTrack learning platform", zh: "迪肯大学 OnTrack 学习平台" },
        highlight: { en: "Numbas API integration for thousands of Deakin students", zh: "为数千名迪肯大学学生集成 Numbas 考试 API" },
        details: {
          en: `
            <ul>
              <li>Integrated the Numbas API into the online exam system, reducing test delivery errors for thousands of Deakin students.</li>
              <li>Enhanced front-end components in Angular and TypeScript, improving page performance under more concurrent users.</li>
              <li>Worked in an agile team of 3 with weekly standups, inside a Docker containerised environment.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>将 Numbas API 集成到在线考试系统，减少了数千名迪肯大学学生的考试交付错误。</li>
              <li>使用 Angular 和 TypeScript 优化前端组件，提升了高并发下的页面性能。</li>
              <li>在 Docker 容器化环境中，与 3 人敏捷团队协作并参加每周站会。</li>
            </ul>
          `,
        },
      },
      {
        date: { en: "Aug – Nov 2022", zh: "2022年8月 – 11月" },
        title: { en: "Full Stack Developer (Internship) · Bluebottle Digital", zh: "全栈开发实习生 · Bluebottle Digital" },
        org: { en: "Client: Endota Spa", zh: "客户：Endota Spa" },
        highlight: { en: "Built the Nearby Store Search feature", zh: "开发“附近门店搜索”功能" },
        details: {
          en: `
            <ul>
              <li>Built and deployed a Nearby Store Search feature, making store locations easier for customers to find.</li>
              <li>Developed and maintained RESTful APIs and used AWS Lambda serverless architecture to cut infrastructure overhead.</li>
              <li>Took part in sprint planning and retrospectives in a cross-functional team, using Git branching and code review.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>开发并上线“附近门店搜索”功能，让顾客更方便地找到门店位置。</li>
              <li>开发和维护 RESTful API，并采用 AWS Lambda 无服务器架构降低基础设施开销。</li>
              <li>在跨职能团队中参与迭代规划和回顾会议，使用 Git 分支管理与代码评审。</li>
            </ul>
          `,
        },
      },
    ],
  },
  {
    id: "projects",
    icon: "🗂️",
    label: { en: "Projects", zh: "项目经历" },
    // Each project becomes a card. `image` is optional: without one the
    // card shows the `icon` on a coloured cover instead.
    projects: [
      {
        icon: "💧",
        image: img("monash-industry-award-2025.jpg"),
        badge: { en: "Student Choice Award", zh: "学生选择奖" },
        title: { en: "Safe Water, Water Quality Platform", zh: "Safe Water 水质监测平台" },
        period: { en: "Monash FIT Industry Experience · Aug – Oct 2025", zh: "莫纳什信息技术学院行业实践项目 · 2025年8月 – 10月" },
        summary: {
          en: "A website that lets Victorians check whether the water at beaches and rivers is safe to swim in. I led the team of 5 and ran the AWS cloud setup.",
          zh: "帮助维多利亚州居民查询海滩和河流水质是否适合游泳的网站。我带领 5 人团队，并负责 AWS 云端部署。",
        },
        tags: ["AWS", "Flask", "PostgreSQL", "Figma"],
        links: [
          { label: { en: "Project portfolio", zh: "项目作品集" }, url: "https://eportfolio.monash.edu/view/view.php?t=6ec52ed7297ec556dedf" },
          { label: { en: "Code", zh: "代码" }, url: "https://github.com/lily-yyyy/The_Mermaids_Flask_API" },
        ],
        details: {
          en: `
            <ul>
              <li>Led the team from an open brainstorm to a defined problem and scope, then through 3 agile iterations.</li>
              <li>Designed and deployed the AWS architecture (EC2, RDS PostgreSQL, S3, Route 53, CloudFront) with 99%+ uptime.</li>
              <li>Turned stakeholder feedback on version 1 into a friendlier redesign through Figma prototypes.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>带领团队从开放式头脑风暴明确问题和范围，并完成 3 轮敏捷迭代。</li>
              <li>设计并部署 AWS 云架构（EC2、RDS PostgreSQL、S3、Route 53、CloudFront），系统可用性 99% 以上。</li>
              <li>根据利益相关方对第一版的反馈，通过 Figma 原型完成更友好的界面重新设计。</li>
            </ul>
          `,
        },
      },
      {
        icon: "🐻",
        image: img("focus-bear-2025.jpg"),
        badge: { en: "Best Prototype nominee", zh: "最佳原型奖提名" },
        title: { en: "Focus Bear, Productivity App for ADHD", zh: "Focus Bear：面向 ADHD 人群的效率应用" },
        period: { en: "Monash Innovation Guarantee · Jul – Aug 2025", zh: "莫纳什创新保障计划 · 2025年7月 – 8月" },
        summary: {
          en: "How can an app nudge adults with ADHD towards productivity without being annoying? I led a 9 person team through user research to a redesigned prototype.",
          zh: "如何让应用在不惹人烦的前提下，引导 ADHD 成年人提高效率？我带领 9 人团队，从用户研究走到重新设计的原型。",
        },
        tags: ["Design thinking", "User research", "Usability testing", "Prototyping"],
        links: [
          { label: { en: "Pitch deck", zh: "路演幻灯片" }, url: "https://canva.link/53lte3rorlgp7uj" },
        ],
        details: {
          en: `
            <ul>
              <li>Led a 9 person cross discipline team through the design thinking process to prototype an improved interface for a productivity app supporting the ADHD community.</li>
              <li>Directed user research and usability testing with over 10 students, using the feedback to refine the UI and core functionality.</li>
              <li>Pitched data driven design recommendations to stakeholders, earning a nomination for the Best Prototype Award.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>带领 9 人跨学科团队，运用设计思维流程，为服务 ADHD 群体的效率应用设计改进版界面原型。</li>
              <li>主导用户研究与可用性测试，覆盖 10 名以上学生，并根据反馈优化界面与核心功能。</li>
              <li>向利益相关方汇报基于数据的设计建议，获得“最佳原型奖”提名。</li>
            </ul>
          `,
        },
      },
      {
        icon: "🐦",
        title: { en: "BirdTag, Serverless Media Storage on AWS", zh: "BirdTag：基于 AWS 的无服务器媒体存储系统" },
        period: { en: "Cloud Computing, Monash University · Mar – Jun 2025", zh: "云计算课程，莫纳什大学 · 2025年3月 – 6月" },
        summary: {
          en: "A group project: upload bird photos, audio and video, have them tagged with the species automatically, then search and manage files by tag.",
          zh: "小组项目：上传鸟类照片、音频和视频，系统自动识别物种并打标签，用户可按标签搜索和管理文件。",
        },
        tags: ["AWS Lambda", "S3", "Cognito", "Docker", "Kubernetes", "FastAPI"],
        links: [
          { label: { en: "Report", zh: "项目报告" }, url: "https://docs.google.com/document/d/1LrEHPnr-UchyzE3DtGyimrYHcVURRy64N6S0G92YaeE/edit?usp=sharing" },
          { label: { en: "Live site (sign-in)", zh: "在线网站（需登录）" }, url: "https://ap-southeast-2vbh9yejbl.auth.ap-southeast-2.amazoncognito.com/login?client_id=6s2r7m3sr0i0m35n9lqaf7ne2l&response_type=token&scope=email+openid+phone&redirect_uri=https://5225birdtags3-01.s3.ap-southeast-2.amazonaws.com/static_frontend/birdtagFrontEnd/public2/pages/homePage.html" },
          { label: { en: "Front-end code", zh: "前端代码" }, url: "https://github.com/5225team144/birdtagFrontEnd" },
        ],
        details: {
          en: `
            <ul>
              <li>Architected a cloud solution on AWS, producing an architecture diagram and justifying decisions on scalability, cost efficiency, and reliability.</li>
              <li>Built a containerized pose detection web service using FastAPI, Docker, and Kubernetes, then tested scalability with Locust load testing.</li>
              <li>Developed a serverless media storage system on AWS with automatic tagging and Lambda functions for efficient file organization.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>在 AWS 上设计云解决方案，绘制架构图，并从可扩展性、成本效益和可靠性等方面论证设计决策。</li>
              <li>使用 FastAPI、Docker 和 Kubernetes 构建容器化的姿态检测 Web 服务，并通过 Locust 负载测试验证可扩展性。</li>
              <li>在 AWS 上开发无服务器媒体存储系统，借助 Lambda 函数实现自动打标签和高效的文件管理。</li>
            </ul>
          `,
        },
      },
      {
        icon: "🧊",
        badge: { en: "Most Wanted & Usable App", zh: "最受欢迎与最实用应用" },
        title: { en: "FridgeFairy, Android Fridge Manager", zh: "FridgeFairy：安卓冰箱管理应用" },
        period: { en: "Android Application Development, Monash · Jul – Nov 2024", zh: "安卓应用开发课程，莫纳什大学 · 2024年7月 – 11月" },
        summary: {
          en: "An Android app for keeping track of what's in your fridge, to cut food waste and make meal planning easier. Graded High Distinction.",
          zh: "记录冰箱里有什么的安卓应用，帮助减少食物浪费、让做饭计划更轻松。课程成绩获得 High Distinction。",
        },
        tags: ["Kotlin", "Jetpack Compose", "Firebase", "Android Studio"],
        links: [
          { label: { en: "Report", zh: "项目报告" }, url: "https://docs.google.com/document/d/18f5ypMy1aqZOnboCWQNs9a7-XXjcUiv1kQt4SNUfXUM/edit?usp=sharing" },
          { label: { en: "Code", zh: "代码" }, url: "https://github.com/WenLiu33/FIT5046_S125_Lab05_G02" },
        ],
        details: {
          en: `
            <ul>
              <li>Developed an Android app in Android Studio to manage household fridge inventory, achieving a High Distinction.</li>
              <li>Designed an intuitive interface that made the app easy and enjoyable to use.</li>
              <li>Presented the concept to peers and staff, winning Most Wanted and Usable App in the class showcase.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>使用 Android Studio 开发家庭冰箱库存管理应用，课程成绩获得 High Distinction（最高等级）。</li>
              <li>设计直观的用户界面，让应用简单易用、体验愉悦。</li>
              <li>向同学和老师展示项目理念，在课堂展示中荣获“最受欢迎与最实用应用”奖。</li>
            </ul>
          `,
        },
      },
      {
        icon: "🛒",
        badge: { en: "High Distinction", zh: "High Distinction" },
        title: { en: "Monash Merchant, Shopping App", zh: "Monash Merchant 购物应用" },
        period: { en: "Monash University · Mar – Jun 2024", zh: "莫纳什大学 · 2024年3月 – 6月" },
        summary: {
          en: "An e-commerce app built as a team, where I led delivery and built the shopping cart and checkout. Scored 85 out of 100.",
          zh: "团队开发的电子商务应用，我负责带领交付，并开发购物车与结账功能，成绩 85/100。",
        },
        tags: ["Python", "OOP", "Agile"],
        details: {
          en: `
            <ul>
              <li>Led the team to build an e commerce website, achieving a high distinction score of 85 out of 100.</li>
              <li>Designed and implemented the shopping cart and checkout features using Python and object oriented principles.</li>
              <li>Organized weekly stand up meetings and kept the team aligned under agile project management.</li>
            </ul>
          `,
          zh: `
            <ul>
              <li>带领团队开发电子商务网站，获得 85/100 的 High Distinction 成绩。</li>
              <li>运用 Python 和面向对象原则，设计并实现购物车与结账功能。</li>
              <li>组织每周站会，在敏捷项目管理下保持团队目标一致。</li>
            </ul>
          `,
        },
      },
    ],
  },
  {
    id: "key-skills",
    icon: "🛠️",
    label: { en: "Key Skills", zh: "核心技能" },
    body: {
      en: `
      <h3>Programming Languages</h3>
      <p>Python, JavaScript, TypeScript, HTML, CSS, C++, SQL</p>

      <h3>Frameworks and Libraries</h3>
      <p>Vue.js, Angular, React, Flask, TensorFlow, Pandas</p>

      <h3>Cloud and Infrastructure</h3>
      <p>AWS (EC2, RDS, S3, Lambda, Route 53, CloudFront), Firebase, Oracle Cloud, Docker, Kubernetes</p>

      <h3>Tools</h3>
      <p>Git, Android Studio, Figma, DBeaver, JUnit, Arduino</p>

      <h3>Soft Skills</h3>
      <p>Leadership, Communication, Team Collaboration, Problem Solving, Critical Thinking, User Centric Design, Project Management, Customer Service</p>
      `,
      zh: `
      <h3>编程语言</h3>
      <p>Python、JavaScript、TypeScript、HTML、CSS、C++、SQL</p>

      <h3>框架与库</h3>
      <p>Vue.js、Angular、React、Flask、TensorFlow、Pandas</p>

      <h3>云与基础设施</h3>
      <p>AWS（EC2、RDS、S3、Lambda、Route 53、CloudFront）、Firebase、Oracle Cloud、Docker、Kubernetes</p>

      <h3>工具</h3>
      <p>Git、Android Studio、Figma、DBeaver、JUnit、Arduino</p>

      <h3>软技能</h3>
      <p>领导力、沟通能力、团队协作、问题解决、批判性思维、以用户为中心的设计、项目管理、客户服务</p>
      `,
    },
  },
  {
    id: "photos",
    icon: "📸",
    label: { en: "Photos", zh: "照片墙" },
    body: {
      en: `<p>Moments from events, awards and the communities I'm part of. Click a photo to see it bigger.</p>`,
      zh: `<p>活动、获奖和社区生活中的一些瞬间。点击照片可查看大图。</p>`,
    },
    // Newest first. Add a photo by adding one line.
    gallery: [
      { src: img("ai-workshop-2026.jpg"), date: { en: "Aug 2026", zh: "2026年8月" }, caption: { en: "Invited to host an AI privacy workshop", zh: "受邀主持 AI 隐私工作坊" } },
      { src: img("women4stem-2026.jpg"), date: { en: "May 2026", zh: "2026年5月" }, caption: { en: "Volunteering at WOMEN4STEM", zh: "在 WOMEN4STEM 活动担任志愿者" } },
      { src: img("networking-2026.jpg"), date: { en: "Mar 2026", zh: "2026年3月" }, caption: { en: "At an industry networking event", zh: "参加行业交流活动" } },
      { src: img("graduation.jpg"), caption: { en: "Graduation day", zh: "毕业典礼" } },
      { src: img("monash-industry-award-2025.jpg"), date: { en: "Oct 2025", zh: "2025年10月" }, caption: { en: "Student Choice Award speech, Monash Industry Experience expo", zh: "莫纳什行业实践项目展：“学生选择奖”获奖发言" } },
      { src: img("datathon-2025.jpg"), date: { en: "Sep 2025", zh: "2025年9月" }, caption: { en: "Event officer at the Monash Data & AI Society Datathon", zh: "担任莫纳什数据与 AI 协会 Datathon 活动干事" } },
      { src: img("focus-bear-2025.jpg"), date: { en: "2025", zh: "2025年" }, caption: { en: "Focus Bear project team, Monash Innovation Guarantee", zh: "Focus Bear 项目团队，莫纳什创新保障计划" } },
      { src: img("deakin-scholars-2023.jpg"), date: { en: "Nov 2023", zh: "2023年11月" }, caption: { en: "Deakin Vice-Chancellor's scholars, 2023", zh: "迪肯大学校长奖学金获得者合影，2023" } },
    ],
  },
  {
    id: "contact-me",
    icon: "✉️",
    label: { en: "Contact Me", zh: "联系我" },
    body: {
      en: `
      <p>Email: <a href="mailto:lily.lan68@outlook.com">lily.lan68@outlook.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/lilymengyao/" target="_blank" rel="noopener">linkedin.com/in/lilymengyao</a></p>
      <p>Based in Melbourne, Australia, open to relocating.</p>
      `,
      zh: `
      <p>邮箱：<a href="mailto:lily.lan68@outlook.com">lily.lan68@outlook.com</a></p>
      <p>领英（LinkedIn）：<a href="https://www.linkedin.com/in/lilymengyao/" target="_blank" rel="noopener">linkedin.com/in/lilymengyao</a></p>
      <p>现居澳大利亚墨尔本，愿意前往其他城市工作。</p>
      `,
    },
  },
];
