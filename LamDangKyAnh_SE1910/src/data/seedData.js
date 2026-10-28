export const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Technology",
    description: "Cutting-edge tech, AI research, software engineering, and smart campus innovation.",
    status: 1
  },
  {
    id: 2,
    name: "Academic & Research",
    description: "Scientific discoveries, syllabus updates, symposiums, and research grants.",
    status: 1
  },
  {
    id: 3,
    name: "Student Life",
    description: "Campus clubs, cultural festivals, student hackathons, and athletic tournaments.",
    status: 1
  },
  {
    id: 4,
    name: "Admissions & Career",
    description: "Internship fairs, global student exchange partnerships, and career recruitment.",
    status: 1
  },
  {
    id: 5,
    name: "Legacy Archives",
    description: "Historic university newsletters and archived administrative notices.",
    status: 0
  }
];

export const INITIAL_NEWS = [
  {
    id: 1,
    title: "FPT University Inaugurates State-of-the-Art AI Research Facility",
    content: "The newly opened Artificial Intelligence Laboratory features high-density compute clusters to empower faculty and student researchers in developing next-generation foundation models and applied robotics.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1,
    tags: ["AI", "Innovation", "FPTU"],
    createdAt: "2026-09-18"
  },
  {
    id: 2,
    title: "Global Student Exchange Program Expands to 15 International Partner Universities",
    content: "Undergraduate students in Software Engineering and Artificial Intelligence majors can now enroll in dual-degree exchange programs across top universities in Japan, Australia, and Western Europe.",
    categoryId: 4,
    createdBy: "Admin",
    status: 1,
    tags: ["Exchange", "Global", "Opportunity"],
    createdAt: "2026-09-22"
  },
  {
    id: 3,
    title: "Annual TechDay Hackathon 2026 Announces Over $20,000 in Prizes",
    content: "Teams of undergraduate developers are challenged to architect full-stack Single Page Applications integrated with Spring Boot REST microservices within 48 continuous coding hours.",
    categoryId: 3,
    createdBy: "Staff",
    status: 1,
    tags: ["Hackathon", "Coding", "Competition"],
    createdAt: "2026-09-26"
  },
  {
    id: 4,
    title: "Breakthrough in Natural Language Processing Published by Faculty Lab",
    content: "Researchers from the Department of Computer Science presented a peer-reviewed methodology for low-resource Southeast Asian language tokenization at a prestigious international AI conference.",
    categoryId: 2,
    createdBy: "Staff",
    status: 1,
    tags: ["Research", "NLP", "Publication"],
    createdAt: "2026-09-29"
  },
  {
    id: 5,
    title: "Draft Guidelines for Winter 2026 Student Internship Portfolios",
    content: "Under internal faculty review: proposed checklist regarding enterprise supervisor appraisals, GitHub evidence audits, and technical project defense criteria.",
    categoryId: 4,
    createdBy: "Staff",
    status: 0,
    tags: ["Internship", "Draft", "Policy"],
    createdAt: "2026-10-01"
  },
  {
    id: 6,
    title: "Campus Smart Solar Grid Achieves 30% Clean Renewable Energy Milestone",
    content: "The university sustainability committee confirmed that solar canopies installed across lecture halls have lowered overall campus carbon emissions significantly this quarter.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1,
    tags: ["GreenEnergy", "Campus", "Sustainability"],
    createdAt: "2026-10-03"
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    username: "Admin",
    fullName: "System Administrator",
    email: "admin@funews.edu.vn",
    role: 1, // 1 = Admin
    status: 1
  },
  {
    id: 2,
    username: "Staff",
    fullName: "Editorial Staff Member",
    email: "staff@funews.edu.vn",
    role: 2, // 2 = Staff
    status: 1
  },
  {
    id: 3,
    username: "kyanh_admin",
    fullName: "Lâm Đăng Kỳ Anh",
    email: "anhldk.ce190574@funews.edu.vn",
    role: 1,
    status: 1
  },
  {
    id: 4,
    username: "alice_editor",
    fullName: "Alice Nguyen",
    email: "alice.nguyen@funews.edu.vn",
    role: 2,
    status: 1
  },
  {
    id: 5,
    username: "robert_archived",
    fullName: "Robert Tran",
    email: "robert.tran@funews.edu.vn",
    role: 2,
    status: 0
  }
];
