import Modal from "react-modal";
import "./ProductModal.css";

const ProductModal = (props) => {
  const { isModalOpen, selectedProduct, closeModal } = props;
  const modalClose = () => {
    closeModal();
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onRequestClose={modalClose}>
        <button onClick={modalClose}>Close</button>
        <h2>{selectedProduct.title}</h2>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="image-layout"
          loading="lazy"
        />
        <p>{selectedProduct.category}</p>
        <p>Price: ${selectedProduct.price}</p>
        <p>{selectedProduct.description}</p>
      </Modal>
    </>
  );
};
export default ProductModal;
