export default function UserCard({ nomUser, ban }) {
  return (
    <div>
      <p>{nomUser}</p>
      <button onClick={ban}>ban</button>
    </div>
  );
}
