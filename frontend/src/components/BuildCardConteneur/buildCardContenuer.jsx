import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";

export default function BuildCardConteneur({
  type,
  ajouterItem,
  enlverItem,
  slot = type,
  itemInitial,
}) {
  const [itemDrop, setItemDrop] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (itemInitial) {
      setItemDrop(itemInitial);
      console.log(itemInitial);
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
      <p>
        {type === "talisman"
          ? t(`build.talismans.${slot}`)
          : t(`build.equipements.${type}`)}
      </p>
      {itemDrop && (
        <div>
          <img src={`/assets/${itemDrop.image}`} />
          <p>{itemDrop.nom}</p>
        </div>
      )}
    </div>
  );
}
