# note

always write the full axios.get('http://localhost:3000/api/auth/login) code in server side
and on client side you may write ('/app/api/...);


## TABLES 
  

alter table "Customer"
rename to "customers";

-- 2. Invoices Table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY ,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    invoice_date DATE DEFAULT NOW(),
    items JSONB,  -- JSONB for efficient storage and querying
    total_amount NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0.00,
    final_amount NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) DEFAULT 0.00,
    due_amount NUMERIC(10, 2) NOT NULL,
    status TEXT CHECK (status IN ('Paid', 'Unpaid', 'Partial')) DEFAULT 'Unpaid',
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Payments Table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES invoices(id) ON DELETE CASCADE,
    payment_date DATE DEFAULT NOW(),
    amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('Cash', 'Card', 'Online', 'Other')),
    reference VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast searching by customer ID
CREATE INDEX idx_customer_id ON invoices(customer_id);

-- Index for fast searching by invoice ID in payments
CREATE INDEX idx_invoice_id ON payments(invoice_id);

-- Example Trigger to Update Customer's Total Due on Payment
CREATE OR REPLACE FUNCTION update_total_due()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE customers
    SET total_due = (
        SELECT COALESCE(SUM(due_amount), 0)
        FROM invoices
        WHERE customer_id = NEW.customer_id
    )
    WHERE customer_id = NEW.customer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_due_amount
AFTER INSERT OR UPDATE ON invoices
FOR EACH ROW
EXECUTE FUNCTION update_total_due();

@VishalSoni2005
## CURRENT FEATURE WORKING: 

A> in create bill page

  1. create new bill

  2. All Paid Bills
  
  3. Get pending invoices by entering invoice_id or customer name 


