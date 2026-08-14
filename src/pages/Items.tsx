import { Link } from "react-router-dom";

const mockItems = [
  { id: 1, title: "Black Umbrella" },
  { id: 2, title: "Blue Water Bottle" },
  { id: 3, title: "Gray Hoodie" },
];

export default function Items() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lost items</h2>
      <ul className="space-y-2">
        {mockItems.map((it) => (
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
