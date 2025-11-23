import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import FooterEnhanced from "./components/FooterEnhanced";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DashboardEnhanced from "./pages/DashboardEnhanced";
import SendMoneyEnhanced from "./pages/SendMoneyEnhanced";
import TransactionsEnhanced from "./pages/TransactionsEnhanced";
import BillsPage from "./pages/BillsPage";
import CardsPage from "./pages/CardsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="relative min-h-screen w-screen overflow-x-hidden">
              <NavBar />
              <Hero />
              <About />
              <Features />
              <Story />
              <Contact />
              <FooterEnhanced />
            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<DashboardEnhanced />} />
        <Route path="/send-money" element={<SendMoneyEnhanced />} />
        <Route path="/transactions" element={<TransactionsEnhanced />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
