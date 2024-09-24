
export const authOptions = {
  providers: [
{
      id: "adobe",
      name: "Adobe",
      clientId: process.env.ADOBE_CLIENT_ID as string,
      authorization: {
        url: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        params: { response_type: "code", scope: "openid,lr_partner_apis" },
      },
      token: "https://ims-na1.adobelogin.com/ims/token/v3",
      userinfo: "https://ims-na1.adobelogin.com/ims/profile/v2",
      wellKnown:
        "https://ims-na1.adobelogin.com/ims/.well-known/openid-configuration",
      profile(profile:{ sub: string; name: string; email: string; picture: string }) {
        console.log(JSON.stringify(profile, null, 2));
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};
