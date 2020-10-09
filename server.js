const express = require("express");
const app = express();
const port = 5000;
const puppeteer = require("puppeteer");

app.get("/", (req, res) => {
  res.send("Hello froms server");
});

app.get(`/api/webpagelinks`, async (req, res) => {
  // app.get(`/api/webpagelinks/${inputUrl}`, async (req, res) => {
  const websiteUrl = req.params.inputUrl;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const pageLinks = [];
  await page.goto("https://www.rodmartinezmedina.dev");

  // const searchedLinks = await page.$$eval("a", (link) => pageLinks.push(el.value));
  const searchedLinks = await page.$$eval("a", (link) =>
    link.map((a) => a.href)
  );
  console.log(searchedLinks);
  res.json(searchedLinks);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//USEFULL EXAMPLES

// const searchValFunc = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.rodmartinezmedina.dev");
//   const searchValue = await page.$eval("a", (el) => el.value);
//   console.log(searchValue);
//   return searchValue;
// };

// const preloadHrefFunc = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.rodmartinezmedina.dev");
//   const preloadHref = await page.$eval("link[rel=preload]", (el) => el.href);
//   return preloadHref;
// };

// GeneraPdf() {
//   (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://google.com');
//     await page.pdf({path: 'hn.pdf', format: 'A4'});

//     await browser.close();
//   })();
// }
