
export const AddModal = ({ children, onClose }) => {
  return (
    <dialog id="add_modal" className="modal" onClose={onClose}>
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

export const UpdateModal = ({ children, onClose }) => {
  return (
    <dialog id="update_modal" className="modal" onClose={onClose}>
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

export const DeleteModal = ({ children, onClose }) => {
  return (
    <dialog id="delete_modal" className="modal" onClose={onClose}>
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

export const AddDebtorModal = ({ children, onClose }) => {
  return (
    <dialog id="add_debtor_modal" className="modal" onClose={onClose}>
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
