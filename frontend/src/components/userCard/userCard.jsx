import "./userCard.css";
export default function UserCard({ nomUser, ban }) {
  return (
    <div className="user-card">
      <p className="user-card-name">{nomUser}</p>
      <div className="user-card-actions">
        <button className="btn" onClick={ban}>
          ban
        </button>
      </div>
    </div>
  );
}
