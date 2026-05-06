import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

export default function BuildCardConteneur({
  type,
  ajouterItem,
  enlverItem,
  slot = type,
  itemInitial,
}) {
  const [itemDrop, setItemDrop] = useState(null);

  useEffect(() => {
    if (itemInitial) {
      setItemDrop(itemInitial);
      console.log(itemInitial)
    }
  }, [itemInitial]);
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: type,
      drop: (item) => {
        const ancienItem = itemDrop;
        setItemDrop(item);
        ajouterItem((ancien) => ({
          ...ancien,
          [slot]: item,
        }));
        enlverItem((ancienItems) => {
          let nouvelleListe = ancienItems.filter((i) => i._id !== item._id);

          if (
            ancienItem &&
            !nouvelleListe.some((i) => i._id === ancienItem._id)
          ) {
            nouvelleListe = [...nouvelleListe, ancienItem];
          }

          return nouvelleListe;
        });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [type, slot, itemDrop],
  );
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
            : "black",
      }}
    >
      <p>{type}</p>
      {itemDrop && (
        <div>
          <img src={`/assets/${itemDrop.image}`} />
          <p>{itemDrop.nom}</p>
        </div>
      )}
    </div>
  );
}
