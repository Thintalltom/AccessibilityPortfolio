import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { CaseStudy } from "./pages/CaseStudy";
import { ComponentLibrary } from "./pages/ComponentLibrary";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Writing } from "./pages/Writing";
import { Contact } from "./pages/Contact";
import { AccessibilityStatement } from "./pages/AccessibilityStatement";
import { Privacy } from "./pages/Privacy";
import { NotFound } from "./pages/NotFound";
import { AccessibilityOverview } from "./pages/accessibility/AccessibilityOverview";
import { LabHome } from "./pages/accessibility/LabHome";
import { LabModule } from "./pages/accessibility/LabModule";
import { AuditsIndex } from "./pages/accessibility/AuditsIndex";
import { AuditReport } from "./pages/accessibility/AuditReport";
import { Remediation } from "./pages/accessibility/Remediation";
import { PerformanceOverview } from "./pages/performance/PerformanceOverview";
import { PerformanceLab } from "./pages/performance/PerformanceLab";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/accessible-component-library" element={<ComponentLibrary />} />
          <Route path="projects/:slug" element={<CaseStudy />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="writing" element={<Writing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="privacy" element={<Privacy />} />

          <Route path="accessibility" element={<AccessibilityOverview />} />
          <Route path="accessibility/lab" element={<LabHome />} />
          <Route path="accessibility/lab/forms" element={<LabModule moduleId="forms" />} />
          <Route path="accessibility/lab/navigation" element={<LabModule moduleId="navigation" />} />
          <Route path="accessibility/lab/dialogs" element={<LabModule moduleId="dialogs" />} />
          <Route path="accessibility/lab/semantics" element={<LabModule moduleId="semantics" />} />
          <Route path="accessibility/audits" element={<AuditsIndex />} />
          <Route path="accessibility/audits/booking-app" element={<AuditReport />} />
          <Route path="accessibility/remediation" element={<Remediation />} />

          <Route path="performance" element={<PerformanceOverview />} />
          <Route path="performance/lab" element={<PerformanceLab />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}