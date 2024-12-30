// src/components/ContactItem.tsx
import React, { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { Contact } from "../types/contact";
import ContactForm from "./ContactForm";

// Import component Avatar
import Avatar from "./Avatar";

interface ContactItemProps {
  contact: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const { deleteContact } = useContacts();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 border border-gray-200 rounded shadow-sm bg-white">
      {isEditing ? (
        <ContactForm
          editingContact={contact}
          onSave={() => setIsEditing(false)}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex items-center gap-4">
            {/* Thay vì kiểm tra avatarUrl thủ công => dùng component Avatar */}
            <Avatar avatarUrl={contact.avatarUrl} name={contact.name} />

            <div className="text-gray-800 font-semibold">
              {contact.name} - {contact.phone}
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Sửa
            </button>
            <button
              onClick={() => deleteContact(contact.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Xóa
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactItem;
