import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Gửi yêu cầu đăng nhập đến backend
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
              });
            
            console.log('Response status:', response.status);  // Log mã trạng thái trả về

        // Sử dụng response.text() để nhận phản hồi dưới dạng văn bản
        const textResponse = await response.text();
        console.log('Response text:', textResponse);  // Log phản hồi từ server dưới dạng văn bản

        if (response.ok) {
            // Nếu dữ liệu phản hồi là JSON, bạn có thể phân tích nó
            const result = JSON.parse(textResponse);
            console.log('Parsed response:', result);  // Log dữ liệu sau khi phân tích

            
            if (result && result.data) {
                console.log('Name:', result.data.name);
                console.log('Role:', result.data.role);
                console.log('ID:', result.data._id);

                // Lưu vào localStorage
                localStorage.setItem('name', result.data.name);
                localStorage.setItem('role', result.data.role);
                localStorage.setItem('_id', result.data._id);
                onLoginSuccess(result.data.role);
                navigate('/'); // Điều hướng đến trang chính
            }
            } else {
                setErrorMessage(response.data.message || 'Sai tên đăng nhập hoặc mật khẩu');
            }
        } catch (error) {
            setErrorMessage('Sai tên đăng nhập hoặc mật khẩu');
        }
    };

    return (
        <div className="login2"> 
        <div className="login-container">
            <h2>Smart Home Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="input-box password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <button type="submit" className="btn">Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="forgot">
                    <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>
        </div>
    );
}

export default Login;
