class Popover {
  constructor(buttonId, popoverId) {
    this.button = document.getElementById(buttonId);
    this.popover = document.getElementById(popoverId);
    if (!this.button || !this.popover) {
      console.error("Не найден элемент popover или кнопка!");
      return;
    }
    this.popover.style.display = "none";
    this.init();
  }

  init() {
    this.button.addEventListener("click", () => this.togglePopover());
    window.addEventListener("resize", () => this.positionPopover());
    window.addEventListener("scroll", () => this.positionPopover());
  }

  togglePopover() {
    if (this.popover.style.display === "block") {
      this.popover.style.display = "none";
    } else {
      this.popover.style.display = "block";
      this.positionPopover();
    }
  }

  positionPopover() {
    const rect = this.button.getBoundingClientRect();
    const popoverHeight = this.popover.offsetHeight;
    const popoverWidth = this.popover.offsetWidth;
    const scrollTop = window.scrollY;
    this.popover.style.left = `${rect.left + rect.width / 2 - popoverWidth / 2 - 10}px`;
    this.popover.style.top = `${rect.top + scrollTop - popoverHeight - 17}px`;
  }
}

export default Popover;
