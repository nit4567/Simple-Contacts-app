import { useState } from 'react';
import FormField from './FormField.jsx';
import React from 'react';
import { X } from 'lucide-react';

function ContactModal({ onClose, onSubmit, darkMode, title, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData 
      ? { name: initialData.name, email: initialData.email, phone: initialData.phone }
      : { name: '', email: '', phone: '' }
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,6}$/im.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`rounded-lg shadow-xl max-w-md w-full p-6 animate-scale-in ${
        darkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {title}
          </h2>
          <button
            onClick={handleClose}
            className={`transition-colors ${
              darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <FormField
            label="Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            placeholder="John Doe"
            required
            darkMode={darkMode}
          />

          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
            placeholder="john.doe@email.com"
            required
            darkMode={darkMode}
          />

          <FormField
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            error={errors.phone}
            required
            darkMode={darkMode}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className={`flex-1 px-4 py-2 border rounded-lg transition-colors font-medium ${
              darkMode 
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            {initialData ? 'Update' : 'Add Contact'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;