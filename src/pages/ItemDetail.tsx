import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../api/client";

export default function ItemDetail() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const itemId = Number(id);
  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId),
    enabled: Number.isInteger(itemId),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Item detail</h2>
      {isLoading && <p>Loading item...</p>}
      {isError && <p>Item could not be found.</p>}
      {item && <><h3 className="text-xl font-medium">{item.title}</h3><p className="mt-2">{item.description}</p><p className="mt-2">Status: {item.status}</p></>}
      <div className="mt-4 flex gap-2">
        <button onClick={() => navigate(-1)} className="rounded bg-slate-200 px-3 py-1">Go back</button>
        <button onClick={() => navigate('/items')} className="rounded bg-violet-600 px-3 py-1 text-white">Back to list</button>
      </div>
    </div>
  );
}
