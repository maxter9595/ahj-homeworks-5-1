import Popover from "../Popover";

describe("Popover", () => {
  let popover;
  let button;
  let popoverElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="popover-btn">Click to toggle popover</button>
      <div id="popover" class="popover">
        <div class="popover-header">Popover title</div>
        <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
        <div class="popover-arrow"></div>
      </div>
    `;
    popover = new Popover("popover-btn", "popover");
    button = document.getElementById("popover-btn");
    popoverElement = document.getElementById("popover");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should initialize and add event listeners", () => {
    expect(popover.button).toBe(button);
    expect(popover.popover).toBe(popoverElement);
    expect(popoverElement.style.display).toBe("none");
  });

  test("should toggle popover visibility on button click", () => {
    button.click();
    expect(popoverElement.style.display).toBe("block");
    button.click();
    expect(popoverElement.style.display).toBe("none");
  });

  test("should position popover correctly", () => {
    const mockRect = {
      left: 100,
      top: 200,
      width: 50,
      height: 30,
    };
    button.getBoundingClientRect = jest.fn(() => mockRect);
    window.scrollY = 50;
    popover.positionPopover();
    const popoverHeight = popoverElement.offsetHeight;
    const popoverWidth = popoverElement.offsetWidth;
    const expectedLeft =
      mockRect.left + mockRect.width / 2 - popoverWidth / 2 - 10;
    const expectedTop = mockRect.top + window.scrollY - popoverHeight - 17;
    expect(popoverElement.style.left).toBe(`${expectedLeft}px`);
    expect(popoverElement.style.top).toBe(`${expectedTop}px`);
  });

  test("should handle window resize and scroll events", () => {
    popover.positionPopover = jest.fn();
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("scroll"));
    expect(popover.positionPopover).toHaveBeenCalledTimes(2);
  });

  test("should not initialize if elements are missing", () => {
    document.body.innerHTML = "";
    const invalidPopover = new Popover("popover-btn", "popover");
    expect(invalidPopover.button).toBeNull();
    expect(invalidPopover.popover).toBeNull();
  });
});
