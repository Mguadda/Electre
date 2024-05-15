import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriteriaTable from "./Components/CriteriaTable";
import LandingPage from "./Components/LandingPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/criteria" element={<CriteriaTable />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
