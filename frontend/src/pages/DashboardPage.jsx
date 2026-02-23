import { useEffect, useState } from 'react';

function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalClients: 0,
    ordersByStatus: [],
    eventsByStatus: []
  });

  useEffect(() => {
    setMetrics({
      totalRevenue: '12500.00',
      totalClients: 28,
      ordersByStatus: [{ status: 'Pending', count: 4 }, { status: 'InProgress', count: 3 }],
      eventsByStatus: [{ status: 'Confirmed', count: 2 }]
    });
  }, []);

  return (
    <section>
      <h2>Dashboard Analytics</h2>
      <div className="cards">
        <article className="card"><strong>Revenue (MXN)</strong><span>${metrics.totalRevenue}</span></article>
        <article className="card"><strong>Total Clients</strong><span>{metrics.totalClients}</span></article>
      </div>
      <h3>Order Status</h3>
      <ul>{metrics.ordersByStatus.map((it) => <li key={it.status}>{it.status}: {it.count}</li>)}</ul>
      <h3>Event Status</h3>
      <ul>{metrics.eventsByStatus.map((it) => <li key={it.status}>{it.status}: {it.count}</li>)}</ul>
    </section>
  );
}

export default DashboardPage;
