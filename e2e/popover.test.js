const puppeteer = require("puppeteer");

describe("Popover Widget", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.goto("http://localhost:9000/");
  }, 30000);

  afterAll(async () => {
    await browser.close();
  });

  test("Popover appears on button click", async () => {
    const popoverVisibleBeforeClick = await page.$eval(
      "#popover",
      (el) => window.getComputedStyle(el).display !== "none",
    );
    expect(popoverVisibleBeforeClick).toBe(false);
    await page.click("#popover-btn");
    const popoverVisibleAfterClick = await page.$eval(
      "#popover",
      (el) => window.getComputedStyle(el).display === "block",
    );
    expect(popoverVisibleAfterClick).toBe(true);
  });

  test("Popover hides on second button click", async () => {
    await page.click("#popover-btn");
    const popoverVisibleAfterSecondClick = await page.$eval(
      "#popover",
      (el) => window.getComputedStyle(el).display === "none",
    );
    expect(popoverVisibleAfterSecondClick).toBe(true);
  });

  test("Popover is positioned correctly relative to the button", async () => {
    await page.click("#popover-btn");
    const buttonRect = await page.$eval("#popover-btn", (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
    const popoverRect = await page.$eval("#popover", (el) => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
    const left = buttonRect.left + buttonRect.width / 2 - popoverRect.width / 2;
    expect(popoverRect.top + popoverRect.height).toBeLessThan(buttonRect.top);
    expect(popoverRect.left).toBeGreaterThanOrEqual(left - 2.5);
    expect(popoverRect.left).toBeLessThanOrEqual(left + 2.5);
  });
});
