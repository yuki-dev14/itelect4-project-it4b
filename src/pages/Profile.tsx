import useAuthStore from "../store/authStore";

export default function Profile() {
  const username = useAuthStore((s) => s.username);

  return (
    <div className="p-6">
      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Account</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Profile</h2>
        <p className="mt-5 text-slate-600">Username: <strong className="text-slate-900">{username ?? 'none'}</strong></p>
      </div>
    </div>
  );
}
