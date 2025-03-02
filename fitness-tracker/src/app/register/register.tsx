export default function RegisterPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
  
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please log in.');
        window.location.href = '/login';
      } else {
        alert(data.message); // Show error message
      }
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }