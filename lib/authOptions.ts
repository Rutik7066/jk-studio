import Auth0 from "next-auth/providers/auth0";

export const authOptions = {
  providers: [
    Auth0({
      id: "adobe",
      name: "Adobe",
      clientId: process.env.ADOBE_CLIENT_ID || "",
      clientSecret: process.env.ADOBE_CLIENT_SECRET || "",
      authorization: {
        url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        params: {
          response_type: "code",
          scope:
            "openid,creative_sdk,profile,address,AdobeID,email,cc_files,cc_libraries",
        },
      },
      token: "https://ims-na1.adobelogin.com/ims/token/v3",
      userinfo: "https://ims-na1.adobelogin.com/ims/userinfo/v2",
      wellKnown:
        "https://ims-na1.adobelogin.com/ims/.well-known/openid-configuration",
      profile(profile, token) {
        return {
          id: profile.sub,
          profile: { ...profile },
          token: { ...token },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // If it's the initial sign-in, add the access token to the JWT
      if (account) {
        console.log(JSON.stringify(account, null, 2));
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
      }
      return token;
    },

    async session({ session, token }) {
      // Add the access token to the session object
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "",
};
