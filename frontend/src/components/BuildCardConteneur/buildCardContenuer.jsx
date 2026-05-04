import { useDrop } from "react-dnd";

export default function BuildCardConteneur({ type }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => {
      console.log("Objet depose : ", item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed black",
        padding: "20px",
        backgroundColor: isOver
          ? "lightgreen"
          : canDrop
            ? "lightyellow"
            : "white",
      }}
    >
      <p>{type}</p>
    </div>
  );
}
