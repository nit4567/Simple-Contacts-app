// import React from 'react';
// import { Mail, Phone } from 'lucide-react';

// function ContactInfo({ icon, text }) {
//   const Icon = icon === 'mail' ? Mail : Phone;
  
//   return (
//     <div className="flex items-center gap-2 text-slate-600 text-sm">
//       <Icon className="w-4 h-4 flex-shrink-0" />
//       <span className={icon === 'mail' ? 'truncate' : ''}>{text}</span>
//     </div>
//   );
// }

// export default ContactInfo;
import React, { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';

function ContactInfo({ icon, text, darkMode }) {
  const [copied, setCopied] = useState(false);
  const Icon = icon === 'mail' ? Mail : Phone;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <div className="flex items-center justify-between group">
      <div className={`flex items-center gap-2 text-sm ${
        darkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className={icon === 'mail' ? 'truncate' : ''}>{text}</span>
      </div>

      <button
        onClick={handleCopy}
        className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
          darkMode 
            ? 'hover:bg-slate-700' 
            : 'hover:bg-slate-100'
        }`}
        title="Copy"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className={`w-4 h-4 ${
            darkMode 
              ? 'text-slate-500 hover:text-slate-300' 
              : 'text-slate-400 hover:text-slate-600'
          }`} />
        )}
      </button>
    </div>
  );
}

export default ContactInfo;
