const Modal = ({ children, onClose }) => {
  return (
    <dialog id="my_modal" className="modal" onClose={onClose}>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>

      <div className="modal-box relative">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {children}
      </div>
    </dialog>
  );
};

export default Modal;
