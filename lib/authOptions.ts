import Auth0 from "next-auth/providers/auth0";

export const authOptions = {
  providers: [
    Auth0({
      id: "adobe",
      name: "Adobe",
      clientId: process.env.ADOBE_CLIENT_ID || "",
      clientSecret: process.env.ADOBE_CLIENT_SECRET || "",
      authorization: {
        url: "https://ims-na1.adobelogin.com/ims/authorize",
        params: {
          response_type: "code",
          scope: "openid,creative_sdk",
        },
      },
      token: "https://ims-na1.adobelogin.com/ims/token",
      userinfo: "https://ims-na1.adobelogin.com/ims/userinfo",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
};
