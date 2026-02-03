# Setup Guide for MyFirstResume

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Set Up Supabase Database**
   
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL script from `README.md` (Database Setup section)
   - This creates all necessary tables

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:3000`

## Getting Your API Keys

### Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### OpenAI Setup
1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to API Keys
3. Create a new secret key
4. Copy it → `OPENAI_API_KEY`

## Database Schema

The SQL script in `README.md` creates:
- `resumes` - Main resume records
- `personal_info` - Contact information
- `work_experience` - Job history
- `education` - Educational background
- `skills` - Technical and soft skills
- `projects` - Project portfolio
- `certifications` - Professional certifications

## Project Structure

```
myfirstresume/
├── app/
│   ├── api/              # API routes (server-side)
│   ├── upload/           # Upload resume page
│   ├── linkedin/         # LinkedIn paste page
│   ├── blank/            # Start from scratch page
│   ├── resume/
│   │   ├── questions/    # Question flow
│   │   └── edit/        # Resume editor/preview
│   └── page.js           # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   └── resume/           # Resume template
├── lib/
│   ├── supabase/         # Supabase clients
│   ├── openai.js         # OpenAI integration
│   ├── file-parser.js    # PDF/DOCX parsing
│   ├── questions.js      # Question flow logic
│   └── pdf-export.js     # PDF generation
└── middleware.js         # Supabase auth middleware
```

## Features Implemented

✅ Landing page with 3 input methods
✅ File upload (PDF/DOCX) with parsing
✅ LinkedIn profile parsing
✅ Blank resume builder with guided questions
✅ Smart question flow (AI-generated for uploads/LinkedIn)
✅ ATS-optimized resume template
✅ Live preview
✅ PDF export
✅ Supabase integration for saving
✅ Anonymous session support
✅ Optional user authentication

## Troubleshooting

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

### OpenAI API errors
- Check your API key is correct
- Ensure you have credits in your OpenAI account
- Check rate limits

### Supabase connection errors
- Verify your Supabase URL and anon key
- Check that tables are created (run SQL script)
- Check Supabase project is active

### PDF export not working
- Ensure you're using a modern browser
- Check browser console for errors
- PDF export requires client-side rendering

## Next Steps

1. Customize the resume template styling
2. Add more question variations
3. Implement user authentication UI
4. Add resume sharing functionality
5. Implement resume analytics
6. Add more templates

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all environment variables are set
4. Ensure database tables are created
