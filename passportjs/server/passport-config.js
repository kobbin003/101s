import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

export function initializePassport(passport, getUserByEmail, getUserById) {
	const authenticate = async (email, password, done) => {
		const foundUserWithEmail = getUserByEmail(email);
		// console.log("foundUserWithEmail", foundUserWithEmail);
		if (!foundUserWithEmail) {
			return done(null, false, { message: "user not found" });
		}
		try {
			/** check if password is correct */
			const passwordMatches = await bcrypt.compare(
				password,
				foundUserWithEmail.password
			);

			if (passwordMatches) {
				/** SUCCESS*/
				return done(null, foundUserWithEmail);
			} else {
				return done(null, false, { message: "password incorrect" });
			}
		} catch (error) {
			return done(null, false, { message: "serverside error" });
		}
	};

	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			authenticate
		)
	);

	passport.serializeUser((user, done) => {
		/** serialize user for a session */
		/**This function is used to determine what data
		 * from the user object should be stored in the session. */
		return done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		/** deserialize a user */
		const userWithId = getUserById(id);
		return done(null, userWithId);
	});
}
// const x = LocalStrategy.Strategy
