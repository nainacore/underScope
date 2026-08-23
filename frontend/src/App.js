import React from "react";
import "@/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Discover from "@/pages/Discover";
import Companies from "@/pages/Companies";
import Company from "@/pages/Company";
import Watchlist from "@/pages/Watchlist";
import Compare from "@/pages/Compare";
import ScenarioLab from "@/pages/ScenarioLab";
import Investigations from "@/pages/Investigations";
import Research from "@/pages/Research";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:ticker" element={<Company />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/scenario-lab" element={<ScenarioLab />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/research" element={<Research />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
