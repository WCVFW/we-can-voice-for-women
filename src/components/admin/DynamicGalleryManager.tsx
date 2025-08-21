"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trash, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export interface Album {
  id?: string;
  title: string;
  cover: string; // e.g., /media/image.jpg
  images: string[];
  description?: string;
  createdDate?: string;
  isPublished?: boolean;
  category?: string;
}

export default function DynamicGalleryManager({
  albums,
  onAlbumsChange,
}: {
  albums: Album[];
  onAlbumsChange: (albums: Album[]) => void;
}) {
  const [newAlbum, setNewAlbum] = useState<Album>({
    title: "",
    cover: "",
    images: [],
    description: "",
    category: "general",
    isPublished: false
  });

  const [isUploading, setIsUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File, albumId?: string): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    if (albumId) {
      formData.append("album_id", albumId);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await res.json();
      toast.success(`File uploaded: ${data.originalName}`);
      return data.fileUrl; // e.g. /media/filename.jpg
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed: " + (err as Error).message);
      return null;
    } finally {
      setIsUploading(false);
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

  const addAlbum = async () => {
    if (!newAlbum.title.trim()) {
      toast.error("Please enter an album title");
      return;
    }

    if (!newAlbum.cover) {
      toast.error("Please upload a cover image");
      return;
    }

    try {
      const albumWithMetadata = {
        ...newAlbum,
        id: Date.now().toString(),
        createdDate: new Date().toISOString(),
        images: newAlbum.images.filter(img => img !== "") // Remove empty image slots
      };
      
      const updatedAlbums = [...albums, albumWithMetadata];
      onAlbumsChange(updatedAlbums);
      
      // Reset form
      setNewAlbum({ 
        title: "", 
        cover: "", 
        images: [], 
        description: "",
        category: "general",
        isPublished: false
      });
      
      // Clear file inputs
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
      
      toast.success("Album created successfully!");
    } catch (error) {
      console.error('Failed to create album:', error);
      toast.error("Failed to create album");
    }
  };

  const deleteAlbum = async (albumId: string) => {
    if (confirm('Are you sure you want to delete this album and all its media?')) {
      try {
        const updatedAlbums = albums.filter((album) => album.id !== albumId);
        onAlbumsChange(updatedAlbums);
        toast.success("Album deleted successfully!");
      } catch (error) {
        console.error('Failed to delete album:', error);
        toast.error("Failed to delete album");
      }
    }
  };

  const toggleAlbumPublished = async (albumId: string, currentStatus: boolean) => {
    try {
      const updatedAlbums = albums.map(album => 
        album.id === albumId 
          ? { ...album, isPublished: !currentStatus }
          : album
      );
      onAlbumsChange(updatedAlbums);
      toast.success(`Album ${!currentStatus ? 'published' : 'unpublished'}!`);
    } catch (error) {
      console.error('Failed to update album status:', error);
      toast.error("Failed to update album status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Album Form */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Plus className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Create New Album</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="album-title">Album Title *</Label>
              <Input
                id="album-title"
                value={newAlbum.title}
                onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                placeholder="Enter album title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="album-description">Description</Label>
              <Input
                id="album-description"
                value={newAlbum.description || ''}
                onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                placeholder="Enter album description (optional)"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="album-category">Category</Label>
              <Input
                id="album-category"
                value={newAlbum.category || 'general'}
                onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value })}
                placeholder="e.g., events, gallery, news"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="album-published"
                checked={newAlbum.isPublished || false}
                onChange={(e) => setNewAlbum({ ...newAlbum, isPublished: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="album-published">Publish immediately</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cover-upload">Cover Image *</Label>
              <Input
                id="cover-upload"
                type="file"
                accept="image/*"
                ref={coverInputRef}
                onChange={handleCoverUpload}
                disabled={isUploading}
                className="mt-1"
              />
              {newAlbum.cover && (
                <div className="mt-2">
                  <img
                    src={newAlbum.cover}
                    alt="Cover Preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label>Gallery Images</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageInput}
                  disabled={isUploading}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
              </div>
              
              <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                {newAlbum.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryUpload(e, idx)}
                      disabled={isUploading}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageInput(idx)}
                      disabled={isUploading}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                    {img && (
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={addAlbum}
            disabled={isUploading || !newAlbum.title.trim() || !newAlbum.cover}
            className="min-w-32"
          >
            {isUploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Album
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Existing Albums */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <ImageIcon className="h-5 w-5" />
          <h3 className="font-semibold text-lg">Existing Albums ({albums.length})</h3>
        </div>

        {albums.length === 0 ? (
          <Card className="p-8 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No albums created yet</p>
            <p className="text-sm text-gray-500">Create your first album to get started</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <Card key={album.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100">
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg truncate">{album.title}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAlbum(album.id!)}
                      className="ml-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {album.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{album.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {album.category && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {album.category}
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {album.images.length} photos
                      </span>
                    </div>
                    
                    <Button
                      variant={album.isPublished ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAlbumPublished(album.id!, album.isPublished || false)}
                    >
                      {album.isPublished ? "Published" : "Draft"}
                    </Button>
                  </div>
                  
                  {album.createdDate && (
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(album.createdDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
