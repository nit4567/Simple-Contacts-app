

function FormField({ label, type = 'text', value, onChange, error, placeholder, required, darkMode }) {
  return (
    <div>
      <label className={`block text-sm font-medium mb-1 ${
        darkMode ? 'text-slate-400' : 'text-slate-700'
      }`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error 
            ? 'border-red-500' 
            : darkMode 
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
              : 'bg-white border-slate-300'
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormField;