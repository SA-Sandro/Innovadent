export default class Modal {
  private modalElement: HTMLElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.modalElement = document.querySelector("#default-modal");
    }
  }

  public showModal(): void {
    if (this.modalElement) {
      this.modalElement.classList.remove("hidden");
      this.modalElement.classList.add("flex");
    }
  }

  public closeModal(): void {
    if (this.modalElement) {
      this.modalElement.classList.add("hidden");
      this.modalElement.classList.remove("flex");
    }
  }
}
