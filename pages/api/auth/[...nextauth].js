import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  //기간설정은 무시됨, github은 access token 유효기간 8시간, refresh token 유효기간 6개월
  jwt: {
    maxAge: 60,
  },
  callbacks: {
    // JWT 사용할 때마다 실행됨, return 오른쪽에 뭐 적으면 그걸 JWT로 만들어서 유저에게 보내줌
    async jwt({ token, account, user }) {
      console.log("account", account);
      console.log("user", user);
      console.log("token", token);

      // 1. 첫 JWT 토큰 만들어주기 (첫 로그인시에만 실행)
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        };
      }

      // 2. 남은 시간이 임박한 경우 access token 재발급하기
      // 지금은 개발중이라 8시간 - 10초 남았을 때 재발급중
      let 남은시간 = token.accessTokenExpires - Math.round(Date.now() / 1000);
      if (남은시간 < 60 * 60 * 8 - 10) {
        console.log("유효기간 얼마안남음");
        let 새로운JWT = await refreshAccessToken(token); // 3. 깃헙에게 재발급해달라고 조르기
        console.log("새로운 JWT : ", 새로운JWT);
        return 새로운JWT;
      } else {
        return token;
      }
    },

    //getServerSession 실행시 토큰에 있던 어떤 정보 뽑아서 컴포넌트로 보내줄지 결정가능
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
