import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import { Contact } from "../types/contact";

interface ContactFormProps {
  editingContact?: Contact;
  onSave?: () => void;
  onCancel?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  editingContact,
  onSave,
  onCancel,
}) => {
  const { addContact, updateContact } = useContacts();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingContact) {
      updateContact({
        ...editingContact,
        name,
        phone,
      });
      onSave?.();
    } else {
      addContact(name, phone);
    }

    setName("");
    setPhone("");

    if (editingContact) {
      onCancel?.();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Tailwind classes
      className="flex flex-col sm:flex-row items-end gap-4 mb-6"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
          Tên
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded px-2 py-1 w-64"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1">
          Số điện thoại
        </label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border border-gray-300 rounded px-2 py-1 w-64"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
        >
          {editingContact ? "Lưu" : "Thêm"}
        </button>
        {editingContact && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
