// Nội dung song ngữ của landing page.
// Sửa thông tin cá nhân ở PROFILE, nội dung hiển thị ở CONTENT.

export type Lang = "vi" | "en";

/** Một chuỗi có 2 bản dịch. */
export type L = { vi: string; en: string };

/** Dùng cho tên công nghệ — giữ nguyên ở cả 2 ngôn ngữ. */
const same = (s: string): L => ({ vi: s, en: s });

// ⚠️ Email / GitHub / LinkedIn để trống sẽ không hiện ở mục Liên hệ.
export const PROFILE = {
  name: "Bùi Nguyễn Thắng",
  birthYear: 1997,
  phone: "0343211997",
  email: "nguyenthang9720@gmail.com",
  facebook: "https://www.facebook.com/nguyenthang9720/",
  github: "",
  linkedin: "",
  location: { vi: "Định Công, Hà Nội", en: "Dinh Cong, Hanoi" } satisfies L,
};

export type SkillGroup = {
  title: L;
  items: L[];
  /** Nhóm trọng tâm — hiển thị nổi bật, chiếm trọn hàng. */
  primary?: boolean;
};

export const SKILLS: SkillGroup[] = [
  {
    // Trọng tâm chính — đặt đầu tiên và làm nổi bật.
    primary: true,
    title: { vi: "C# / .NET — trọng tâm chính", en: "C# / .NET — core focus" },
    items: [
      same("C#"),
      same(".NET 8/9"),
      same("ASP.NET Core"),
      same("Minimal API"),
      same("ABP Framework"),
      same("SignalR"),
      { vi: "async/await & Task", en: "async/await & Task" },
      { vi: "Background worker & hosted service", en: "Background workers & hosted services" },
      { vi: "Dependency injection", en: "Dependency injection" },
      { vi: "Middleware & filter", en: "Middleware & filters" },
    ],
  },
  {
    title: { vi: "Backend & Hệ phân tán", en: "Backend & Distributed Systems" },
    items: [
      same("REST API"),
      same("JWT"),
      same("RabbitMQ"),
      same("Redis"),
      { vi: "Xử lý đồng thời", en: "Concurrency" },
      { vi: "Rate limiting", en: "Rate limiting" },
      { vi: "Xử lý phân tán & cân bằng tải", en: "Distributed processing & load balancing" },
    ],
  },
  {
    title: { vi: "Hiệu năng & Kiến trúc", en: "Performance & Architecture" },
    items: [
      { vi: "Tối ưu hiệu năng API", en: "API performance optimization" },
      { vi: "Chiến lược caching", en: "Caching strategies" },
      { vi: "Thiết kế & tối ưu truy vấn DB", en: "Database modeling & query optimization" },
      { vi: "Thiết kế hệ phân tán", en: "Distributed system design" },
      { vi: "Đồng thời & khả năng mở rộng", en: "Concurrency & scalability" },
      { vi: "High availability & cân bằng tải", en: "High availability and load balancing" },
    ],
  },
  {
    title: { vi: "Cơ sở dữ liệu", en: "Databases" },
    items: ["Cassandra", "ScyllaDB", "MySQL", "MariaDB", "SqlSugar ORM"].map(same),
  },
  {
    title: { vi: "DevOps & Hạ tầng", en: "DevOps & Infrastructure" },
    items: [
      "Docker", "Docker Compose", "Jenkins", "Git",
      "HAProxy", "Nginx", "Traefik", "Linux/Ubuntu", "Certbot",
    ].map(same),
  },
  {
    title: { vi: "Giám sát & Quan trắc", en: "Observability" },
    items: [
      "OpenTelemetry", "Jaeger", "Grafana", "Loki", "Tempo", "Prometheus",
    ].map(same),
  },
  {
    title: { vi: "Tích hợp phần cứng", en: "Hardware Integration" },
    items: [
      { vi: "Máy in nhiệt (ESC/POS)", en: "Thermal printers (ESC/POS)" },
      { vi: "Máy chấm công", en: "Attendance machines" },
      { vi: "Đồng bộ dữ liệu thiết bị", en: "Device data synchronisation" },
      { vi: "Giao tiếp TCP/IP & serial", en: "TCP/IP & serial communication" },
    ],
  },
  {
    title: { vi: "Frontend (bổ trợ)", en: "Frontend (secondary)" },
    items: ["JavaScript", "ReactJS", "React Native"].map(same),
  },
  {
    title: { vi: "Ký số (mảng chuyên biệt)", en: "Digital Signature (niche area)" },
    items: [
      same("PKI / X.509"),
      same("RSA / SHA-256"),
      same("HSM / PKCS#7"),
      { vi: "Ký số PDF & XML (PAdES, TSA)", en: "PDF & XML signing (PAdES, TSA)" },
      same("OpenSSL"),
    ],
  },
];

export type Experience = {
  company: string;
  role: L;
  period: L;
  bullets: L[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "BNNSoft",
    role: { vi: "Lập trình viên .NET", en: ".NET Developer" },
    period: { vi: "2020 — nay", en: "2020 — Present" },
    bullets: [
      {
        vi: "Phát triển và bảo trì các dịch vụ backend .NET (ASP.NET Core, Minimal API, ABP Framework) phục vụ REST API và realtime qua SignalR.",
        en: "Built and maintained .NET backend services (ASP.NET Core, Minimal API, ABP Framework) serving REST APIs and realtime features over SignalR.",
      },
      {
        vi: "Xây dựng luồng xử lý bất đồng bộ với RabbitMQ và background worker; tăng thông lượng bằng caching Redis và rate limiting.",
        en: "Designed asynchronous processing pipelines with RabbitMQ and background workers; improved throughput with Redis caching and rate limiting.",
      },
      {
        vi: "Thiết kế mô hình dữ liệu và tối ưu truy vấn trên Cassandra/ScyllaDB và MySQL/MariaDB cho khối lượng ghi lớn.",
        en: "Modelled data and optimised queries on Cassandra/ScyllaDB and MySQL/MariaDB for write-heavy workloads.",
      },
      {
        vi: "Triển khai chữ ký số PDF (PAdES) với PKI, X.509, HSM, PKCS#7 và TSA.",
        en: "Implemented PDF digital signing (PAdES) using PKI, X.509, HSM, PKCS#7 and TSA.",
      },
      {
        vi: "Vận hành hạ tầng container: Docker Compose, HAProxy/Nginx/Traefik, CI/CD bằng Jenkins trên Linux.",
        en: "Ran containerised infrastructure: Docker Compose, HAProxy/Nginx/Traefik, and Jenkins CI/CD on Linux.",
      },
      {
        vi: "Tích hợp phần cứng: máy in nhiệt (ESC/POS) và máy chấm công — đồng bộ dữ liệu hai chiều giữa thiết bị và hệ thống.",
        en: "Integrated hardware devices: thermal printers (ESC/POS) and attendance machines, syncing data both ways between devices and the system.",
      },
      {
        vi: "Thiết lập observability với OpenTelemetry + Jaeger/Grafana/Loki/Tempo/Prometheus để truy vết và xử lý sự cố production.",
        en: "Set up observability with OpenTelemetry plus Jaeger/Grafana/Loki/Tempo/Prometheus to trace and debug production issues.",
      },
    ],
  },
];

export const CONTENT = {
  nav: {
    about: { vi: "Giới thiệu", en: "About" },
    experience: { vi: "Kinh nghiệm", en: "Experience" },
    projects: { vi: "Dự án", en: "Projects" },
    ai: { vi: "AI", en: "AI" },
    skills: { vi: "Kỹ năng", en: "Skills" },
    contact: { vi: "Liên hệ", en: "Contact" },
  },
  meta: {
    born: { vi: "Sinh năm", en: "Born" },
    based: { vi: "Sống tại", en: "Based in" },
  },
  hero: {
    role: {
      vi: "Lập trình viên Backend · .NET · Làm sản phẩm",
      en: "Backend Developer · .NET · Product",
    },
    level: { vi: "Middle+", en: "Middle+" },
    available: {
      vi: "Sẵn sàng cho cơ hội mới",
      en: "Open to opportunities",
    },
    tagline: {
      vi: "Làm sản phẩm bằng C#/.NET — backend, hệ phân tán và ký số, gắn bó với sản phẩm từ lúc phân tích đến khi chạy thật cho người dùng.",
      en: "Building products with C#/.NET — backend, distributed systems and digital signing, owning each product from analysis through to live users.",
    },
    ctaContact: { vi: "Liên hệ với tôi", en: "Get in touch" },
    ctaSkills: { vi: "Xem kỹ năng", en: "View skills" },
  },
  stats: [
    {
      value: "5+",
      label: { vi: "năm kinh nghiệm", en: "years of experience" },
    },
    {
      value: ".NET 8/9",
      label: { vi: "stack chính", en: "primary stack" },
    },
    {
      value: "6",
      label: { vi: "sản phẩm đã xây dựng", en: "products shipped" },
    },
  ],
  about: {
    heading: { vi: "Tóm tắt chuyên môn", en: "Professional Summary" },
    body: {
      vi: "Lập trình viên .NET với hơn 5 năm kinh nghiệm xây dựng hệ thống backend và hệ phân tán bằng C#/.NET. Kinh nghiệm thực chiến với RESTful API, microservices, xử lý bất đồng bộ, caching, messaging, cơ sở dữ liệu NoSQL/SQL, xác thực, chữ ký số và môi trường container. Làm việc thường xuyên với RabbitMQ, Redis, Cassandra/ScyllaDB, Docker, HAProxy, Nginx, OpenTelemetry và Jenkins.",
      en: ".NET developer with 5+ years of experience building backend and distributed systems using C#/.NET. Solid hands-on experience with RESTful APIs, microservices, asynchronous processing, caching, messaging, NoSQL/SQL databases, authentication, digital signatures, and containerized environments. Regular day-to-day work with RabbitMQ, Redis, Cassandra/ScyllaDB, Docker, HAProxy, Nginx, OpenTelemetry, and Jenkins.",
    },
    body2: {
      vi: "Làm sản phẩm chứ không làm dự án ngắn hạn: gắn bó với cùng một sản phẩm qua nhiều phiên bản, từ phân tích nghiệp vụ, thiết kế, phát triển đến vận hành và hỗ trợ người dùng thật. Có kinh nghiệm thiết kế hệ thống hiệu năng cao, khả năng mở rộng tốt và xử lý sự cố production ở cả tầng ứng dụng, hạ tầng lẫn mạng. Hiện đang đi sâu hơn vào system design, kiến trúc, khả năng mở rộng và ra quyết định kỹ thuật.",
      en: "A product developer rather than a short-term project one: I stay with the same product across many releases, from business analysis and design through development, operations, and supporting real users. Experienced in designing high-performance, scalable systems and troubleshooting production issues across application, infrastructure, and networking layers. Currently going deeper into system design, architecture, scalability, and technical decision-making.",
    },
  },
  experience: {
    heading: { vi: "Kinh nghiệm làm việc", en: "Work Experience" },
    sub: {
      vi: "Gắn bó tại một công ty duy nhất từ 2020 đến nay.",
      en: "One company, from 2020 to the present.",
    },
  },
  projects: {
    heading: { vi: "Dự án tiêu biểu", en: "Key Projects" },
    sub: {
      vi: "Các sản phẩm tôi trực tiếp xây dựng, vận hành và phát triển tiếp tại BNNSoft — tất cả đều đang chạy thật với người dùng.",
      en: "Products I built, operated and kept evolving hands-on at BNNSoft — all of them live with real users.",
    },
  },
  skills: {
    heading: { vi: "Kỹ năng kỹ thuật", en: "Technical Skills" },
    sub: {
      vi: "Công nghệ và lĩnh vực tôi làm việc trực tiếp.",
      en: "Technologies and areas I work with hands-on.",
    },
  },
  ai: {
    heading: {
      vi: "Phát triển với hỗ trợ AI",
      en: "AI-Assisted Development",
    },
    sub: {
      vi: "Tăng năng suất kỹ thuật nhưng vẫn tự kiểm soát kiến trúc và chất lượng code.",
      en: "Engineering productivity, with architecture and code quality still under my control.",
    },
    bullets: [
      {
        vi: "Dùng AI hỗ trợ lập trình để tăng tốc phát triển, debug, refactor, review code và nghiên cứu kỹ thuật.",
        en: "Actively use AI-assisted coding to accelerate development, debugging, refactoring, code review, and technical research.",
      },
      {
        vi: "Sử dụng AI Skills và MCP (Model Context Protocol) để tích hợp AI vào công cụ và quy trình phát triển.",
        en: "Use AI Skills and MCP (Model Context Protocol) to integrate AI with development tools and engineering workflows.",
      },
      {
        vi: "Xây dựng workflow có AI hỗ trợ cho phân tích codebase, viết tài liệu, xử lý sự cố và các tác vụ lặp lại.",
        en: "Build AI-assisted workflows for codebase analysis, documentation, troubleshooting, and repetitive development tasks.",
      },
      {
        vi: "Tận dụng AI để tăng năng suất, nhưng vẫn tự quyết định về kiến trúc, cách triển khai, kiểm thử và chất lượng code.",
        en: "Leverage AI to improve productivity while maintaining control over architecture, implementation, testing, and code quality.",
      },
    ],
    tags: [
      "AI-assisted coding",
      "MCP",
      "AI Skills",
      "Codebase analysis",
      "Code review",
      "Automation",
    ],
  },
  contact: {
    phone: { vi: "Điện thoại", en: "Phone" },
    copied: { vi: "Đã sao chép", en: "Copied" },
    heading: { vi: "Liên hệ", en: "Get in touch" },
    sub: {
      vi: "Cởi mở với cơ hội về backend, hệ phân tán và system design.",
      en: "Open to opportunities in backend, distributed systems and system design.",
    },
    empty: {
      vi: "Chưa cấu hình thông tin liên hệ — điền vào PROFILE trong src/lib/content.ts.",
      en: "No contact details configured yet — fill in PROFILE in src/lib/content.ts.",
    },
  },
  footer: {
    built: { vi: "Xây bằng", en: "Built with" },
  },
} as const;
