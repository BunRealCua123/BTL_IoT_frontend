import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Khởi tạo 1 kết nối socket duy nhất
export default socket;
