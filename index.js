const puppeteer=require('puppeteer');
const codeObj = require('./code.js');
const targetLink="https://www.hackerrank.com/auth/login";
const email="vinodaj1974@gmail.com";
const password="test123";
let page;

(async function(){
  try{
      const browserInstance=puppeteer.launch({
      headless:false,
      args:['--start-maximized'],
      defaultViewport:null
      });

      page = await (await browserInstance).newPage();
      await page.goto(targetLink);
      await page.type("input[id='input-1']",email,{delay : 0});
      await page.type("input[type='password']",password,{delay : 0});
      await page.click("button[data-analytics='LoginPassword']",{delay : 0});
      await waitAndClick(".topic-card a[data-attr1='algorithms']",page);
      await waitAndClick("input[value='warmup']",page);
      await page.waitForTimeout(50);
      const allQuestions = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 10});
      for(let i = 0; i <= 0; i++){
        questionSolver(allQuestions[i], codeObj.answers[i]);
      }
  }
  catch(err){
    console.log(err);
  }
})();

async function waitAndClick(selector,currPage){
  try{
    await currPage.waitForSelector(selector);
    const selectorClicked = await currPage.click(selector);
    return selectorClicked;
  }catch(err){
    console.log('The error is',err);
  }
}

async function questionSolver(question, answer){
    await question.click();
    waitAndClick('.monaco-editor.no-user-select.vs',page);
    waitAndClick('.checkbox-input',page);
    await page.waitForSelector('.input.text-area.custominput.auto-width');
    await page.type('.input.text-area.custominput.auto-width', answer , {delay:10});
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('X');
    await page.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.vs',page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
}

