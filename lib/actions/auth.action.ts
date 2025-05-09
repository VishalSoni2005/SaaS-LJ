"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export const Login = async (UserData: loginInParams) => {
  const { email, idToken } = UserData;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "User logged in successfully",
    };
  } catch (error: any) {
    console.error("Error logging in user:", error);
    console.log("Error in auth action", error.code);

    return {
      success: false,
      message: "Invalid credentials",
    };
  }
};

export const Register = async (UserData: RegisterParams) => {
  const { uid, name, email } = UserData;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    console.log("Error in auth action", error.code);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    });

    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error: any) {
    console.error("Error setting session cookie:", error);
    throw new Error("Failed to set session cookie");
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaim = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db.collection("users").doc(decodedClaim.uid).get();

    if (!userRecord.exists) {
      return null;
    }

    const userData = userRecord.data() as User;

    console.log("userData", userData);
    

    return {
      ...userData,
      id: decodedClaim.uid,
    };
  } catch (error: any) {
    console.error("Error retrieving current user:", error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  console.log("user", user);
  
  return !!user;
};
