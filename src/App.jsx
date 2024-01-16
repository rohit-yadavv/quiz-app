import { Route, Routes } from 'react-router-dom' 
import HomePage from './pages/homePage/HomePage'
import QuizPage from './pages/quizPage/QuizPage'
import ResultPage from './pages/resultPage/ResultPage' 
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App() { 

  return ( 
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/quiz/question/:questionIndex" element={<QuizPage />} />
        <Route path="/quiz/result" element={<ResultPage />} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
