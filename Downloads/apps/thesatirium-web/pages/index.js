import Link from 'next/link';

export default function ThesatiriumHome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lime-900 to-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">The Satirium</h1>
      <p className="text-xl mb-8">Satirical critique, IP generation, and gamified resistance.<br />Unleash your wit.</p>
      <div className="space-x-4">
        <Link href="/arena"><a className="btn">Enter Arena</a></Link>
        <Link href="/zine"><a className="btn">Make Zine</a></Link>
      </div>
    </main>
  );
}