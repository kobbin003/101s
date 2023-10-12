import puppeteer from "puppeteer";
import "dotenv/config";
const BASE_URL = "https://twitter.com/";
const LOGIN_URL = "https://twitter.com/login";
const USERNAME_URL = (username) => `https://twitter.com/${username}`;
let browser;
let page;
const loginUsername = async (page, username) => {
    const usernameClassname = "r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";
    const usernameInputXpath = `//input[@class='${usernameClassname}']`;
    try {
        // wait till the desired element is loaded in the screen
        await page.waitForXPath(usernameInputXpath);
        // select the username input
        const usernameInput = await page.$x(usernameInputXpath);
        if (usernameInput.length > 0) {
            // focus on the username input
            await usernameInput[0].focus();
            // enter the username in the username input
            await page.keyboard.type(username, { delay: 100 });
            // select the next button to go to password page
            const nextButton = await page.$x('//div[@role="button"]//span[text()="Next"]');
            if (nextButton.length > 0) {
                // click the next button
                await nextButton[0].click();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
const loginPassword = async (page, password) => {
    const passwordClassname = "r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";
    const passwordInputXpath = `//input[@class='${passwordClassname}' and @type='password']`;
    try {
        // wait till the desired element is loaded in the screen
        await page.waitForXPath(passwordInputXpath);
        // select the password input
        const passwordInput = await page.$x(passwordInputXpath);
        if (passwordInput.length > 0) {
            console.log("pass-input");
            // focus on the password input
            await passwordInput[0].focus();
            // enter the password in the username input
            await page.keyboard.type(password, { delay: 100 });
            // select the login button to go to password page
            const loginButton = await page.$x('//div[@data-testid="LoginForm_Login_Button"]');
            if (loginButton.length > 0) {
                console.log("login-button");
                // click the login button
                await loginButton[0].click();
            }
        }
    }
    catch (error) { }
};
const navigateTo = async (page, URL) => {
    await page.goto(URL, { waitUntil: "networkidle2" });
};
const getStatusContent = async (page) => {
    console.log("get status content");
    const tweetXPath = '//article[@data-testid="tweet"]';
    await page.waitForXPath(tweetXPath);
    const statusDiv = await page.$x(tweetXPath);
    if (statusDiv.length > 0) {
        console.log("got tweet div");
        const username = "ronawang";
        const profileImage = await page.$x(`//article//div[@data-testid="UserAvatar-Container-${username}"]//img`);
        if (profileImage.length > 0) {
            console.log("got tweet div image");
            // const styleAttribute = await page.evaluate(() => {
            // 	const div = document.querySelector(
            // 		`article div[data-testid="UserAvatar-Container-ronawang"] img`
            // 	);
            // 	console.log("div", div);
            // 	const profileImage = div.getAttribute("src");
            // 	return profileImage;
            // });
            const src = await profileImage[0].getProperty("src");
            const image = await src.jsonValue();
            console.log("image", image);
        }
        const tweets = await page.$x('//article[@data-testid="tweet"]//div[@data-testid="tweetText"]');
        if (tweets.length > 0) {
            const mainTweet = tweets[0];
            const tweetText = await page.evaluate((el) => {
                return el.textContent;
            }, mainTweet);
            console.log("tweetText", tweetText);
        }
    }
};
const runX = async () => {
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {
                width: 1280,
                height: 800,
            },
        });
        page = await browser.newPage();
        await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });
        // await page.waitForTimeout(2000);
        // creating a delay of 2sec.(necessary for browsers unpredictibility)
        // await new Promise((r) => setTimeout(r, 2000));
        const username = process.env.USERNAMETWEET;
        const password = process.env.PASSWORDTWEET;
        // console.log(username, password);
        await loginUsername(page, username);
        await loginPassword(page, password);
        // go to a specific status
        await navigateTo(page, "https://twitter.com/ronawang/status/1712299136215548131");
        //
        await getStatusContent(page);
    }
    catch (error) {
        console.log(error);
    }
};
export default runX;
//# sourceMappingURL=twitter.js.map