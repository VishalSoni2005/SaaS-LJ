"use client";

import { useEffect } from "react";
import { useDBStore } from "@/lib/store/useDBStore"; // Adjust the import path

const page = () => {
  const {
    customerCollection,
    isFetchingCustomers,
    error,
    fetchCustomerCollection,
  } = useDBStore();

  useEffect(() => {
    fetchCustomerCollection();
  }, [fetchCustomerCollection]);

  if (isFetchingCustomers) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Customer List</h2>
      {customerCollection && customerCollection.length > 0 ? (
        <ul>
          {customerCollection.map((customer) => (
            <li
              className="flex "
              key={customer.customer_id}>
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Contact:</strong> {customer.contact_number}
              </p>
              <p>
                <strong>Address:</strong> {customer.address}
              </p>
              <p>
                <strong>Total Due:</strong> ₹{customer.total_due}
              </p>
              <p>
                <strong>Total Spent:</strong> ₹{customer.total_spent}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(customer.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Purchase:</strong>{" "}
                {new Date(customer.last_purchase).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default page;
