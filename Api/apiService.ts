import axios, {AxiosError, AxiosResponse} from 'axios';
interface ApiResponse<T> {
  data: T;
}
interface ApiResponseWithError<T> {
  data: T;
}
const token =
  '9ad5e457c069d5a438f1444b848442b437474bbe64b2084cfb698543c91cf2820dd0ab1686e66f7bb4e274b308c23244193ef9ae4c0aa283301a00833217f42f0189937011cd6f7cdb60fe8544c7d937837655c22547286588f00aefbc51fb6e7828a1da1369d7d0e40bfbc3cd7fded7febcab4b437455bfcc31d458b30ce209';
const apiClient = axios.create({
  // baseURL: 'http://localhost:3001/auth/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const apiClientCms = axios.create({
  baseURL: 'http://localhost:1337/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

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

export const postApi = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    return error.response?.data;
  }
};

const handleError = (error: any): any => {
  if (error.response) {
    console.error('Error response:', error.response.data);
  } else if (error.request) {
    console.error('Error request:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
};
