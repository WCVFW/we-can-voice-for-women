import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { mkdirSync, existsSync } from "fs";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 415 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const fileName = `${nanoid()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "media");

  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return NextResponse.json({
    fileUrl: `/media/${fileName}`,
  });
}
