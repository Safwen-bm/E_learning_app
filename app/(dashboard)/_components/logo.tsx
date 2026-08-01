import Link from "next/link";

export const Logo = () => {
  return (
    <Link 
      href="/" 
      className="block text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
    >
      <div className="text-5xl font-bold tracking-tighter transition-all duration-500 group-hover:scale-110">
        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Aca</span>
        <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">de</span>
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">myX</span>
      </div>
      <p className="text-sm text-foreground/60 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Learn Without Limits
      </p>
    </Link>
  );
};