import Greeting from '@components/atoms/Greeting/Greeting'

const HomeApp = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Home Manager
        </h1>
        <p className="text-slate-400 text-lg">Your smart home dashboard</p>
      </header>
      
      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <Greeting name="Klyswer" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all">
            <h2 className="font-semibold text-blue-400 text-xl mb-2">Architecture</h2>
            <p className="text-sm text-slate-300">Clean Architecture + Atomic Design</p>
          </div>
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all">
            <h2 className="font-semibold text-purple-400 text-xl mb-2">Tech Stack</h2>
            <p className="text-sm text-slate-300">React 19 + Redux Toolkit + Vite</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomeApp;
