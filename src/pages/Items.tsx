import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/client";

export default function Items() {
  const { data: items, isLoading, isError } = useQuery({ queryKey: ["items"], queryFn: getItems });
  if (isLoading) return <div className="p-6">Loading items...</div>;
  if (isError) return <div className="p-6">Could not load items.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lost items</h2>
      <ul className="space-y-2">
        {items?.map((it) => (
          <li key={it.id}>
            <Link className="text-violet-600 hover:underline" to={`/items/${it.id}`}>
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
