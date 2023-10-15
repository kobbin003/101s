import puppeteer, { ElementHandle, Page } from "puppeteer";
import "dotenv/config";
const BASE_URL = "https://twitter.com/";
const LOGIN_URL = "https://twitter.com/login";
const USERNAME_URL = (username: string) => `https://twitter.com/${username}`;

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const loginUsername = async (page: Page, username: string) => {
	const usernameClassname =
		"r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";
	const usernameInputXpath = `//input[@class='${usernameClassname}']`;
	const classArray = usernameClassname.split(" ");
	classArray.unshift("input");
	const usernameSelector = classArray.join(".");

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
			const nextButton = await page.$x(
				'//div[@role="button"]//span[text()="Next"]'
			);
			if (nextButton.length > 0) {
				// click the next button
				await (nextButton[0] as ElementHandle<Element>).click();
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const loginPassword = async (page: Page, password: string) => {
	const passwordClassname =
		"r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-1dz5y72 r-fdjqy7 r-13qz1uu";

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
			const loginButton = await page.$x(
				'//div[@data-testid="LoginForm_Login_Button"]'
			);

			if (loginButton.length > 0) {
				console.log("login-button");
				// click the login button
				await (loginButton[0] as ElementHandle<Element>).click();
			}
		}
	} catch (error) {}
};

const navigateTo = async (page: Page, URL: string) => {
	await page.goto(URL, { waitUntil: "networkidle2" });
};

const getStatusContent = async (page: Page, username: string) => {
	console.log("get status content");
	const tweetXPath = '//article[@data-testid="tweet"]';
	await page.waitForXPath(tweetXPath);

	const tweetProfilePicDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[2]/div[1]';
	const tweetNamesDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[2]/div[2]/div[1]';
	const tweetTextDivXPath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[1]';
	const tweetImgDivXpath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[2]/div/div[1]';
	const tweetLinkedDivXpath =
		'//article[@data-testid="tweet"]/div/div/div[3]/div[2]/div/div[2]';

	/* ----------------------------------- tweet div ---------------------------------- */
	const tweetDivs = await page.$x(tweetXPath);
	if (tweetDivs.length > 0) {
		// console.log("got tweet div");
		// const statusDiv = tweetDivs[0];
		/* ------------------------------ profile Image ----------------------------- */
		const profileImageDivs = await page.$x(tweetProfilePicDivXPath);
		if (profileImageDivs.length > 0) {
			const profileImage = await profileImageDivs[0].$$(
				`div[data-testid="UserAvatar-Container-${username}"] img`
			);
			if (profileImage.length > 0) {
				console.log("got tweet div image");

				const src = await profileImage[0].getProperty("src");
				const image = await src.jsonValue();
				console.log("image", image);
			}
		}
		/* ------------------------------- full name ------------------------------- */
		const namesDivs = await page.$x(tweetNamesDivXPath);
		if (namesDivs.length > 0) {
			const fullNames = await namesDivs[0].$$(
				'div[data-testid="User-Name"] div span > span'
			);
			if (fullNames.length > 0) {
				const fullNameStatus = await page.evaluate(
					(el) => el.textContent,
					fullNames[0]
				);
				console.log("fullNameStatus", fullNameStatus);
			}
		}

		/* ------------------------------- tweet text ------------------------------- */
		const tweetDivs = await page.$x(tweetTextDivXPath);
		if (tweetDivs.length > 0) {
			const tweets = await tweetDivs[0].$$('div[data-testid="tweetText"]');
			if (tweets.length > 0) {
				const mainTweet = tweets[0];
				const statusText = await page.evaluate((el) => {
					return el.textContent;
				}, mainTweet);
				console.log("tweetText", statusText);
			}
		}

		/* ------------------------------- tweet photo ------------------------------ */
		const tweetImageDivs = await page.$x(tweetImgDivXpath);
		if (tweetImageDivs.length > 0) {
			// const tweetPhotos = await tweetImageDivs[0].$$("img");
			const tweetPhotos = await tweetImageDivs[0].$$(
				"div[data-testid='tweetPhoto'] img"
			);
			if (tweetPhotos.length > 0) {
				tweetPhotos.forEach(async (photo, index) => {
					const tweetPhoto = await photo.getProperty("src");
					const src = await tweetPhoto.jsonValue();
					console.log(`tweet photo-${index}`, src);
				});
			}
		}

		/* ----------------------- linked tweet ----------------------- */
		const linkedTweetDiv = await page.$x(tweetLinkedDivXpath);
		if (linkedTweetDiv.length > 0) {
			/* ----------------------- linked tweet profile image ----------------------- */
			const profileImageLinkTweet = await linkedTweetDiv[0].$$(
				`div[data-testid="Tweet-User-Avatar"] img`
			);
			if (profileImageLinkTweet.length > 0) {
				console.log("got linked tweet div image");

				const src = await profileImageLinkTweet[0].getProperty("src");
				//* profileImageLinkTweet[1] -> you will get the profile image of the main tweet
				const image = await src.jsonValue();
				console.log("linkedtweetProfileImage", image);
			}
			/* -------------------------- linked tweet username ------------------------- */

			const usernames = await linkedTweetDiv[0].$$(
				'div[data-testid="User-Name"] > div:nth-of-type(2) span'
			);
			// console.log("allNames", allNames);
			if (usernames.length > 0) {
				const usernameLinkedTweet = await page.evaluate(
					(el) => el.textContent,
					usernames[0]
				);
				console.log(`usernameLinkedTweet`, usernameLinkedTweet);
			}

			// /* ------------------------------- linked tweet full name ------------------------------- */
			const fullNames = await linkedTweetDiv[0].$$(
				'div[data-testid="User-Name"] div:nth-of-type(1) span > span'
			);
			if (fullNames.length > 0) {
				const fullNameStatus = await page.evaluate(
					(el) => el.textContent,
					fullNames[0]
				);
				console.log("linkedfullNameStatus", fullNameStatus);
			}

			/* --------------------------- linked tweet photos --------------------------- */
			const linkedTweetPhotos = await linkedTweetDiv[0].$$(
				"div[data-testid='tweetPhoto'] img"
			);
			if (linkedTweetPhotos.length > 0) {
				linkedTweetPhotos.forEach(async (photo, index) => {
					const tweetPhoto = await photo.getProperty("src");
					const src = await tweetPhoto.jsonValue();
					console.log(`linked tweet photo-${index}`, src);
				});
			}
		} else {
			console.log("there is no linked tweet");
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

		const cookies = await page.cookies();
		await page.setCookie(...cookies);
		await page.goto("https://twitter.com/kkob03/status/1713527996722635185");
		await page.goto(LOGIN_URL, { waitUntil: "networkidle2" });

		// creating a delay of 2sec.(necessary for browsers unpredictibility)
		// await new Promise((r) => setTimeout(r, 2000));

		const username = process.env.USERNAMETWEET;
		const password = process.env.PASSWORDTWEET;
		// console.log(username, password);

		await loginUsername(page, username);
		await loginPassword(page, password);

		// go to a specific status
		await navigateTo(
			page,
			"https://twitter.com/kkob03/status/1713527996722635185"
		);

		// get the tweets content
		const tweetUsername = "kkob03";
		await getStatusContent(page, tweetUsername);
	} catch (error) {
		console.log(error);
	}
};

export default runX;
