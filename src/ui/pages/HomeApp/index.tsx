// import Greeting from '@components/atoms/Greeting/Greeting'
import LoginForm from '@components/organisms/LoginForm/LoginForm'

const HomeApp = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <header className="mb-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Home Manager
        </h1>
        {/* <p className="text-slate-400 text-lg">Your smart home dashboard</p> */}
      </header>
      
      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        {/* <Greeting name="Klyswer" /> */}
        
        <div className="w-full mt-6">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

export default HomeApp;
