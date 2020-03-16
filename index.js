const puppeteer = require('puppeteer');

let electronicUrl = 'https://nshopvn.com/';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(electronicUrl);

  let electronicData = await page.evaluate(() => {
    let products = [];
    let product_wrapper = document.querySelectorAll('.product-wrapper');
    product_wrapper.forEach((product) => {
      let dataJson = {};
      try {
        dataJson.img = product.querySelector('.image > img').src;
        dataJson.title = product.querySelector('.woocommerce-loop-product__title').innerText;
        dataJson.price = product.querySelector('.price').innerText;
      }
      catch (err) {
          console.log(err)
      }
      products.push(dataJson);
    });
    return products;
  });

   console.log(electronicData);
})();
