export interface Program {
  _id: string;
  name: string;
  specialization: string;
  duration: number;
  nqfLevel: number;
  curriculum: string[];
  institutions: string[];
  admissionRequirements: string[];
  fees?: {
    contract: number;
    grants: number;
  };
}

const getTranslatedPrograms = (t: any) => {
  return [
    {
      _id: "1",
      name: t("data.programs.computerScience.name"),
      specialization: t("data.programs.computerScience.specialization"),
      duration: 4,
      nqfLevel: 6,
      curriculum: t("data.programs.computerScience.curriculum", {
        returnObjects: true,
      }) as string[],
      institutions: ["1"],
      admissionRequirements: t(
        "data.programs.computerScience.admissionRequirements",
        { returnObjects: true }
      ) as string[],
      fees: {
        contract: 15000000,
        grants: 50,
      },
    },
    {
      _id: "2",
      name: t("data.programs.mechanicalEngineering.name"),
      specialization: t("data.programs.mechanicalEngineering.specialization"),
      duration: 4,
      nqfLevel: 7,
      curriculum: t("data.programs.mechanicalEngineering.curriculum", {
        returnObjects: true,
      }) as string[],
      institutions: ["1", "3"],
      admissionRequirements: t(
        "data.programs.mechanicalEngineering.admissionRequirements",
        { returnObjects: true }
      ) as string[],
      fees: {
        contract: 18000000,
        grants: 30,
      },
    },
    {
      _id: "3",
      name: t("data.programs.tourismManagement.name"),
      specialization: t("data.programs.tourismManagement.specialization"),
      duration: 3,
      nqfLevel: 5,
      curriculum: t("data.programs.tourismManagement.curriculum", {
        returnObjects: true,
      }) as string[],
      institutions: ["2"],
      admissionRequirements: t(
        "data.programs.tourismManagement.admissionRequirements",
        { returnObjects: true }
      ) as string[],
      fees: {
        contract: 12000000,
        grants: 25,
      },
    },
  ];
};

// Description: Get all educational programs
// Endpoint: GET /api/programs
// Request: { filters?: { specialization?: string, nqfLevel?: number } }
// Response: { programs: Program[] }
export const getPrograms = (filters?: any, t?: any) => {
  console.log("Fetching programs with filters:", filters);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        programs: t ? getTranslatedPrograms(t) : [],
      });
    }, 700);
  });
};
