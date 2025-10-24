
import React, { useState, useEffect } from 'react';
import { Plus, User, Moon, Sun } from 'lucide-react';
import ContactCard from './components/ContactCard';
import ContactModal from './components/AddContactModal';
import SearchBar from './components/SearchBar';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { INITIAL_CONTACTS } from './data/initialContacts';


export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [deletingContact, setDeletingContact] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

const filteredContacts = contacts
    .filter(contact => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true; // Show all if search is empty
      
      const nameMatch = contact.name.toLowerCase().includes(query);
      const emailMatch = contact.email.toLowerCase().includes(query);
      
      // For phone: only search if query contains digits
      const queryDigits = query.replace(/\D/g, '');
      const phoneMatch = queryDigits ? contact.phone.replace(/\D/g, '').includes(queryDigits) : false;
      
      return nameMatch || emailMatch || phoneMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));


  const handleAddContact = (newContactData) => {
    const initials = newContactData.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const contact = {
      id: Date.now(),
      name: newContactData.name.trim(),
      email: newContactData.email.trim(),
      phone: newContactData.phone.trim(),
      avatar: initials
    };

    setContacts([...contacts, contact]);
    setShowAddModal(false);
  };

  const handleEditContact = (updatedData) => {
    const initials = updatedData.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    setContacts(contacts.map(c => 
      c.id === editingContact.id 
        ? { ...c, ...updatedData, avatar: initials }
        : c
    ));
    setEditingContact(null);
  };

  const handleDeleteContact = (id) => {
  setContacts(contacts.filter(c => c.id !== id));
  setDeletingContact(null);
};

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Contacts
            </h1>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              Manage your contact list
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg transition-all ${
              darkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
                : 'bg-white hover:bg-slate-100 text-slate-700'
            } shadow-sm`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Search and Add Section */}
        <div className={`rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            darkMode={darkMode}
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Contact
          </button>
        </div>

        {/* Contact Count */}
        <div className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {searchQuery ? (
            <p>Found {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}</p>
          ) : (
            <p>{contacts.length} total contact{contacts.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {/* Contacts Grid */}
        {filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact, index) => (
              <ContactCard 
                key={contact.id} 
                contact={contact}
                darkMode={darkMode}
                onEdit={() => setEditingContact(contact)}
                onDelete={() => setDeletingContact(contact)}
                animationDelay={index * 50}
              />
            ))}
          </div>
        ) : (
          <div className={`rounded-lg shadow-sm p-12 text-center ${
            darkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <User className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              No contacts found
            </h3>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              {searchQuery ? 'Try adjusting your search' : 'Add your first contact to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <ContactModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddContact}
          darkMode={darkMode}
          title="Add New Contact"
        />
      )}
      {deletingContact && (
        <DeleteConfirmModal
          contact={deletingContact}
          onConfirm={() => handleDeleteContact(deletingContact.id)}
          onCancel={() => setDeletingContact(null)}
          darkMode={darkMode}
        />
      )}


      {/* Edit Contact Modal */}
      {editingContact && (
        <ContactModal
          onClose={() => setEditingContact(null)}
          onSubmit={handleEditContact}
          darkMode={darkMode}
          title="Edit Contact"
          initialData={editingContact}
        />
      )}
    </div>
  );
}

