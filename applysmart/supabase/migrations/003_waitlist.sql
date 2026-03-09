CREATE TABLE IF NOT EXISTS waitlist (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  name       TEXT,
  role       TEXT,
  position   INT,
  confirmed  BOOLEAN DEFAULT false,
  invited    BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION assign_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := (SELECT COALESCE(MAX(position), 0) + 1 FROM waitlist);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS waitlist_position_trigger ON waitlist;
CREATE TRIGGER waitlist_position_trigger
  BEFORE INSERT ON waitlist
  FOR EACH ROW EXECUTE FUNCTION assign_waitlist_position();

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_can_signup" ON waitlist;
CREATE POLICY "public_can_signup" ON waitlist
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "no_public_read" ON waitlist;
CREATE POLICY "no_public_read" ON waitlist
  FOR SELECT USING (false);
