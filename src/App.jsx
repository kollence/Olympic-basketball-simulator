import './App.css'
import BasketballTournament from './components/BasketballTournament'
import GlobalProvider  from './context/GlobalContext'

function App() {

  return (
    <>
      <div>
        <GlobalProvider >

          <BasketballTournament />
        </GlobalProvider>
      </div>
    </>
  )
}

export default App
