import { supabase } from "@/supabase/supabase";
import { create } from "zustand";
// import { supabase } from "./supabaseClient"; // Make sure to import your Supabase client

// Zustand store type definition
type Store = {
  customerCollection: Customer[] | null;
  isFetchingCustomers: boolean;
  error: string | null;

  fetchCustomerCollection: () => Promise<void>;
};

export const useDBStore = create<Store>((set) => ({
  customerCollection: null,
  isFetchingCustomers: false,
  error: null,

  fetchCustomerCollection: async () => {
    set({ isFetchingCustomers: true, error: null });
    try {
      const { data, error } = await supabase.from("Customer").select("*");

      if (error) throw new Error("Error fetching user: ", error);

      set({
        customerCollection: data as Array<Customer>,
        isFetchingCustomers: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        isFetchingCustomers: false,
      });
      console.log("Error Fetching user from backend");
    }
  },
}));
