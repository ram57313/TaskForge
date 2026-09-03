import "./ConfirmModal.css"

const ConfirmModal=({
    title,
    message,
    onCancel,
    onConfirm,
    buttonText
})=>{

    const text=buttonText?buttonText:"DELETE";


    return (
        <div className="confirm-modal-overlay">

            <div className="confirm-modal">

                <div className="confirm-modal-title">
                    <h2>
                    {title} 
                    </h2> 
                </div>

                <div className="confirm-modal-content">

                    <span className="confirm-modal-message">{message}</span>

                    <div className="confirm-buttons">
                        <button onClick={onCancel}>CANCEL</button>
                        <button onClick={onConfirm}>{text}</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ConfirmModal;