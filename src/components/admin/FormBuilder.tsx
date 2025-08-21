import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Trash2, Edit, Move, Eye, Copy, Settings,
  Type, Mail, Phone, Calendar, Check, Radio,
  Upload, Star, Hash, Link, Image, FileText
} from 'lucide-react';
import { toast } from 'sonner';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
  width: 'full' | 'half' | 'third';
}

interface FormData {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  settings: {
    submitButton: string;
    successMessage: string;
    redirectUrl?: string;
    emailNotification: boolean;
    adminEmail?: string;
  };
  isActive: boolean;
  submissions: number;
  createdAt: string;
}

export const FormBuilder: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>([
    {
      id: '1',
      name: 'Contact Form',
      description: 'Main contact form for website',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', required: true, width: 'half' },
        { id: '2', type: 'email', label: 'Email Address', required: true, width: 'half' },
        { id: '3', type: 'tel', label: 'Phone Number', required: false, width: 'full' },
        { id: '4', type: 'textarea', label: 'Message', required: true, width: 'full' },
      ],
      settings: {
        submitButton: 'Send Message',
        successMessage: 'Thank you! Your message has been sent.',
        emailNotification: true,
        adminEmail: 'admin@wcvfw.org'
      },
      isActive: true,
      submissions: 47,
      createdAt: '2024-01-15'
    }
  ]);

  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [newFieldType, setNewFieldType] = useState<FormField['type']>('text');

  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: Type },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'tel', label: 'Phone', icon: Phone },
    { value: 'textarea', label: 'Text Area', icon: FileText },
    { value: 'select', label: 'Dropdown', icon: Radio },
    { value: 'radio', label: 'Radio Buttons', icon: Radio },
    { value: 'checkbox', label: 'Checkboxes', icon: Check },
    { value: 'file', label: 'File Upload', icon: Upload },
    { value: 'date', label: 'Date Picker', icon: Calendar },
    { value: 'number', label: 'Number', icon: Hash },
  ];

  const addField = () => {
    if (!selectedForm) return;
    
    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: `New ${fieldTypes.find(f => f.value === newFieldType)?.label}`,
      required: false,
      width: 'full'
    };

    const updatedForm = {
      ...selectedForm,
      fields: [...selectedForm.fields, newField]
    };

    setSelectedForm(updatedForm);
    setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
    toast.success('Field added successfully');
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!selectedForm) return;

    const updatedFields = selectedForm.fields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    const updatedForm = { ...selectedForm, fields: updatedFields };
    setSelectedForm(updatedForm);
    setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
  };

  const deleteField = (fieldId: string) => {
    if (!selectedForm) return;

    const updatedFields = selectedForm.fields.filter(field => field.id !== fieldId);
    const updatedForm = { ...selectedForm, fields: updatedFields };
    setSelectedForm(updatedForm);
    setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
    toast.success('Field deleted');
  };

  const createNewForm = () => {
    const newForm: FormData = {
      id: Date.now().toString(),
      name: 'New Form',
      description: '',
      fields: [],
      settings: {
        submitButton: 'Submit',
        successMessage: 'Thank you for your submission!',
        emailNotification: false
      },
      isActive: false,
      submissions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, newForm]);
    setSelectedForm(newForm);
    toast.success('New form created');
  };

  const renderFieldPreview = (field: FormField) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder || field.label,
      required: field.required,
      className: `${field.width === 'half' ? 'w-1/2' : field.width === 'third' ? 'w-1/3' : 'w-full'}`
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return <Input {...commonProps} type={field.type} />;
      case 'textarea':
        return <Textarea {...commonProps} />;
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" id={`${field.id}-${index}`} name={field.id} />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" id={`${field.id}-${index}`} />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );
      case 'file':
        return <Input {...commonProps} type="file" />;
      case 'date':
        return <Input {...commonProps} type="date" />;
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Forms List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Forms</CardTitle>
              <Button size="sm" onClick={createNewForm}>
                <Plus className="h-4 w-4 mr-2" />
                New Form
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {forms.map((form) => (
              <div
                key={form.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedForm?.id === form.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedForm(form)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{form.name}</h4>
                    <p className="text-sm text-gray-600">{form.fields.length} fields</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge variant={form.isActive ? 'default' : 'secondary'}>
                      {form.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>{form.submissions} submissions</span>
                  <span>{form.createdAt}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Form Builder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {selectedForm ? `Edit: ${selectedForm.name}` : 'Select a form to edit'}
                </CardTitle>
                {selectedForm && (
                  <CardDescription>{selectedForm.description}</CardDescription>
                )}
              </div>
              {selectedForm && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button size="sm">
                    Save Form
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          
          {selectedForm && (
            <CardContent className="space-y-6">
              {/* Form Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Form Name</Label>
                  <Input 
                    value={selectedForm.name}
                    onChange={(e) => setSelectedForm({...selectedForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input 
                    value={selectedForm.description}
                    onChange={(e) => setSelectedForm({...selectedForm, description: e.target.value})}
                  />
                </div>
              </div>

              {/* Add Field Section */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Add Form Field</h3>
                <div className="flex items-center space-x-4">
                  <Select value={newFieldType} onValueChange={(value) => setNewFieldType(value as FormField['type'])}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Form Fields</h3>
                {selectedForm.fields.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No fields added yet. Add your first field above.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedForm.fields.map((field, index) => (
                      <div key={field.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{index + 1}.</span>
                            <h4 className="font-medium">{field.label}</h4>
                            <Badge variant="outline">{field.type}</Badge>
                            {field.required && <Badge variant="destructive">Required</Badge>}
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" onClick={() => setEditingField(field)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Move className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => deleteField(field.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Field Settings */}
                        {editingField?.id === field.id && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 p-3 bg-gray-50 rounded">
                            <div className="space-y-2">
                              <Label>Label</Label>
                              <Input 
                                value={field.label}
                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Placeholder</Label>
                              <Input 
                                value={field.placeholder || ''}
                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Width</Label>
                              <Select 
                                value={field.width} 
                                onValueChange={(value) => updateField(field.id, { width: value as FormField['width'] })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full">Full Width</SelectItem>
                                  <SelectItem value="half">Half Width</SelectItem>
                                  <SelectItem value="third">Third Width</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                checked={field.required}
                                onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                              />
                              <Label>Required</Label>
                            </div>
                            
                            {/* Options for select, radio, checkbox */}
                            {['select', 'radio', 'checkbox'].includes(field.type) && (
                              <div className="md:col-span-2 space-y-2">
                                <Label>Options (one per line)</Label>
                                <Textarea 
                                  value={field.options?.join('\n') || ''}
                                  onChange={(e) => updateField(field.id, { 
                                    options: e.target.value.split('\n').filter(o => o.trim()) 
                                  })}
                                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                                />
                              </div>
                            )}
                            
                            <div className="md:col-span-2">
                              <Button size="sm" onClick={() => setEditingField(null)}>
                                Done Editing
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Field Preview */}
                        <div className="space-y-2">
                          <Label>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                          {renderFieldPreview(field)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Settings */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold">Form Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Submit Button Text</Label>
                    <Input 
                      value={selectedForm.settings.submitButton}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: { ...selectedForm.settings, submitButton: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Success Message</Label>
                    <Input 
                      value={selectedForm.settings.successMessage}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: { ...selectedForm.settings, successMessage: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Redirect URL (optional)</Label>
                    <Input 
                      value={selectedForm.settings.redirectUrl || ''}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: { ...selectedForm.settings, redirectUrl: e.target.value }
                      })}
                      placeholder="https://example.com/thank-you"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Admin Email</Label>
                    <Input 
                      value={selectedForm.settings.adminEmail || ''}
                      onChange={(e) => setSelectedForm({
                        ...selectedForm,
                        settings: { ...selectedForm.settings, adminEmail: e.target.value }
                      })}
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedForm.settings.emailNotification}
                      onCheckedChange={(checked) => setSelectedForm({
                        ...selectedForm,
                        settings: { ...selectedForm.settings, emailNotification: checked }
                      })}
                    />
                    <Label>Email Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedForm.isActive}
                      onCheckedChange={(checked) => setSelectedForm({
                        ...selectedForm,
                        isActive: checked
                      })}
                    />
                    <Label>Form Active</Label>
                  </div>
                </div>
              </div>

              {/* Form Preview */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
                <div className="border rounded-lg p-6 bg-gray-50">
                  <form className="space-y-4">
                    {selectedForm.fields.map((field) => (
                      <div key={field.id} className={`space-y-2 ${field.width === 'half' ? 'w-1/2 inline-block pr-2' : field.width === 'third' ? 'w-1/3 inline-block pr-2' : 'w-full'}`}>
                        <Label>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
                        {renderFieldPreview(field)}
                      </div>
                    ))}
                    <Button type="button" className="w-full md:w-auto">
                      {selectedForm.settings.submitButton}
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FormBuilder;
