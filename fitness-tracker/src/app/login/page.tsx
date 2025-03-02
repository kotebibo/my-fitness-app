"use client";

export default function LoginPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
  
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        window.location.href = '/dashboard'; // Redirect to dashboard
      } else {
        alert(data.message); // Show error message
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }