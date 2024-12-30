// src/App.tsx
import FilterBar from "./components/FilterBar";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  return (
    // Khung nền với gradient
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
      {/* Card trắng ở giữa */}
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Quản lý danh bạ
        </h1>

        {/* Thanh tìm kiếm + sắp xếp */}
        <div className="mb-6">
          <FilterBar />
        </div>

        {/* Form thêm/sửa */}
        <div className="mb-6">
          <ContactForm />
        </div>

        {/* Danh sách danh bạ */}
        <ContactList />

        {/* Footer nho nhỏ */}
        <div className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} Contact Manager
        </div>
      </div>
    </div>
  );
}

export default App;
