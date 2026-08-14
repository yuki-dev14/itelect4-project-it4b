import { useParams, useNavigate } from "react-router-dom";

export default function ItemDetail() {
  const params = useParams();
  const { id } = params as { id: string };
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Item detail</h2>
      <p>Viewing item id: <strong>{id}</strong></p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => navigate(-1)} className="rounded bg-slate-200 px-3 py-1">Go back</button>
        <button onClick={() => navigate('/items')} className="rounded bg-violet-600 px-3 py-1 text-white">Back to list</button>
      </div>
    </div>
  );
}
