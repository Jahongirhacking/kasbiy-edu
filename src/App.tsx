import { Layout } from "@/components/Layout"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BlankPage } from "@/pages/BlankPage"
import { SearchPage } from "@/pages/SearchPage"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import './i18n'
import { CentersPage, CertificatesPage, ClassifiersPage, CouncilsPage, HomePage, InstitutionProfilePage, InstitutionsPage, JobRequirementsPage, MapPage, ProgramsPage, SchoolsPage, VacanciesPage } from "./pages"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/institutions" element={<InstitutionsPage />} />
            <Route path="/institutions/:id" element={<InstitutionProfilePage />} />
            <Route path="/job-requirements" element={<JobRequirementsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/classifiers" element={<ClassifiersPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/councils" element={<CouncilsPage />} />
            <Route path="/centers" element={<CentersPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
          </Route>
          <Route path="*" element={<BlankPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App