import { Link, Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Mistic MVP</h1>
        <p className="tenant">Tenant-ready Admin</p>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/orders">Orders</Link>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
