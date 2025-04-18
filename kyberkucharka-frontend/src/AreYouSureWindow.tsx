interface AreYouSureWindowProps {
  mainText: string;
  descriptionText?: string;
  confirmText: string;
  successCallback: () => void;
  closeCallback: () => void;
}

export default function AreYouSureWindow({
  mainText,
  descriptionText,
  confirmText,
  successCallback,
  closeCallback,
}: AreYouSureWindowProps) {
  
  return (
    <div className="floating-window">
      <div className="floating-window-content">
        <img
          src="/x-white.png"
          alt="Zrušiť"
          tabIndex={0}
          className="cancel-x cancel-button"
          onClick={closeCallback}
        />
        <h1>{mainText}</h1>
        {descriptionText && <p>{descriptionText}</p>}
        <form onSubmit={successCallback}>
          <button className="kyberbutton-white" type="button" onClick={closeCallback}>
            <span>Zrušiť</span>
          </button>

          <button className="kyberbutton-white" type="submit">
            <span>{confirmText}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
  