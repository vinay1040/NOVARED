import Button from "../ui/Button";

function LoginForm({ config }) {
  // config = { idLabel, idPlaceholder, accent, buttonText, icon: Icon }
  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 w-full max-w-md">
      <h2 className="text-xl font-bold text-stone-900">{config.title}</h2>
      <p className="text-sm text-stone-500 mt-1">{config.subtitle}</p>

      <label className="text-sm font-medium text-stone-700 mt-6 block">{config.idLabel}</label>
      <input
        type="text"
        placeholder={config.idPlaceholder}
        className={`w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 ${config.ringClass}`}
      />

      <label className="text-sm font-medium text-stone-700 mt-4 block">Password</label>
      <input
        type="password"
        className={`w-full mt-1 px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 ${config.ringClass}`}
      />

      <button
        className={`w-full mt-6 ${config.buttonClass} text-white font-semibold py-3 rounded-full 
           transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
      >
        {config.buttonText}
      </button>
    </div>
  );
}
export default LoginForm;