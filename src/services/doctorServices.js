import axios from 'axios';

export const fetchDoctors = async (page) => {
  try {
    const response = await axios.get(`/api/get-doctors?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to fetch doctors');
  }
};

export const addDoctor = async (form, base64Image = null) => {
    try {
        const payload = base64Image ? { ...form, image: base64Image } : form;
      
        const response = await axios.post("/api/add-doctors", payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
  };
