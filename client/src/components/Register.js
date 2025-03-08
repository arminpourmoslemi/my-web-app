// client/src/components/Register.js
import React, { useState } from 'react';

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('ثبت‌نام با موفقیت انجام شد!');
      } else {
        setMessage(data.msg || 'خطا در ثبت‌نام');
      }
    } catch (err) {
      setMessage('خطا در ارتباط با سرور');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>ثبت‌نام</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">ثبت‌نام</button>
      </form>
      {message && <p style={{ color: 'blue' }}>{message}</p>}
      <p>
        حساب کاربری دارید؟{' '}
        <button onClick={onSwitchToLogin}>ورود</button>
      </p>
    </div>
  );
}

export default Register;
