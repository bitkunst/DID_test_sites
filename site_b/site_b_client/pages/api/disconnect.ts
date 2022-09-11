import axios from 'axios';

const disconnectFromApp = async (userCode: string) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/did/disconnect',
      {
        userCode,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default disconnectFromApp;
