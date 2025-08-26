export interface JobRequirement {
  _id: string;
  title: string;
  description: string;
  nqfLevel: number;
  requiredSkills: string[];
  certificates: string[];
  experienceYears: number;
  healthRestrictions?: string[];
  professionalStandards: string;
  relatedInstitutions: string[];
  detailedRequirements: {
    education: string[];
    technical: string[];
    soft: string[];
    physical: string[];
  };
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  workingConditions: string[];
  careerProgression: string[];
}

const getTranslatedJobs = (t: any) => {
  return [
    {
      _id: "1",
      title: t("data.jobs.softwareDeveloper.title"),
      description: t("data.jobs.softwareDeveloper.description"),
      nqfLevel: 6,
      requiredSkills: t("data.jobs.softwareDeveloper.requiredSkills", {
        returnObjects: true,
      }) as string[],
      certificates: t("data.jobs.softwareDeveloper.certificates", {
        returnObjects: true,
      }) as string[],
      experienceYears: 2,
      professionalStandards: "IT Professional Standards v2.1",
      relatedInstitutions: ["1", "2"],
      detailedRequirements: {
        education: [
          "Bachelor's degree in Computer Science, Software Engineering, or related field",
          "Strong foundation in mathematics and algorithms",
          "Knowledge of software development lifecycle",
        ],
        technical: [
          "Proficiency in at least 2 programming languages (Java, Python, C#, JavaScript)",
          "Experience with version control systems (Git)",
          "Understanding of database design and SQL",
          "Knowledge of web technologies (HTML, CSS, REST APIs)",
          "Familiarity with software testing methodologies",
        ],
        soft: [
          "Strong analytical and problem-solving skills",
          "Excellent communication and teamwork abilities",
          "Attention to detail and quality",
          "Ability to work under pressure and meet deadlines",
          "Continuous learning mindset",
        ],
        physical: [
          "Ability to work at computer for extended periods",
          "Good visual acuity for detailed work",
          "Manual dexterity for typing and mouse operation",
        ],
      },
      salaryRange: {
        min: 8000000,
        max: 20000000,
        currency: "UZS",
      },
      workingConditions: [
        "Office environment with modern equipment",
        "Flexible working hours (9:00-18:00 or 10:00-19:00)",
        "Remote work options available",
        "Air-conditioned workspace",
        "Ergonomic workstation setup",
      ],
      careerProgression: [
        "Junior Developer → Mid-level Developer (2-3 years)",
        "Mid-level → Senior Developer (3-5 years)",
        "Senior Developer → Team Lead/Architect (5+ years)",
        "Specialization paths: Full-stack, Backend, Frontend, DevOps",
      ],
    },
    {
      _id: "2",
      title: t("data.jobs.mechanicalEngineer.title"),
      description: t("data.jobs.mechanicalEngineer.description"),
      nqfLevel: 7,
      requiredSkills: t("data.jobs.mechanicalEngineer.requiredSkills", {
        returnObjects: true,
      }) as string[],
      certificates: t("data.jobs.mechanicalEngineer.certificates", {
        returnObjects: true,
      }) as string[],
      experienceYears: 3,
      healthRestrictions: [
        "No color blindness for technical drawings",
        "Good physical condition for site visits",
      ],
      professionalStandards: "Engineering Professional Standards v3.0",
      relatedInstitutions: ["1", "3"],
      detailedRequirements: {
        education: [
          "Bachelor's degree in Mechanical Engineering",
          "Strong foundation in mathematics, physics, and materials science",
          "Knowledge of thermodynamics and fluid mechanics",
        ],
        technical: [
          "Proficiency in CAD software (AutoCAD, SolidWorks, Inventor)",
          "Understanding of manufacturing processes",
          "Knowledge of quality control and testing procedures",
          "Familiarity with project management tools",
          "Experience with technical documentation",
        ],
        soft: [
          "Strong analytical and problem-solving abilities",
          "Excellent project management skills",
          "Leadership and team coordination capabilities",
          "Effective communication with technical and non-technical stakeholders",
          "Innovation and creative thinking",
        ],
        physical: [
          "Ability to visit manufacturing sites and construction areas",
          "Good vision for detailed technical work",
          "Physical stamina for site inspections",
          "No restrictions for working in industrial environments",
        ],
      },
      salaryRange: {
        min: 12000000,
        max: 25000000,
        currency: "UZS",
      },
      workingConditions: [
        "Office and field work combination",
        "Standard working hours with occasional overtime",
        "Safety equipment provided for site visits",
        "Modern engineering software and tools",
        "Collaborative team environment",
      ],
      careerProgression: [
        "Junior Engineer → Mechanical Engineer (2-3 years)",
        "Mechanical Engineer → Senior Engineer (4-6 years)",
        "Senior Engineer → Lead Engineer/Manager (6+ years)",
        "Specialization: Design, Manufacturing, Quality, R&D",
      ],
    },
    {
      _id: "3",
      title: t("data.jobs.tourismManager.title"),
      description: t("data.jobs.tourismManager.description"),
      nqfLevel: 5,
      requiredSkills: t("data.jobs.tourismManager.requiredSkills", {
        returnObjects: true,
      }) as string[],
      certificates: t("data.jobs.tourismManager.certificates", {
        returnObjects: true,
      }) as string[],
      experienceYears: 1,
      professionalStandards: "Tourism Industry Standards v1.5",
      relatedInstitutions: ["2"],
      detailedRequirements: {
        education: [
          "Bachelor's degree in Tourism, Hospitality, or Business Administration",
          "Knowledge of tourism geography and cultural heritage",
          "Understanding of hospitality industry operations",
        ],
        technical: [
          "Proficiency in tourism management software",
          "Knowledge of booking systems and reservation platforms",
          "Understanding of travel regulations and visa requirements",
          "Experience with social media and digital marketing",
          "Basic accounting and financial management skills",
        ],
        soft: [
          "Excellent customer service and interpersonal skills",
          "Strong organizational and multitasking abilities",
          "Cultural sensitivity and adaptability",
          "Problem-solving and crisis management skills",
          "Leadership and team management capabilities",
        ],
        physical: [
          "Ability to work flexible hours including weekends and holidays",
          "Physical stamina for long working days during peak seasons",
          "Ability to travel and accompany tour groups",
          "Good health for outdoor activities and site visits",
        ],
      },
      salaryRange: {
        min: 6000000,
        max: 15000000,
        currency: "UZS",
      },
      workingConditions: [
        "Office and field work in tourism locations",
        "Flexible schedule based on tourist seasons",
        "Interaction with international clients",
        "Travel opportunities within Uzbekistan",
        "Dynamic and multicultural work environment",
      ],
      careerProgression: [
        "Tourism Coordinator → Tourism Manager (1-2 years)",
        "Tourism Manager → Senior Manager (3-4 years)",
        "Senior Manager → Regional Director (5+ years)",
        "Specialization: Cultural Tourism, Adventure Tourism, Business Tourism",
      ],
    },
  ];
};

// Description: Get all job requirements
// Endpoint: GET /api/jobs
// Request: { filters?: { nqfLevel?: number, skills?: string[] } }
// Response: { jobs: JobRequirement[] }
export const getJobRequirements = (filters?: any, t?: any) => {
  console.log("Fetching job requirements with filters:", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jobs: t ? getTranslatedJobs(t) : [],
      });
    }, 600);
  });
};

// Description: Get job requirement by ID
// Endpoint: GET /api/jobs/:id
// Request: { id: string }
// Response: { job: JobRequirement }
export const getJobRequirementById = (id: string, t?: any) => {
  console.log("Fetching job requirement by ID:", id);
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobs = t ? getTranslatedJobs(t) : [];
      const job = jobs.find((j) => j._id === id) || jobs[0];
      resolve({
        job,
      });
    }, 400);
  });
};
