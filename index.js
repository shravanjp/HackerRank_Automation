const puppeteer=require('puppeteer');
const codeObj = require('./code.js');
const targetLink="https://www.hackerrank.com/auth/login";
const email="vinodaj1974@gmail.com";
const password="test123";
const browserPromise=puppeteer.launch({
  headless:false,
  args:['--start-maximized'],
  defaultViewport:null
});

let page,page1;
browserPromise.then(function(bObj){
  const newPagePromise = bObj.newPage();
  return newPagePromise;
}).then(function(tab){
  page=tab;
  const hackerRankPromise = page.goto(targetLink);
  return hackerRankPromise;
}).then(function(){
  const emailEntered = page.type("input[id='input-1']",email,{delay : 0});
  return emailEntered;
}).then(function(){
  const passwordEntered=page.type("input[type='password']",password,{delay : 0});
  return passwordEntered;
}).then(function(){
  const loginBtnClicked = page.click("button[data-analytics='LoginPassword']",{delay : 0});
  return loginBtnClicked;
}).then(function(){
  const clickOnAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']",page);
  return clickOnAlgoPromise;
}).then(function(){
  const getToWarmUp = waitAndClick("input[value='warmup']",page);
  return getToWarmUp;
}).then(function(){
  const waitTillPageLoaded = page.waitForTimeout(50);
  return waitTillPageLoaded;
}).then(function(){
  const allChallengePromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay : 10});
  return allChallengePromise;
}).then(function(qsnArr){
  const questionSolved = questionSolver(qsnArr[0],codeObj.answers[0]);
})


function waitAndClick(selector,currPage){
  return new Promise(function(resolve,reject){
    const waitForModelPromise = currPage.waitForSelector(selector);
    waitForModelPromise.then(function(){
      const clickModelPromise = currPage.click(selector);
      return clickModelPromise;
    }).then(function(){
      resolve();
    }).catch(function(err){
      reject();
    })
  })
}

function questionSolver(question,answer){
  return new Promise(function(resolve,reject){
    const questionClicked = question.click();
    questionClicked.then(function(){
      const editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page);
      return editorInFocusPromise;
    }).then(function(){
      return waitAndClick('.checkbox-input',page);
    }).then(function(){
      return page.waitForSelector('.input.text-area.custominput.auto-width');
    }).then(function(){
      return page.type('.input.text-area.custominput.auto-width', answer , {delay:10});
    }).then(function(){
      return ctrlIsPressed=page.keyboard.down('Control');
    }).then(function(){
      return AIsPressed = page.keyboard.press('A');
    }).then(function(){
      return CIsPressed = page.keyboard.press('C');
    }).then(function(){
      return XIsPressed = page.keyboard.press('X');
    }).then(function(){
      return page.keyboard.up('Control');
    }).then(function(){
      const mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page);
      return mainEditorInFocus;
    }).then(function(){
      return ctrlIsPressed=page.keyboard.down('Control');
    }).then(function(){
      return AIsPressed = page.keyboard.press('A');
    }).then(function(){
      return VIsPressed = page.keyboard.press('V');
    }).then(function(){
      return page.keyboard.up('Control');
    }).then(function(){
      return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
    }).then(function(){
      resolve();
    }).catch(function(err){
      reject();
    })
  })
}

