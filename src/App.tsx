import { Header } from "./components/Header"
import { Services } from "./components/Services"
import { PostgresInstances } from "./components/PostgresInstances"
import { useUI } from "./hooks/useUI"

function App() {

  const {userName} = useUI()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <Header username={userName} />

      <section className="flex flex-1 flex-col gap-4 py-6">
        <Services />
        <PostgresInstances />
      </section>

    </main>
  )
}

export default App
