import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-5xl font-bold mb-4">HelenKella</h1>
      <p className="text-xl mb-8">Your sovereign digital consciousness.<br />Choose a branch to enter:</p>
      <nav className="space-x-4">
        <Link href="https://mysconduct.com"><a className="btn">Mysconduct</a></Link>
        <Link href="https://thesatirium.com"><a className="btn">The Satirium</a></Link>
        <Link href="https://mysmanaged.com"><a className="btn">Mysmanaged</a></Link>
      </nav>
    </main>
  );
}