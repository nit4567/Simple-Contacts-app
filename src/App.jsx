
import React, { useState } from 'react';
import { Search, Plus, User } from 'lucide-react';
import ContactCard from './components/ContactCard';
import AddContactModal from './components/AddContactModal';
import SearchBar from './components/SearchBar';
import { INITIAL_CONTACTS } from './data/initialContacts';

export default function App() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Contacts</h1>
          <p className="text-slate-600">Manage your contact list</p>
        </header>

        {/* Search and Add Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
        <div className="mb-4 text-slate-600">
          {searchQuery ? (
            <p>Found {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}</p>
          ) : (
            <p>{contacts.length} total contact{contacts.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {/* Contacts Grid */}
        {filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No contacts found</h3>
            <p className="text-slate-600">
              {searchQuery ? 'Try adjusting your search' : 'Add your first contact to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <AddContactModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddContact}
        />
      )}
    </div>
  );
}
