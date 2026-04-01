// import Greeting from '@components/atoms/Greeting/Greeting'
import LoginForm from '@components/organisms/LoginForm/LoginForm'

const HomeApp = () => {
  return (
    <div className="relative min-h-[100dvh] w-screen bg-slate-950 overflow-hidden flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <header className="mb-10 text-center">
          <div className="inline-block p-3 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 shadow-2xl mb-6">
            <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-3 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Agnes
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-[280px] mx-auto leading-relaxed">
            Gestión inteligente para dueños de negocios modernos.
          </p>
        </header>

        <div className="w-full transform hover:scale-[1.01] transition-transform duration-500">
          <LoginForm />
        </div>

        <footer className="mt-12 text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Agnes Enterprise. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  )
}

export default HomeApp;
