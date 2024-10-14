export default class Modal {
  private modalElement: HTMLElement;

  constructor() {
    this.modalElement = document.querySelector('#default-modal') as HTMLElement;
  }

  public showModal(): void {
    this.modalElement.classList.remove("hidden");
    this.modalElement.classList.add("flex");
  }

  public closeModal(): void {
    this.modalElement.classList.add("hidden");
    this.modalElement.classList.remove("flex");
  }
}
