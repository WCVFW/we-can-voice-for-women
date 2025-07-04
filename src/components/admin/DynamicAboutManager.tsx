import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, Upload, Pencil } from 'lucide-react';

export default function DynamicAboutManager({ type }) {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
    social: {
      linkedin: '',
      twitter: '',
      email: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in newMember.social) {
      setNewMember({
        ...newMember,
        social: { ...newMember.social, [name]: value },
      });
    } else {
      setNewMember({ ...newMember, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setNewMember({ ...newMember, image: imageUrl });
  };

  const addMember = () => {
    if (!newMember.name || !newMember.title) return;
    setMembers([...members, { ...newMember, id: Date.now() }]);
    setNewMember({
      name: '',
      title: '',
      bio: '',
      image: '',
      social: { linkedin: '', twitter: '', email: '' },
    });
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={newMember.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Title</Label>
          <Input name="title" value={newMember.title} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Label>Bio</Label>
          <Textarea name="bio" value={newMember.bio} onChange={handleChange} rows={3} />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input name="linkedin" value={newMember.social.linkedin} onChange={handleChange} />
        </div>
        <div>
          <Label>Twitter</Label>
          <Input name="twitter" value={newMember.social.twitter} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" value={newMember.social.email} onChange={handleChange} />
        </div>
        <div>
          <Label>Upload Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
      <Button onClick={addMember} className="mt-2 w-full">Add {type === 'team' ? 'Team Member' : 'Leader'}</Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <img src={member.image} alt={member.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h4 className="font-bold text-lg">{member.name}</h4>
            <p className="text-sm text-gray-600">{member.title}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-3">{member.bio}</p>
            <div className="flex justify-end mt-2">
              <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}