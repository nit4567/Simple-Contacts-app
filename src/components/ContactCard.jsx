import ContactInfo from './ContactInfo.jsx';

function ContactCard({ contact }) {
  const AVATAR_COLORS = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-yellow-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500'
  ];

  const getAvatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200">
      <div className="flex items-start gap-4">
        <div className={`${getAvatarColor(contact.id)} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
          {contact.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 mt-2 mb-3 truncate">{contact.name}</h3>
          <div className="space-y-2">
            <ContactInfo icon="mail" text={contact.email} />
            <ContactInfo icon="phone" text={contact.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
// import React from 'react';
// import { Copy } from 'lucide-react';
// import ContactInfo from './ContactInfo.jsx';

// function ContactCard({ contact }) {
//   const AVATAR_COLORS = [
//     'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
//     'bg-yellow-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500'
//   ];

//   const getAvatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

//   const handleCopyName = () => {
//     navigator.clipboard.writeText(contact.name);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200">
//       <div className="flex items-start gap-4">
//         {/* Avatar */}
//         <div
//           className={`${getAvatarColor(contact.id)} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
//         >
//           {contact.avatar}
//         </div>

//         {/* Info Section */}
//         <div className="flex-1 min-w-0">
//           {/* Name with Copy Icon */}
//           <div className="flex items-center justify-between group mb-3">
//             <h3 className="text-lg font-semibold text-slate-800 truncate">
//               {contact.name}
//             </h3>
//             <button
//               onClick={handleCopyName}
//               className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-100"
//               title="Copy name"
//             >
//               <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600" />
//             </button>
//           </div>

//           {/* Email and Phone */}
//           <div className="space-y-2">
//             <ContactInfo icon="mail" text={contact.email} />
//             <ContactInfo icon="phone" text={contact.phone} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactCard;
