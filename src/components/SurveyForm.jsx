import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './SurveyForm.css'

function SurveyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: 18,
    gender: '',
    hadSex: '',
    firstSexAge: '',
    partnerAge: '',
    wouldChange: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.gender) {
      alert('Prosimo, izberite spol.')
      return
    }

    if (!formData.hadSex) {
      alert('Prosimo, odgovorite na vprašanje o spolnem odnosu.')
      return
    }

    if (formData.hadSex === 'da') {
      if (!formData.firstSexAge || !formData.partnerAge || !formData.wouldChange) {
        alert('Prosimo, izpolnite vsa vprašanja.')
        return
      }
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert([{
          age: parseInt(formData.age),
          gender: formData.gender === 'Moški' ? 'male' : formData.gender === 'Ženska' ? 'female' : 'not_specified',
          had_sex: formData.hadSex === 'da' ? true : formData.hadSex === 'ne' ? false : null,
          first_sex_age: formData.firstSexAge ? parseInt(formData.firstSexAge) : null,
          partner_age: formData.partnerAge ? parseInt(formData.partnerAge) : null,
          would_change: formData.wouldChange ? formData.wouldChange === 'da, nekaj bi naredil drugače' : null,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      onSubmit(formData)
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Napaka pri pošiljanju. Prosimo, poskusite znova.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="survey-form-container">
      <h1>Raziskovalna anketa</h1>
      <p className="subtitle">Vaši odgovori so popolnoma anonimni</p>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="form-group">
          <label htmlFor="age">Starost</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="13"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Spol</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Moški"
                checked={formData.gender === 'Moški'}
                onChange={handleChange}
                required
              />
              <span>Moški</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Ženska"
                checked={formData.gender === 'Ženska'}
                onChange={handleChange}
                required
              />
              <span>Ženska</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Ne želim odgovoriti"
                checked={formData.gender === 'Ne želim odgovoriti'}
                onChange={handleChange}
                required
              />
              <span>Ne želim odgovoriti</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="hadSex">Si že imel spolni odnos?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="hadSex"
                value="da"
                checked={formData.hadSex === 'da'}
                onChange={handleChange}
                required
              />
              <span>Da</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="hadSex"
                value="ne"
                checked={formData.hadSex === 'ne'}
                onChange={handleChange}
                required
              />
              <span>Ne</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="hadSex"
                value="prefer_not_to_answer"
                checked={formData.hadSex === 'prefer_not_to_answer'}
                onChange={handleChange}
                required
              />
              <span>Ne želim odgovoriti</span>
            </label>
          </div>
        </div>

        {formData.hadSex === 'da' && (
          <>
            <div className="form-group">
              <label htmlFor="firstSexAge">Tvoja starost, ko si imel prvi spolni odnos?</label>
              <input
                type="number"
                id="firstSexAge"
                name="firstSexAge"
                value={formData.firstSexAge}
                onChange={handleChange}
                min="9"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="partnerAge">Koliko je bil star tvoj partner?</label>
              <input
                type="number"
                id="partnerAge"
                name="partnerAge"
                value={formData.partnerAge}
                onChange={handleChange}
                min="9"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wouldChange">Bi ta dogodek spremenil (imel spolni odnos prej, počakal dlje)?</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wouldChange"
                    value="da, nekaj bi naredil drugače"
                    checked={formData.wouldChange === 'da, nekaj bi naredil drugače'}
                    onChange={handleChange}
                    required
                  />
                  <span>Da, nekaj bi naredil drugače</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="wouldChange"
                    value="ne, odločitev je bila ok"
                    checked={formData.wouldChange === 'ne, odločitev je bila ok'}
                    onChange={handleChange}
                    required
                  />
                  <span>Ne, odločitev je bila ok</span>
                </label>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={submitting}
        >
          {submitting ? 'Pošiljanje...' : 'Pošlji'}
        </button>
      </form>
    </div>
  )
}

export default SurveyForm

