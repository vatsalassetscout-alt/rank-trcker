export function Button({ children, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium transition-all ${className}`}
    >
      {children}
    </button>
  );
}
