import { useDrag } from "react-dnd";
export default function BuildCardInfo({ type, objet }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: objet,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  if (!objet) return null;
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img src={`/assets/${objet.image}`} />
      {objet.nom}
    </div>
  );
}
