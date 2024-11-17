import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_SERVER_URL}`); // Khởi tạo 1 kết nối socket duy nhất
export default socket;
