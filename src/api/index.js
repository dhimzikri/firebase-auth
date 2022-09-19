import axios from 'axios'

const baseUrl = "http://localhost:5001/fir-auth-86641/us-central1/app"

export const validateToken = async (token) => {
    try {
      const res = await axios.get(`${baseUrl}/api/users/loginvalidate`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        return res.data;
    } catch (error) {
        return null;
    }
}