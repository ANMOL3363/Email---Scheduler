
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        };

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;

