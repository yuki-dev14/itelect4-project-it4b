// src/components/ItemCard.tsx
import type { Item, ItemUpdate } from "../types/app";
import { ItemStatus } from "../types/app";

interface ItemCardProps {
  item: Item;
  onClaim: (itemId: number) => void;
  onUpdate: (itemId: number, changes: ItemUpdate) => void;
}

function ItemCard({ item, onClaim, onUpdate }: ItemCardProps) {
  // Typed event handler: React.MouseEvent<HTMLButtonElement>
  const handleClaimClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClaim(item.id);
  };

  // Second typed handler, demonstrating ItemUpdate (Partial<Item>) in action
  const handleMarkLost = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const changes: ItemUpdate = { status: ItemStatus.Lost };
    onUpdate(item.id, changes);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "8px" }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Status: {item.status}</p>
      <p>Reported: {item.dateReported}</p>

      <button onClick={handleClaimClick} disabled={item.status === ItemStatus.Claimed}>
        {item.status === ItemStatus.Claimed ? "Already Claimed" : "Claim Item"}
      </button>
      <button onClick={handleMarkLost} style={{ marginLeft: "0.5rem" }}>
        Mark as Lost
      </button>
    </div>
  );
}

export default ItemCard;