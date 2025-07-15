// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const uploadDir = path.join(process.cwd(), "public", "media");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    // let formidable generate a safe filename
    filename: (name, ext, part) => {
      // part is a formidable File
      const original = (part as unknown as File).originalFilename || part.name;
      const safeBase = original.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\.]/g, "");
      return `${Date.now()}-${safeBase}`;
    },
  });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    // `files.file` matches the form field name `<input name="file" />`
    const uploaded = files.file;
    // Handle single-file or array
    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    const f = file as File;

    // The actual path on disk
    const filepath = f.filepath;
    // The generated filename (from our `filename` fn)
    const filename = f.newFilename || path.basename(filepath);

    // URL to serve the file from /public/media
    const fileUrl = `/media/${filename}`;

    return res.status(200).json({ fileUrl });
  });
}
