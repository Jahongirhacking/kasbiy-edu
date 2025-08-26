import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <Header />
      <main className="min-h-[calc(100vh-4rem)] pt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}