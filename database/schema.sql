-- Create the survey_responses table
CREATE TABLE survey_responses (
  id BIGSERIAL PRIMARY KEY,
  age INTEGER NOT NULL,
  had_sex BOOLEAN, -- NULL means "prefer not to answer"
  first_sex_age INTEGER,
  partner_age INTEGER,
  would_change BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (public access for survey)
CREATE POLICY "Allow public inserts" ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (optional, for data analysis)
CREATE POLICY "Allow public reads" ON survey_responses
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for common queries
CREATE INDEX idx_created_at ON survey_responses(created_at);
CREATE INDEX idx_had_sex ON survey_responses(had_sex);
CREATE INDEX idx_age ON survey_responses(age);

