import { Draggable } from "react-drag-and-drop";

export default function BuildListBox({ items }) {
  return (
    <ul
      style={{
        height: "200px", // hauteur fixe
        overflowY: "scroll", // scroll vertical
        border: "1px solid gray",
        listStyle: "none",
        padding: "4px",
        margin: 0,
      }}
    >
      {items.map((item) => (
        <Draggable key={item.id} type={item.type} data={JSON.stringify(item)}>
          <li
            style={{
              padding: "8px",
              cursor: "grab",
            }}
          >
            {item.name}
          </li>
        </Draggable>
      ))}
    </ul>
  );
}
