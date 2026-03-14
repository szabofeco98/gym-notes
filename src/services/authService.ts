import { account } from "@/src/config";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { ID, OAuthProvider } from "react-native-appwrite";

export const authService = {
  register: async (email: string, password: string, name: string) => {
    await account.create({ userId: ID.unique(), email, password, name });
    return authService.login(email, password);
  },

  login: async (email: string, password: string) => {
    await account.createEmailPasswordSession({
      email,
      password,
    });

    return account.get();
  },

  logout: async () => {
    await account.deleteSession({ sessionId: "current" });
  },

  getCurrentUser: async () => {
    return account.get();
  },

  loginWithGoogle: async () => {
    const redirectUri = Linking.createURL("/");
    const oauthUrl = account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectUri,
      failure: redirectUri,
    });
    if (!oauthUrl) {
      throw new Error("Failed to generate Google OAuth URL.");
    }
    const result = await openAuthSessionAsync(oauthUrl.toString(), redirectUri);
    if (result.type !== "success") {
      throw new Error("Google sign-in was cancelled or failed.");
    }
    const url = new URL(result.url);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");
    if (!userId || !secret) {
      throw new Error("Google sign-in failed: missing credentials.");
    }
    await account.createSession({ userId, secret });
    return account.get();
  },
};
