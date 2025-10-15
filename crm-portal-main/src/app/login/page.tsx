'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('hillside_crm_auth', 'true');
      window.location.href = '/search';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <img
            src="/logo.png"
            alt="Hillside"
            className="mx-auto mb-8"
            style={{ maxWidth: '200px' }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-10 border border-hillside-border">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label
                htmlFor="username"
                className="block text-accent font-bold text-base mb-4 uppercase"
              >
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[61px] px-8 border border-hillside-border rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="mb-12">
              <label
                htmlFor="password"
                className="block text-accent font-bold text-base mb-4 uppercase"
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[61px] px-8 border border-hillside-border rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-[61px] bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-lg transition-colors uppercase"
            >
              Giriş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
