import axios from "axios";
import { useState } from "react";

const AddDoctorModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    hospital: "",
    contact: "",
    email: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    let base64Image = null;
  
    if (imageFile) {
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        base64Image = reader.result;
  
        try {
          const res = await axios.post("/api/add-doctors", {
            ...form,
            image: base64Image,
          });
  
          setMessage("Doctor added successfully!");
          setForm({
            name: "",
            specialization: "",
            experience: "",
            hospital: "",
            contact: "",
            email: "",
            price: "",
          });
          setImageFile(null);
        } catch (error) {
          setMessage(error.response?.data?.error || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
  
      reader.readAsDataURL(imageFile); 
    } else {
      try {
        const res = await axios.post("/api/add-doctors", form);
        setMessage("Doctor added successfully!");
        setForm({ ...form });
      } catch (error) {
        setMessage(error.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h1 className="text-2xl font-bold mb-4">Add New Doctor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "experience", "hospital", "contact", "email", "price"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "experience" || field === "price" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          ))}

          <select
            
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
           
            <option value="">Select Specialization</option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Add Doctor"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}

      </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-5xl text-white hover:text-gray-700"
        >
          ×
        </button>
    </div>
  );
};

export default AddDoctorModal;
