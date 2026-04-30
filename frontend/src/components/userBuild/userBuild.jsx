import { useNavigate } from "react-router-dom";
import { Draggable, Droppable } from "react-drag-and-drop";
export default function UserBuild() {
  const navigate = useNavigate();

  function onDrop(data) {
    console.log(data);
  }

  return (
    <div>
      <button onClick={() => navigate("/menu")}>Quitter</button>
      
      <ul>
        <Draggable type="1">
          <li>test1</li>
        </Draggable>
        <Draggable type="2">
          <li>test2</li>
        </Draggable>
        <Draggable type="1">
          <li>test3</li>
        </Draggable>
        <Droppable types={["1"]} onDrop={onDrop}>
          Ici
        </Droppable>{" "}
        {/* types not type */}
      </ul>
    </div>
  );
}
