// This is the file you edit to change what shows up on the site.
//
// The site is bilingual: every piece of text has an `en` (English) and a
// `zh` (Simplified Chinese) version. When you change one language, remember
// to update the other one too.
//
// - `ui` holds the short interface strings (headings, buttons, loading text).
// - `folders` holds one entry per folder icon on the laptop "desktop".
//   "body" is HTML, so keep using simple tags like <p>, <h3>, <ul>/<li>, <a>.

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
    id: "work-experience",
    icon: "💼",
    label: { en: "Work Experience", zh: "工作经历" },
    body: {
      en: `
      <h3>Project Lead, Full Stack Developer, Cloud Engineer</h3>
      <p>Monash FIT Postgraduate Industry Experience Program, Aug 2025 to Oct 2025</p>
      <ul>
        <li>Led a team of 5 through 3 agile iterations to build and launch a water quality monitoring platform for Victorian swimmers, earning the Student Choice Award among 6 competing teams.</li>
        <li>Architected and deployed the full AWS infrastructure, including EC2, RDS PostgreSQL, S3, and secure domain routing through Route 53 and CloudFront, while maintaining over 99 percent uptime.</li>
        <li>Built the Flask REST API and Vue.js frontend, validated by real world use from more than 5 Victorian residents.</li>
      </ul>

      <h3>Strategy and Marketing Consultant, Project Lead</h3>
      <p>Australian Pesticide Research Network, June 2025 to July 2025</p>
      <ul>
        <li>Led a 6 person team spanning Australia, Malaysia, and the UK to deliver every project milestone 2 days ahead of schedule using structured agile workflows.</li>
        <li>Proposed a redesigned website UX aimed at increasing user engagement and reducing bounce rates for the client's research platform.</li>
        <li>Created and executed the client's first digital campaign, producing video and graphic assets to raise awareness among university students.</li>
      </ul>

      <h3>Full Stack Developer, Internship</h3>
      <p>Bluebottle Digital, Aug 2022 to Nov 2022</p>
      <ul>
        <li>Developed and maintained RESTful APIs that boosted performance for Endota Spa's website.</li>
        <li>Built and deployed a Nearby Store Search feature, making store locations easier for customers to find online.</li>
        <li>Used AWS Lambda serverless architecture to reduce infrastructure overhead and improve scalability.</li>
      </ul>

      <h3>Front End Developer, Internship</h3>
      <p>Thoth Tech Education, Dec 2023 to Mar 2024</p>
      <ul>
        <li>Enhanced dynamic front end components for a Deakin University study platform using Angular and TypeScript, improving performance for thousands of concurrent users.</li>
        <li>Integrated the Numbas API to streamline online exam delivery, reducing test delivery errors for thousands of Deakin students.</li>
        <li>Collaborated with a 3 person agile team, working within a Docker containerized environment to improve long term scalability.</li>
      </ul>
      `,
      zh: `
      <h3>项目负责人 / 全栈开发工程师 / 云工程师</h3>
      <p>莫纳什大学信息技术学院（FIT）研究生行业实践项目，2025年8月 – 2025年10月</p>
      <ul>
        <li>带领 5 人团队完成 3 轮敏捷迭代，为维多利亚州的游泳爱好者打造并上线水质监测平台，在 6 支参赛队伍中荣获“学生选择奖”（Student Choice Award）。</li>
        <li>设计并部署完整的 AWS 基础设施，包括 EC2、RDS PostgreSQL、S3，以及基于 Route 53 和 CloudFront 的安全域名路由，系统可用性保持在 99% 以上。</li>
        <li>开发 Flask REST API 与 Vue.js 前端，并经过 5 位以上维多利亚州居民的真实使用验证。</li>
      </ul>

      <h3>策略与市场营销顾问 / 项目负责人</h3>
      <p>澳大利亚农药研究网络（Australian Pesticide Research Network），2025年6月 – 2025年7月</p>
      <ul>
        <li>带领横跨澳大利亚、马来西亚和英国的 6 人团队，采用结构化敏捷流程，每个项目里程碑均提前 2 天交付。</li>
        <li>为客户的研究平台提出网站用户体验（UX）改版方案，旨在提升用户参与度、降低跳出率。</li>
        <li>策划并执行客户的首次数字营销活动，制作视频与平面素材，提升其在大学生群体中的知名度。</li>
      </ul>

      <h3>全栈开发实习生</h3>
      <p>Bluebottle Digital，2022年8月 – 2022年11月</p>
      <ul>
        <li>开发并维护 RESTful API，提升了 Endota Spa 官网的性能。</li>
        <li>开发并上线“附近门店搜索”功能，让顾客更方便地在线查找门店位置。</li>
        <li>采用 AWS Lambda 无服务器架构，降低基础设施开销并提升可扩展性。</li>
      </ul>

      <h3>前端开发实习生</h3>
      <p>Thoth Tech Education，2023年12月 – 2024年3月</p>
      <ul>
        <li>使用 Angular 和 TypeScript 优化迪肯大学（Deakin University）学习平台的动态前端组件，提升了数千名并发用户的使用体验。</li>
        <li>集成 Numbas API，简化在线考试流程，减少了数千名迪肯大学学生的考试交付错误。</li>
        <li>在 Docker 容器化环境中与 3 人敏捷团队协作，提升系统的长期可扩展性。</li>
      </ul>
      `,
    },
  },
  {
    id: "projects",
    icon: "🗂️",
    label: { en: "Projects", zh: "项目经历" },
    body: {
      en: `
      <h3>Focus Bear, Productivity App for ADHD</h3>
      <p>Monash Innovation Guarantee, July 2025 to Aug 2025</p>
      <ul>
        <li>Led a 9 person cross discipline team through the design thinking process to prototype an improved interface for a productivity app supporting the ADHD community.</li>
        <li>Directed user research and usability testing with over 10 students, using the feedback to refine the UI and core functionality.</li>
        <li>Pitched data driven design recommendations to stakeholders, earning a nomination for the Best Prototype Award.</li>
      </ul>

      <h3>Cloud Computing Projects</h3>
      <p>Monash University, Mar 2025 to June 2025</p>
      <ul>
        <li>Architected a cloud solution on AWS, producing an architecture diagram and justifying decisions on scalability, cost efficiency, and reliability.</li>
        <li>Built a containerized pose detection web service using FastAPI, Docker, and Kubernetes, then tested scalability with Locust load testing.</li>
        <li>Developed a serverless media storage system on AWS with automatic tagging and Lambda functions for efficient file organization.</li>
      </ul>

      <h3>Fridge Management App, Android Application</h3>
      <p>Monash University, July 2024 to Nov 2024</p>
      <ul>
        <li>Developed an Android app in Android Studio to manage household fridge inventory, achieving a High Distinction.</li>
        <li>Designed an intuitive interface that made the app easy and enjoyable to use.</li>
        <li>Presented the concept to peers and staff, winning Most Wanted and Usable App in the class showcase.</li>
      </ul>

      <h3>Monash Merchant Shopping Application</h3>
      <p>Monash University, Mar 2024 to June 2024</p>
      <ul>
        <li>Led the team to build an e commerce website, achieving a high distinction score of 85 out of 100.</li>
        <li>Designed and implemented the shopping cart and checkout features using Python and object oriented principles.</li>
        <li>Organized weekly stand up meetings and kept the team aligned under agile project management.</li>
      </ul>
      `,
      zh: `
      <h3>Focus Bear：面向 ADHD 人群的效率应用</h3>
      <p>莫纳什创新保障计划（Monash Innovation Guarantee），2025年7月 – 2025年8月</p>
      <ul>
        <li>带领 9 人跨学科团队，运用设计思维流程，为服务 ADHD 群体的效率应用设计改进版界面原型。</li>
        <li>主导用户研究与可用性测试，覆盖 10 名以上学生，并根据反馈优化界面与核心功能。</li>
        <li>向利益相关方汇报基于数据的设计建议，获得“最佳原型奖”（Best Prototype Award）提名。</li>
      </ul>

      <h3>云计算项目</h3>
      <p>莫纳什大学，2025年3月 – 2025年6月</p>
      <ul>
        <li>在 AWS 上设计云解决方案，绘制架构图，并从可扩展性、成本效益和可靠性等方面论证设计决策。</li>
        <li>使用 FastAPI、Docker 和 Kubernetes 构建容器化的姿态检测 Web 服务，并通过 Locust 负载测试验证可扩展性。</li>
        <li>在 AWS 上开发无服务器媒体存储系统，借助 Lambda 函数实现自动打标签和高效的文件管理。</li>
      </ul>

      <h3>冰箱管理应用（Android）</h3>
      <p>莫纳什大学，2024年7月 – 2024年11月</p>
      <ul>
        <li>使用 Android Studio 开发家庭冰箱库存管理应用，课程成绩获得 High Distinction（最高等级）。</li>
        <li>设计直观的用户界面，让应用简单易用、体验愉悦。</li>
        <li>向同学和老师展示项目理念，在课堂展示中荣获“最受欢迎与最实用应用”奖。</li>
      </ul>

      <h3>Monash Merchant 购物应用</h3>
      <p>莫纳什大学，2024年3月 – 2024年6月</p>
      <ul>
        <li>带领团队开发电子商务网站，获得 85/100 的 High Distinction 成绩。</li>
        <li>运用 Python 和面向对象原则，设计并实现购物车与结账功能。</li>
        <li>组织每周站会，在敏捷项目管理下保持团队目标一致。</li>
      </ul>
      `,
    },
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
