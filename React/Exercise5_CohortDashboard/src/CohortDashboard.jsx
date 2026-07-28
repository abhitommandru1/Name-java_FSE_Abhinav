// CSS Module: class names below are scoped locally to this component (Vite/CRA rewrite
// `.card` to something like `_card_1a2b3` under the hood), so they can't clash with class
// names used elsewhere in the app.
import styles from './Dashboard.module.css';

const cohorts = [
  { id: 1, name: 'Digital Nurture 5.0 - Java FSE', status: 'Ongoing' },
  { id: 2, name: 'Digital Nurture 4.0 - .NET FSE', status: 'Completed' },
  { id: 3, name: 'Digital Nurture 5.0 - React', status: 'Ongoing' },
];

function statusColor(status) {
  return status === 'Ongoing' ? 'darkorange' : 'seagreen';
}

function CohortDashboard() {
  return (
    <div>
      <h1>Cohort Dashboard</h1>
      {cohorts.map((cohort) => (
        <div key={cohort.id} className={styles.card}>
          <p className={styles.title}>{cohort.name}</p>
          {/* Inline style: dynamic per-row color that can't be expressed as a static CSS class */}
          <p style={{ color: statusColor(cohort.status), fontWeight: 'bold' }}>
            {cohort.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CohortDashboard;
