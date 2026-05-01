import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from 'resend';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, budget, message } = req.body;
    
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.warn("⚠️  RESEND_API_KEY is missing in your .env file!");
      return res.json({ 
        success: true, 
        message: "Form received! Note: Email was NOT sent because the API Key is missing locally." 
      });
    }

    try {
      console.log(`📩 Attempting to send email from ${name}...`);
      const resend = new Resend(resendKey);
      
      const { data, error } = await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: 'tanuwarhade@gmail.com', // Your email
        subject: `New Project Inquiry from ${name}`,
        reply_to: email,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("❌ Resend API Error:", error);
        return res.status(500).json({ success: false, message: error.message });
      }

      console.log("✅ Email sent successfully!", data);
      return res.json({ success: true, message: "Thank you! Your message has been sent successfully." });
    } catch (err) {
      console.error("❌ Server Error:", err);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();