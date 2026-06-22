-- Create a storage bucket for images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist to avoid duplication errors
DROP POLICY IF EXISTS "Public Read Access on images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin CRUD Access on images bucket" ON storage.objects;

-- Create policies for the images bucket
CREATE POLICY "Public Read Access on images bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Admin CRUD Access on images bucket"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'images' AND public.is_admin())
WITH CHECK (bucket_id = 'images' AND public.is_admin());
