const { generateText, checkAndGenerate } = require("./util");
const puppeteer = require("puppeteer");

// Unit Test
test("should output name and age", () => {
    const text = generateText("Max", 29);
    expect(text).toBe("Max (29 years old)");

    const text2 = generateText("Anna", 28);
    expect(text2).toBe("Anna (28 years old)");
});

test("should output data-lss text", () => {
    const text = generateText("", null);
    expect(text).toBe(" (null years old)");
});

//Integration Test
test("should generate a valid text output", () => {
    const text = checkAndGenerate("Max", 29);
    expect(text).toBe("Max (29 years old)");
});

//E2E test 
test("should click around", async () => {
    const browser = await puppeteer.launch({
        headless : false,
        slowMo : 80,
        args : ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto("file:///C:/Users/Mas%20Uno/Desktop/js-testing-introduction/index.html");
    await page.click("input#name");
    await page.type("input#name", "Anna");
    await page.click("input#age");
    await page.type("input#age", "28");
    await page.click("#btnAddUser");
    const finalText = await page.$eval(".user-item", el => el.textContent);
    expect(finalText).toBe("Anna (28 years old)");
}, 10000);