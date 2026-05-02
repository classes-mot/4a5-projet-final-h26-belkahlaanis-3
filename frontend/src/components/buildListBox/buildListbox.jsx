export default function BuildListBox({ children }) {
  return (
    <ul style={{
      height: "200px",
      overflowY: "scroll",
      border: "1px solid gray",
      listStyle: "none",
      padding: "4px",
      margin: 0,
    }}>
      {children}
    </ul>
  );
}