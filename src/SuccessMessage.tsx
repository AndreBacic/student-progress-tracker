
function SuccessMessage(props: {
    message: string;
    show: boolean;
    onClose: () => void;
}) {
    // message is visible when show is true, otherwise it is hidden
    return (
        <div className="rounded-3 border border-success p-1 text-success"
            style={{ display: props.show ? "inline-block" : "none" }}>
            <i className="bi bi-check2-circle text-success"></i>
            {` ${props.message} `}
            <button className="ms-1 btn btn-sm btn-outline-success" onClick={props.onClose}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
}

export default SuccessMessage;