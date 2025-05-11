"use server";
import { auth, db } from "@/firebase/admin";
import axios from "axios";
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

// export const getCurrentUser = async (): Promise<User | null> => {
//   try {
//     const cookieStore = await cookies();
//     const sessionCookie = cookieStore.get("session")?.value;

//     if (!sessionCookie) {
//       console.log("Session cookie not found");
//       return null;
//     }

//     try {
//       const decodedClaim = await auth.verifySessionCookie(sessionCookie, true);
//       const userRecord = await auth.getUser(decodedClaim.uid);

//       return {
//         id: userRecord.uid,
//         email: userRecord.email || "",
//         name: userRecord.displayName || "",
//       };
//     } catch (error: any) {
//       // Check if the error is related to an expired session
//       if (error.code === "auth/session-cookie-expired") {
//         console.error("Session expired. Redirecting to login.");
//         // Clear the expired session cookie
//         cookieStore.set("session", "", { maxAge: -1, path: "/" });
//       } else {
//         console.error("Error verifying session cookie:", error);
//       }
//       return null;
//     }
//   } catch (error: any) {
//     console.error("Error retrieving current user:", error);
//     return null;
//   }
// };

export const getCurrentUserClient = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/current-user/",
      {
        withCredentials: true, // Ensures cookies are sent
      }
    );

    //! null user is comming
    console.log("response data", response.data);

    if (response.data.user) return response.data.user;
    // else throw new Error("Failed to get current user");
  } catch (error) {
    console.log("Error getting current user ;", error);

    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUserClient();

  return !!user;
};
