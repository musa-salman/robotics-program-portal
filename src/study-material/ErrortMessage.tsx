import './ErrorMessage.css';
function ErrortMessage() {
  return (
    <div className="error-modal">
      <div className="error-msg" role="alert">
        <h1 className="error-title">Faild!</h1>
        <hr />
        <p> Please try downloading again, as the previous attempt was unsuccessful.</p>
        <button onClick={() => console.log('ok')}>ok</button>
      </div>
    </div>
  );
}

export default ErrortMessage;
