/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { Contact } from "../types/contact";


export type SortOption = "none" | "name-asc";

interface ContactContextProps {
  contacts: Contact[];
  addContact: (name: string, phone: string) => void;
  updateContact: (updated: Contact) => void;
  deleteContact: (id: number) => void;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
}

const ContactContext = createContext<ContactContextProps | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Đọc danh bạ
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const stored = localStorage.getItem("contacts");
    return stored ? JSON.parse(stored) : [];
  });

  // lưu lại localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // State cho chức năng tìm kiếm & sắp xếp
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("none");

  // kiểm tra định dạng số điện thoại 
  const isValidPhone = (phone: string) => {
    const normalized = phone.replace(/\s+/g, "");
    const phoneRegex = /^(?:\+84|0)\d{8,9}$/;  
    return phoneRegex.test(normalized);
  };
  const addContact = (name: string, phone: string) => {
    // Kiểm tra số ĐT
    if (!isValidPhone(phone)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }
  
    // Tạo mới contact với avatarUrl
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
      avatarUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${Date.now()}&size=100`,
    };
  
    setContacts((prev) => [...prev, newContact]);
  };
  const updateContact = (updated: Contact) => {
    if (!isValidPhone(updated.phone)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }
    setContacts((prev) =>
      prev.map((contact) => (contact.id === updated.id ? updated : contact))
    );
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,

        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = (): ContactContextProps => {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return ctx;
};
