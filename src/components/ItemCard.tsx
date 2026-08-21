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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400">Item</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {item.status}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Reported: {item.dateReported.toLocaleDateString()}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleClaimClick}
          disabled={item.status === ItemStatus.Claimed}
          className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          {item.status === ItemStatus.Claimed ? "Already Claimed" : "Claim Item"}
        </button>
        <button
          onClick={handleMarkLost}
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100"
        >
          Mark as Lost
        </button>
      </div>
    </div>
  );
}

export default ItemCard;