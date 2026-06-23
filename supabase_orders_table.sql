-- Create the orders table
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    product_name text NOT NULL,
    price text NOT NULL,
    customer_name text NOT NULL,
    customer_phone text NOT NULL,
    customer_address text NOT NULL,
    status text DEFAULT 'pending_call' NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone (authenticated or anonymous) to insert an order
CREATE POLICY "Anyone can insert an order" 
ON public.orders FOR INSERT 
TO public
WITH CHECK (true);

-- Allow users to see their own orders (if logged in)
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Note: Admins can view/edit all orders directly through the Supabase Dashboard.
