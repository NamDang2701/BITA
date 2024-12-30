// src/components/ContactList.tsx
import React, { useMemo } from "react";
import { useContacts } from "../context/ContactContext";
import ContactItem from "./ContactItem";

const ContactList: React.FC = () => {
  const { contacts, searchTerm, sortOption } = useContacts();
  const filteredAndSortedContacts = useMemo(() => {
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [contacts, searchTerm, sortOption]);

  return (
    <div className="flex flex-col gap-3">
      {filteredAndSortedContacts.length === 0 ? (
        <p className="text-gray-500 font-medium">Không tìm thấy danh bạ...</p>
      ) : (
        filteredAndSortedContacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
  
};

export default ContactList;
