import { useState } from 'react'
import SurveyForm from './components/SurveyForm'
import ThankYou from './components/ThankYou'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (formData) => {
    // Submission is handled in SurveyForm component
    setSubmitted(true)
  }

  return (
    <div className="app">
      {submitted ? (
        <ThankYou />
      ) : (
        <SurveyForm onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default App
