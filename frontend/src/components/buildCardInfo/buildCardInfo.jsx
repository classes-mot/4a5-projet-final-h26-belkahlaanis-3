import { Droppable } from "react-drag-and-drop";
export default function BuildCardInfo({ type }) {
  return (
    <div>
      <Droppable type={type}>{type}</Droppable>
    </div>
  );
}
