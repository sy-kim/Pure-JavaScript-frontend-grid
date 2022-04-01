class Modal {
  constructor(modalId, modalContent) {
    this.modal = elementId;
    this.modal = document.createElement("div");

    this.modalContent = modalContent;
    this.modalContent = document.createElement("div");

    this.modalCloseButton = document.createElement("button");
  }
  init() {
    // The Modal (background)
    this.modal.style.display = "none"; /* Hidden by default */
    this.modal.style.position = "fixed"; /* Stay in place */
    this.modal.style.zIndex = 1; /* Sit on top */
    this.modal.style.left = 0;
    this.modal.style.top = 0;
    this.modal.style.width = "100%"; /* Full width */
    this.model.style.height = "100%"; /* Full height */
    this.modal.style.overflow = "auto"; /* Enable scroll if needed */
    this.modal.style.backgroundColor = "rgba(0,0,0,0.4)"; /* Black w / opacity */

    // Modal content Box
    this.modalContent.style.backgroundColor = "#fefefe";
    this.modalContent.style.margin = "15% auto"; /* 15% from the top and centeterd */
    this.modalContent.style.padding = "20px";
    this.modalContent.style.border = "1px solid #888";
    this.modalContent.style.width = "80%"; /* Could be more or less, depending on screen size */

    // The close Button
  }
}
