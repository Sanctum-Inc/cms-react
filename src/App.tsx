import Navigation from './Components/Navigation/Navigation'
import DashboardPage from './Pages/DashboardPage'

const App = () => {

    return (
        <div className='flex'>
            <Navigation></Navigation>
            <DashboardPage></DashboardPage>
        </div>
  )
}

export default App
