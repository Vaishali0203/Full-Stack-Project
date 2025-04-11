const puppeteer = require("puppeteer");

const preview = async (crystal, userId) => {
  const { url } = crystal;
  if (!url) return { error: "URL required" };

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    console.log("Navigating to:", url);
    const response = await page.goto(url, {
      waitUntil: "networkidle2", // wait until no network requests for 500ms
      timeout: 20000,
    });

    const status = response.status();
    const html = await page.content();

    console.log("Page status:", status);
    console.log("Page content preview:\n", html.substring(0, 500)); // debug

    const meta = await page.evaluate(() => {
      const getMeta = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.content : null;
      };

      return {
        title:
          getMeta("meta[property='og:title']") ||
          getMeta("meta[name='title']") ||
          document.title ||
          "No title",
        description:
          getMeta("meta[property='og:description']") ||
          getMeta("meta[name='description']") ||
          "No description available",
        image: getMeta("meta[property='og:image']") || null,
        url: window.location.href,
      };
    });

    await browser.close();

    console.log("Fetched meta:", meta);

    return {
      ...crystal,
      addedBy: userId,
      meta,
    };
  } catch (err) {
    if (browser) await browser.close();
    console.error("Puppeteer error:", err);

    return {
      ...crystal,
      addedBy: userId,
      meta: {
        title: `${err.message} - Unknown`,
        description: "No description available",
        url: url,
      },
    };
  }
};

module.exports = { preview };
