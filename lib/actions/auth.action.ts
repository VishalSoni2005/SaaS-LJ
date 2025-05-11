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

export const getCurrentUserClient = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/current-user/",
      {
        withCredentials: true, // Ensures cookies are sent
      }
    );

    console.log("response data", response.data);

    if (response.data?.user) return response.data.user;
    throw new Error("User not found");
  } catch (error: any) {
    console.log("Error getting current user:", error.message);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUserClient();
  console.log("Authenticated user", user);

  return !!user;
};
