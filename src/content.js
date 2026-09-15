// This is the file you edit to change what shows up when a visitor opens
// your laptop. Each entry becomes one folder icon on the "desktop", and
// "body" is the HTML shown inside the window when that folder is opened.
// Keep using simple tags like <p>, <h3>, <ul>/<li>, and <a> since this is
// dropped straight into the page as HTML.

export const folders = [
  {
    id: "about-me",
    label: "About Me",
    icon: "🧑‍💻",
    body: `
        <p>Hi there! My name is Mengyao Lan, but you can call me Lily. I recently graduated from Monash University with a Master of Information Technology degree. As AI continues to reshape the way we work, I want to combine my technical background with strong soft skills to make a real impact.</p>
        <p>Having lived in Australia for seven years as an international student, I am fluent in both English and Mandarin Chinese, which lets me communicate clearly and bridge the gap between stakeholders from different backgrounds. I am looking for a role where I can grow professionally, learn with a high degree of autonomy, and work in a supporting environment.</p>
        <p>I am currently based in Melbourne, Australia, and open to relocating. Feel free to explore my work experience for more detail.</p>
        `,
  },
  {
    id: "work-experience",
    label: "Work Experience",
    icon: "💼",
    body: `
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
  },
  {
    id: "projects",
    label: "Projects",
    icon: "🗂️",
    body: `
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
  },
  {
    id: "key-skills",
    label: "Key Skills",
    icon: "🛠️",
    body: `
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
  },
  {
    id: "contact-me",
    label: "Contact Me",
    icon: "✉️",
    body: `
      <p>Email: <a href="mailto:lily.lan68@outlook.com">lily.lan68@outlook.com</a></p>
      <p>LinkedIn: <a href="https://www.linkedin.com/in/lilymengyao/" target="_blank" rel="noopener">linkedin.com/in/lilymengyao</a></p>
      <p>Based in Melbourne, Australia, open to relocating.</p>
    `,
  },
];
