"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

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

export const getCurrentUserClient = async () => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    //* console.log("Session Cookie: ", sessionCookie);

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await auth.verifySessionCookie(
      sessionCookie.value,
      true
    );

    const response = await auth.getUser(decodedClaims.uid);
    const { uid, email, displayName } = response;
    const user = {
      name: displayName,
      email: email,
      id: uid,
    } as User;
    // console.log("user", user);
    return user;
  } catch (error: any) {
    console.log("Error getting current user:", error.message);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUserClient();
  // console.log("Authenticated user", user);

  return !!user;
};
