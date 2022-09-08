import axios from 'axios';

const checkPoint = async (userCode: string) => {
  const body = { userCode };
  try {
    const response = await axios.post(
      'http://localhost:8080/did/checkPoint',
      body
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default checkPoint;
