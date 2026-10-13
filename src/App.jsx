import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout.jsx"
import { About } from "./pages/About.jsx"
import { Building } from "./pages/Building.jsx"
import { Home } from "./pages/Home.jsx"
import { Portal } from "./pages/Portal.jsx"
import { Inquire } from "./pages/Inquire.jsx"
import { Neighborhood } from "./pages/Neighborhood.jsx"
import { NotFound } from "./pages/NotFound.jsx"
import { Privacy } from "./pages/Privacy.jsx"
import { Terms } from "./pages/Terms.jsx"
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Building />} />
        <Route path="building" element={<Navigate to="/about" replace />} />
        <Route path="neighborhood" element={<Neighborhood />} />
        <Route path="resident-portal" element={<About />} />
        <Route path="portal" element={<Portal />} />
        <Route path="inquire" element={<Inquire />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
