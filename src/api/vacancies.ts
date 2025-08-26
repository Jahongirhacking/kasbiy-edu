export interface Vacancy {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  requirements: string[];
  skills: string[];
  experience: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  postedDate: string;
  deadline: string;
}

const getTranslatedVacancies = (t: any) => {
  return [
    {
      _id: "1",
      title: t("data.vacancies.frontendDeveloper.title"),
      company: t("data.vacancies.frontendDeveloper.company"),
      location: "Tashkent",
      type: "full-time" as const,
      requirements: t("data.vacancies.frontendDeveloper.requirements", {
        returnObjects: true,
      }) as string[],
      skills: t("data.vacancies.frontendDeveloper.skills", {
        returnObjects: true,
      }) as string[],
      experience: "2-4 years",
      salary: {
        min: 8000000,
        max: 15000000,
        currency: "UZS",
      },
      contact: {
        email: "hr@techcorp.uz",
        phone: "+998 71 123 4567",
      },
      postedDate: "2024-01-15",
      deadline: "2024-02-15",
    },
    {
      _id: "2",
      title: t("data.vacancies.mechanicalEngineerVacancy.title"),
      company: t("data.vacancies.mechanicalEngineerVacancy.company"),
      location: "Bukhara",
      type: "full-time" as const,
      requirements: t("data.vacancies.mechanicalEngineerVacancy.requirements", {
        returnObjects: true,
      }) as string[],
      skills: t("data.vacancies.mechanicalEngineerVacancy.skills", {
        returnObjects: true,
      }) as string[],
      experience: "3-5 years",
      salary: {
        min: 10000000,
        max: 18000000,
        currency: "UZS",
      },
      contact: {
        email: "careers@industrial.uz",
      },
      postedDate: "2024-01-10",
      deadline: "2024-02-10",
    },
    {
      _id: "3",
      title: t("data.vacancies.tourismCoordinator.title"),
      company: t("data.vacancies.tourismCoordinator.company"),
      location: "Samarkand",
      type: "full-time" as const,
      requirements: t("data.vacancies.tourismCoordinator.requirements", {
        returnObjects: true,
      }) as string[],
      skills: t("data.vacancies.tourismCoordinator.skills", {
        returnObjects: true,
      }) as string[],
      experience: "1-3 years",
      salary: {
        min: 6000000,
        max: 12000000,
        currency: "UZS",
      },
      contact: {
        email: "jobs@silkroadtours.uz",
        phone: "+998 66 234 5678",
      },
      postedDate: "2024-01-20",
      deadline: "2024-02-20",
    },
  ];
};

// Description: Get all job vacancies
// Endpoint: GET /api/vacancies
// Request: { filters?: { type?: string, location?: string } }
// Response: { vacancies: Vacancy[] }
export const getVacancies = (filters?: any, t?: any) => {
  console.log("Fetching vacancies with filters:", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        vacancies: t ? getTranslatedVacancies(t) : [],
      });
    }, 500);
  });
};
