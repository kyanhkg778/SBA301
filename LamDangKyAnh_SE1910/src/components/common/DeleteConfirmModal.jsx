import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmModal({ show, title, itemName, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-danger fw-bold fs-5">
          ⚠️ Xác Nhận Xóa (Delete Confirmation)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <p className="mb-2 text-muted">
          Bạn có chắc chắn muốn xóa mục <strong>{title || "bản ghi này"}</strong>?
        </p>
        {itemName && (
          <div className="p-3 bg-light rounded border text-truncate fw-semibold text-dark">
            "{itemName}"
          </div>
        )}
        <p className="mt-2 text-danger small mb-0">
          * Thao tác này sẽ xóa bản ghi khỏi danh sách và cập nhật trực tiếp vào bộ nhớ.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onCancel} className="px-3">
          Hủy bỏ (Cancel)
        </Button>
        <Button variant="danger" onClick={onConfirm} className="px-3">
          Xác nhận Xóa (Confirm Delete)
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
