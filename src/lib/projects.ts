import type { L } from "./content";

export type Project = {
  /** Mã ngắn hiển thị ở góc thẻ. */
  code: string;
  name: L;
  bullets: L[];
  /** Công nghệ chính — giữ nguyên ở cả 2 ngôn ngữ. */
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    code: "BHXH",
    name: {
      vi: "Hệ thống tích hợp Bảo hiểm xã hội",
      en: "Social Insurance Integration System",
    },
    bullets: [
      {
        vi: "Phát triển dịch vụ ký số tài liệu XML và nộp hồ sơ điện tử lên hệ thống Bảo hiểm xã hội Việt Nam.",
        en: "Developed services for digitally signing XML documents and submitting electronic procedures to the Vietnam Social Security system.",
      },
      {
        vi: "Triển khai ký XML và xác thực bằng chứng thư số.",
        en: "Implemented XML signing and certificate-based authentication.",
      },
      {
        vi: "Tích hợp API nộp và xử lý hồ sơ BHXH.",
        en: "Integrated APIs for submitting and processing BHXH procedures.",
      },
      {
        vi: "Thiết kế luồng xử lý bất đồng bộ bằng RabbitMQ cho lượng yêu cầu lớn.",
        en: "Designed asynchronous processing using RabbitMQ for high-volume requests.",
      },
      {
        vi: "Áp dụng Redis cho caching và quản lý token.",
        en: "Applied Redis for caching and token management.",
      },
      {
        vi: "Làm việc với worker phân tán và cân bằng tải để tăng khả năng mở rộng, độ tin cậy.",
        en: "Worked with distributed workers and load balancing to improve scalability and reliability.",
      },
    ],
    tech: ["XML Signing", "X.509", "RabbitMQ", "Redis", "Distributed Workers", "Load Balancing"],
  },
  {
    code: "CRM",
    name: {
      vi: "Nền tảng quản lý dịch vụ doanh nghiệp",
      en: "Enterprise Service Management Platform",
    },
    bullets: [
      {
        vi: "Phát triển nền tảng CRM quản lý nhiều dịch vụ doanh nghiệp: BHXH, HSM và HĐĐT.",
        en: "Developed a CRM platform managing multiple enterprise services, including BHXH, HSM, and HĐĐT.",
      },
      {
        vi: "Thiết kế kiến trúc quản lý và tích hợp dịch vụ cho nhiều nhà cung cấp bên ngoài.",
        en: "Designed service management and integration architecture for different external providers.",
      },
      {
        vi: "Triển khai xác thực, phân quyền, quản lý token và tích hợp API.",
        en: "Implemented authentication, authorization, token management, and API integrations.",
      },
      {
        vi: "Áp dụng Redis, RabbitMQ và xử lý phân tán để tăng hiệu năng, khả năng mở rộng.",
        en: "Applied Redis, RabbitMQ, and distributed processing to improve system performance and scalability.",
      },
    ],
    tech: ["ABP Framework", "ASP.NET Core", "JWT", "Redis", "RabbitMQ", "REST API"],
  },
  {
    code: "HĐĐT",
    name: {
      vi: "Hệ thống hóa đơn điện tử",
      en: "Electronic Invoice System",
    },
    bullets: [
      {
        vi: "Phát triển dịch vụ hóa đơn điện tử tích hợp với Tổng cục Thuế Việt Nam.",
        en: "Developed electronic invoice services integrated with the Vietnam Tax Authority.",
      },
      {
        vi: "Triển khai ký số XML và ký số PDF.",
        en: "Implemented XML digital signing and PDF digital signing.",
      },
      {
        vi: "Làm việc với PKI, chứng thư X.509, RSA, SHA-256, PKCS#7, HSM, PAdES và TSA.",
        en: "Worked with PKI, X.509 certificates, RSA, SHA-256, PKCS#7, HSM, PAdES, and TSA.",
      },
      {
        vi: "Phát triển API phát hành hóa đơn điện tử và nhận kết quả xử lý từ hệ thống thuế.",
        en: "Developed APIs for submitting electronic invoices and receiving processing results from tax systems.",
      },
      {
        vi: "Tối ưu xử lý bất đồng bộ và khối lượng truy cập đồng thời cao.",
        en: "Optimized asynchronous processing and high-concurrency workloads.",
      },
    ],
    tech: [
      "ASP.NET Core",
      "C#",
      "RabbitMQ",
      "Redis",
      "REST API",
      "PKI / X.509",
      "PAdES / TSA",
    ],
  },
  {
    code: "HRM",
    name: {
      vi: "Hệ thống quản lý nhân sự",
      en: "Human Resource Management System",
    },
    bullets: [
      {
        vi: "Phát triển các chức năng quản lý nhân sự và tích hợp với máy chấm công.",
        en: "Developed HR management functionality and integrated with employee attendance machines.",
      },
      {
        vi: "Triển khai đồng bộ dữ liệu chấm công giữa thiết bị vật lý và hệ thống HRM.",
        en: "Implemented synchronization of attendance data between physical devices and the HRM system.",
      },
      {
        vi: "Phát triển API và background service cho đồng bộ, xử lý dữ liệu.",
        en: "Developed APIs and background services for data synchronization and processing.",
      },
      {
        vi: "Làm việc với lập lịch, xử lý bất đồng bộ và tối ưu cơ sở dữ liệu.",
        en: "Worked with scheduling, asynchronous processing, and database optimization.",
      },
      {
        vi: "Tích hợp máy in nhiệt (ESC/POS) để in phiếu, biểu mẫu trực tiếp từ hệ thống.",
        en: "Integrated thermal printers (ESC/POS) to print slips and forms directly from the system.",
      },
    ],
    tech: [
      "ASP.NET Core",
      "Background Workers",
      "Scheduling",
      "MySQL",
      "REST API",
      "ESC/POS",
      "TCP/IP",
    ],
  },
  {
    code: "HĐĐT-LĐ",
    name: {
      vi: "Nền tảng hợp đồng điện tử",
      en: "Electronic Contract Platform",
    },
    bullets: [
      {
        vi: "Phát triển nền tảng hợp đồng điện tử cho doanh nghiệp và người lao động ký kết trực tuyến: tạo hợp đồng từ file mẫu, mời ký, theo dõi trạng thái từng bên.",
        en: "Built an electronic contract platform for enterprises and employees to sign online: create contracts from templates, invite signers, and track each party's status.",
      },
      {
        vi: "Tích hợp ký số bằng HSM (ký phía server cho doanh nghiệp) và USB token (ký tại máy trạm qua plugin PKCS#11).",
        en: "Integrated digital signing via HSM (server-side signing for the enterprise) and USB token (client-side signing through a PKCS#11 plugin).",
      },
      {
        vi: "Tích hợp VNeID cho người lao động: xác thực định danh và ký hợp đồng bằng chữ ký số cá nhân, không cần thiết bị ký riêng.",
        en: "Integrated VNeID for employees: identity verification and contract signing with a personal digital signature, with no dedicated signing device needed.",
      },
      {
        vi: "Ký XML hoặc ký PDF tùy theo định dạng file mẫu hợp đồng — PAdES cho PDF, XMLDSig cho XML, kèm dấu thời gian TSA.",
        en: "Signs XML or PDF depending on the contract template format — PAdES for PDF, XMLDSig for XML, with TSA timestamping.",
      },
      {
        vi: "Thiết kế luồng ký nhiều bên theo thứ tự, chèn chữ ký lên đúng vị trí và kiểm tra tính toàn vẹn, hiệu lực chứng thư sau mỗi lượt ký.",
        en: "Designed ordered multi-party signing flows, placing signatures at the right position and verifying document integrity and certificate validity after each turn.",
      },
      {
        vi: "Lưu vết đầy đủ quá trình ký và xuất bản chứng cứ để đối chiếu, tra soát về sau.",
        en: "Recorded a full audit trail of the signing process and exported evidence for later verification.",
      },
    ],
    tech: [
      "ASP.NET Core",
      "HSM / PKCS#11",
      "USB Token",
      "VNeID API",
      "PAdES / XMLDSig",
      "TSA",
      "PKI / X.509",
    ],
  },
  {
    code: "VNeID",
    name: {
      vi: "Tích hợp chữ ký số với VNeID",
      en: "Digital Signature Integration with VNeID",
    },
    bullets: [
      {
        vi: "Phát triển chức năng ký số tích hợp với VNeID.",
        en: "Developed digital-signature functionality integrated with VNeID.",
      },
      {
        vi: "Triển khai ký bằng chứng thư số và luồng xử lý tài liệu.",
        en: "Implemented certificate-based signing and document processing workflows.",
      },
      {
        vi: "Làm việc với API chữ ký số và các luồng xác thực an toàn.",
        en: "Worked with digital signature APIs and secure authentication flows.",
      },
      {
        vi: "Tích hợp dịch vụ ký số vào các ứng dụng doanh nghiệp.",
        en: "Integrated signing services into enterprise applications.",
      },
    ],
    tech: ["VNeID API", "X.509", "Digital Signature", "Secure Auth"],
  },
];
