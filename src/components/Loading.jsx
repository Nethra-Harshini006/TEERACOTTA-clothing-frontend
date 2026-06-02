import '../styles/loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-logo">
          FASH<span>ION</span>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading your fashion experience...</p>
      </div>
    </div>
  );
}