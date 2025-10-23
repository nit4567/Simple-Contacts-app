import { Search, Plus, User } from 'lucide-react';


function SearchBar({ searchQuery, onSearchChange, darkMode }) {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
        darkMode ? 'text-slate-500' : 'text-slate-400'
      }`" />
      <input
        type="text"
        placeholder="Search contacts by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          darkMode 
            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      />
    </div>
  );
}

export default SearchBar;