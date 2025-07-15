import Link from 'next/link';

export default function MysconductHome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-900 to-yellow-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Mysconduct</h1>
      <p className="text-xl mb-8">High-consent, creator-first platform.<br />Log in to your Creator Fortress.</p>
      <div className="space-x-4">
        <Link href="/signin"><a className="btn">Sign In</a></Link>
        <Link href="/explore"><a className="btn">Explore</a></Link>
      </div>
    </main>
  );
}