export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-yellow-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Mysmanaged</h1>
      <p className="text-xl mb-8">B2B business portal for operators and franchisees.<br />Secure, sovereign operations.</p>
      <div>
        <a href="/admin" className="btn">Admin Login</a>
      </div>
    </main>
  );
}