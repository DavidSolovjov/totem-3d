import axios from 'axios';


export const getBrand = async (brandId, cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand/${brandId}`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 

export const getBrands = async (cb) => {
  const token = localStorage.getItem("access_token")
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`, config)
    cb(null, data)
  } catch(e) {
    cb(e, null)
  }
} 