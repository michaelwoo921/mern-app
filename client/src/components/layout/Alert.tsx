import { useSelector } from 'react-redux';

function Alert() {
  const alerts = useSelector((state: any) => state.alert);
  return (
    <div className="alert-wrapper">
      {alerts.map((alert: any) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );
}

export default Alert;
