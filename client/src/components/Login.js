// client/src/components/Login.js
import React, { useState } from 'react';

function Login({ setToken, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
      } else {
        setError(data.msg || 'ورود ناموفق');
      }
    } catch (err) {
      setError('خطا در برقراری ارتباط با سرور');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>ورود به سیستم</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>نام کاربری:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">ورود</button>
      </form>
      <p>
        حساب کاربری ندارید؟{' '}
        <button onClick={onSwitchToRegister}>ثبت‌نام</button>
      </p>
    </div>
  );
}

export default Login;
