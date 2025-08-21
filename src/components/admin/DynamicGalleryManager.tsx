"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";

export interface Album {
  title: string;
  cover: string; // e.g., /media/image.jpg
  images: string[];
}

export default function DynamicGalleryManager({
  albums,
  setAlbums,
}: {
  albums: Album[];
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>;
}) {
  const [newAlbum, setNewAlbum] = useState<Album>({
    title: "",
    cover: "",
    images: [],
  });

  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      return data.fileUrl; // e.g. /media/filename.jpg
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await handleUpload(file);
      if (url) {
        setNewAlbum((prev) => ({ ...prev, cover: url }));
      }
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await handleUpload(file);
      if (url) {
        const updated = [...newAlbum.images];
        updated[idx] = url;
        setNewAlbum((prev) => ({ ...prev, images: updated }));
      }
    }
  };

  const addImageInput = () => {
    setNewAlbum((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageInput = (idx: number) => {
    setNewAlbum((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const addAlbum = () => {
    if (!newAlbum.title || !newAlbum.cover || newAlbum.images.length === 0) return;
    setAlbums((prev) => [...prev, newAlbum]);
    setNewAlbum({ title: "", cover: "", images: [] });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-4">Add New Album</h3>

        <Label>Title</Label>
        <Input
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
        />

        <Label className="mt-2">Cover Image</Label>
        <Input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverUpload}
        />
        {newAlbum.cover && (
          <img
            src={newAlbum.cover}
            alt="Cover Preview"
            className="w-40 h-24 object-cover my-2 rounded"
          />
        )}

        <Label className="mt-2">Gallery Images</Label>
        {newAlbum.images.map((img, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleGalleryUpload(e, idx)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeImageInput(idx)}
            >
              <Trash className="w-4 h-4" />
            </Button>
            {img && (
              <img
                src={img}
                alt={`Preview ${idx}`}
                className="w-16 h-16 object-cover rounded"
              />
            )}
          </div>
        ))}
        <Button variant="outline" type="button" onClick={addImageInput}>
          Add Gallery Image
        </Button>

        <Button
          className="mt-4 bg-pink-600 hover:bg-pink-700"
          type="button"
          onClick={addAlbum}
        >
          Add Album
        </Button>
      </Card>

      <div>
        <h3 className="font-semibold mb-2">Existing Albums</h3>
        <ul className="space-y-2">
          {albums.map((album, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded flex justify-between"
            >
              <div>
                <strong>{album.title}</strong>
                <p className="text-xs text-gray-500">
                  {album.images.length} photos
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() =>
                  setAlbums((prev) => prev.filter((_, i) => i !== index))
                }
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
