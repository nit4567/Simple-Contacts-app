import ContactInfo from './ContactInfo.jsx';
import React, { useState } from 'react';
import { Trash2, Edit2, MoreVertical } from 'lucide-react';

function ContactCard({ contact, darkMode, onEdit, onDelete, animationDelay }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const AVATAR_COLORS = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500'
  ];

  const getAvatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

  const handleEdit = () => {
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  return (
    <div 
      className={`rounded-lg shadow-sm hover:shadow-md transition-all p-6 border animate-fade-in relative ${
        darkMode 
          ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
          : 'bg-white border-slate-200'
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Three Dot Menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-300'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
          }`}
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        
        {/* Dropdown Menu */}
        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 overflow-hidden ${
              darkMode ? 'bg-slate-700' : 'bg-white'
            }`}>
              <button
                onClick={handleEdit}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  darkMode
                    ? 'hover:bg-slate-600 text-slate-300'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Edit2 className="w-4 h-4" />
                <span className="font-medium">Edit Contact</span>
              </button>
              <button
                onClick={handleDelete}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  darkMode
                    ? 'hover:bg-red-900/30 text-red-400'
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Delete Contact</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-start gap-4 pr-8">
        <div className={`${getAvatarColor(contact.id)} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
          {contact.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-3 mt-2 truncate ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            {contact.name}
          </h3>
          <div className="space-y-2">
            <ContactInfo icon="mail" text={contact.email} darkMode={darkMode} />
            <ContactInfo icon="phone" text={contact.phone} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}



export default ContactCard;
