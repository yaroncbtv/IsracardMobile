import axios, {AxiosError, AxiosResponse} from 'axios';
//need to fix
// Define the shape of the data you expect from the API
interface ApiResponse<T> {
  data: T;
}
interface ApiResponseWithError<T> {
  data: T;
}
// Create an Axios instance
const token =
  '9ad5e457c069d5a438f1444b848442b437474bbe64b2084cfb698543c91cf2820dd0ab1686e66f7bb4e274b308c23244193ef9ae4c0aa283301a00833217f42f0189937011cd6f7cdb60fe8544c7d937837655c22547286588f00aefbc51fb6e7828a1da1369d7d0e40bfbc3cd7fded7febcab4b437455bfcc31d458b30ce209';
const apiClient = axios.create({
  // baseURL: 'http://localhost:3001/auth/', // Replace with your API's base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const apiClientCms = axios.create({
  baseURL: 'http://localhost:1337/api/', // Replace with your API's base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// Function to handle GET requests
export const getApi = async <T>(endpoint: string, params = {}): Promise<T> => {
  try {
    const response = await apiClient.get(endpoint, {params});
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const getCms = async <T>(endpoint: string, params = {}): Promise<T> => {
  try {
    const response = await apiClientCms.get(endpoint, {params});
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// Function to handle POST requests
export const postApi = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

// Centralized error handling function
const handleError = (error: any): any => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error response:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
  }
  //throw error;
};
