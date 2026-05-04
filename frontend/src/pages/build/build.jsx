import UserBuild from "../../components/userBuild/userBuild";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Build() {
  return (
    <DndProvider backend={HTML5Backend}>
      <UserBuild />
    </DndProvider>
  );
}
