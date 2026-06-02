import { useState } from 'react';
import { emailAPI } from '../services/api';
import '../styles/feedback.css';

const TOPICS = ['Product Quality', 'Delivery Speed', 'Website Experience', 'Customer Support', 'Pricing', 'Other'];

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=form, 2=thanks
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setStep(1); setRating(0); setHovered(0); setTopic(''); setMessage(''); setName(''); setEmail(''); setError(''); };

  const handleClose = () => { setOpen(false); setTimeout(reset, 300); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return setError('Please give a star rating.');
    if (!topic) return setError('Please select a topic.');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.');
    if (!message.trim()) return setError('Please write your feedback.');
    setError('');

    const feedbackName = name.trim() || 'Valued Customer';
    
    // Send feedback email
    emailAPI.sendFeedbackEmail(feedbackName, email, rating, topic);
    
    const feedbacks = JSON.parse(localStorage.getItem('terracotta_feedbacks') || '[]');
    feedbacks.push({ name: feedbackName, email, rating, topic, message: message.trim(), date: new Date().toISOString() });
    localStorage.setItem('terracotta_feedbacks', JSON.stringify(feedbacks));
    setStep(2);
  };

  return (
    <>
      {/* Floating button */}
      <button className="feedback-fab" onClick={() => setOpen(true)} title="Give Feedback">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Feedback</span>
      </button>

      {/* Backdrop */}
      {open && <div className="feedback-backdrop" onClick={handleClose} />}

      {/* Modal */}
      <div className={`feedback-modal${open ? ' open' : ''}`}>
        <div className="feedback-modal-header">
          <div>
            <h3>Share Your Feedback</h3>
            <p>Help us improve your TERRACOTTA experience</p>
          </div>
          <button className="feedback-close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {step === 1 ? (
          <form className="feedback-form" onSubmit={handleSubmit}>
            {/* Star rating */}
            <div className="feedback-field">
              <label>How would you rate your experience?</label>
              <div className="feedback-stars">
                {[1,2,3,4,5].map(s => (
                  <button
                    type="button"
                    key={s}
                    className={`feedback-star${s <= (hovered || rating) ? ' active' : ''}`}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                  >★</button>
                ))}
                {rating > 0 && (
                  <span className="feedback-rating-label">
                    {['','Poor','Fair','Good','Great','Excellent!'][rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Topic */}
            <div className="feedback-field">
              <label>What's this about?</label>
              <div className="feedback-topics">
                {TOPICS.map(t => (
                  <button
                    type="button"
                    key={t}
                    className={`feedback-topic-btn${topic === t ? ' active' : ''}`}
                    onClick={() => setTopic(t)}
                  >{t}</button>
                ))}
              </div>
            </div>

            {/* Name (optional) */}
            <div className="feedback-field">
              <label>Your name <span>(optional)</span></label>
              <input
                type="text"
                placeholder="e.g. Priya"
                value={name}
                onChange={e => setName(e.target.value)}
                className="feedback-input"
              />
            </div>

            {/* Email */}
            <div className="feedback-field">
              <label>Your email *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="feedback-input"
                required
              />
            </div>

            {/* Message */}
            <div className="feedback-field">
              <label>Tell us more</label>
              <textarea
                placeholder="What did you love? What can we improve?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="feedback-textarea"
                rows={3}
              />
            </div>

            {error && <p className="feedback-error">{error}</p>}

            <button type="submit" className="feedback-submit">Send Feedback</button>
          </form>
        ) : (
          <div className="feedback-thanks">
            <div className="feedback-thanks-icon">🎉</div>
            <h4>Thank you, {name.trim() || 'friend'}!</h4>
            <p>Your feedback helps us craft a better experience for every TERRACOTTA customer.</p>
            <button className="feedback-submit" onClick={handleClose}>Close</button>
          </div>
        )}
      </div>
    </>
  );
}
