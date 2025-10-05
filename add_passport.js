// Add this after CORS configuration in server.ts

// Passport configuration
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Create new user if doesn't exist
    user = new User({
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      googleId: profile.id,
      avatar: profile.photos?.[0]?.value,
      role: 'student',
      level: 1,
      xp: 0
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Initialize Passport
app.use(passport.initialize());
