export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Hello, 2.54 cm</h1>
        <a href="/address">
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Query your balance from 1inch API
          </button>
        </a>
      </div>
    </main>
  );
}
