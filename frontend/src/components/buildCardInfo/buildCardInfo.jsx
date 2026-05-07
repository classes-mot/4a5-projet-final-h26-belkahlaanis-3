import { useDrag } from "react-dnd";
import "../userBuild/userBuild.css";
export default function BuildCardInfo({ type, objet }) {
  if (!objet || !type) return null;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: objet,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag} className="build-item-card">
      <img src={`/assets/${objet.image}`} />
      <p className="build-item-name">{objet.nom}</p>
    </div>
  );
}
