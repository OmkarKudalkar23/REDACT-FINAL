import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import FooterEnhanced from "./components/FooterEnhanced";
import Login from "./pages/Login";
import AdminEnhanced from "./pages/AdminEnhanced";
import DashboardEnhancedV3 from "./pages/DashboardEnhancedV3";
import SendMoneyOptimized from "./pages/SendMoneyOptimized";
import TransactionsEnhancedV2 from "./pages/TransactionsEnhancedV2";
import BillsPage from "./pages/BillsPage";
import CardsPageEnhanced from "./pages/CardsPageEnhanced";
import InvestmentsPageEnhanced from "./pages/InvestmentsPageEnhanced";
import SettingsPage from "./pages/SettingsPage";
import Search from "./pages/Search";

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
        <Route path="/admin" element={<AdminEnhanced />} />
        <Route path="/dashboard" element={<DashboardEnhancedV3 />} />
        <Route path="/send-money" element={<SendMoneyOptimized />} />
        <Route path="/transactions" element={<TransactionsEnhancedV2 />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/cards" element={<CardsPageEnhanced />} />
        <Route path="/investments" element={<InvestmentsPageEnhanced />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
