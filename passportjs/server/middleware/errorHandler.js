export const errorHandler = (err, req, res, next) => {
	const isProduction = process.env.NODE_ENV === "production";

	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	/** keep the error format of 'errorHandler' and 'express-validator' same */
	res.json({
		errors: [
			{
				statusCode,
				msg: err.message,
				stack: isProduction ? null : err.stack,
			},
		],
	});
};
