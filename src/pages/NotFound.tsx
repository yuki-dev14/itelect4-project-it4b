import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold">Nothing here</h2>
      <p className="mt-2">The page you requested does not exist.</p>
      <p className="mt-4">
        <Link to="/" className="text-violet-600 hover:underline">Go home</Link>
      </p>
    </div>
  );
}
