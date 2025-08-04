"use client";

import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { policies } from "@/pages/GetInvolvedpolices";
import { useLocation } from 'react-router-dom';
interface LocationState {
  selectedInterest?: string;
}
const RequiredLabel = ({ children }: { children: string }) => (
  <Label>
    {children} <span className="text-red-500">*</span>
  </Label>
);

export default function GetInvolved() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationLocation, setOrganizationLocation] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedPartnership, setSelectedPartnership] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);

  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyContent, setPolicyContent] = useState("");
  const [confirmRead, setConfirmRead] = useState(false);
  const [indianStates, setIndianStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation() as { state: LocationState };


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        });

        const result = await response.json();
        if (result.data && result.data.states) {
          const states = result.data.states.map((s: any) => s.name);
          setIndianStates(states);
        }
      } catch (error) {
        console.error("Error fetching Indian states:", error);
      }
    };

    fetchStates();
  }, []);


  const openPolicy = (type: string) => {
    const selectedPolicy = policies[type];
    if (selectedPolicy) {
      setPolicyTitle(selectedPolicy.title);
      setPolicyContent(selectedPolicy.content);
      setShowPolicy(true);
    }
  };

  const handleAgree = () => {
    if (confirmRead) {
      setAgreed(true);
      setShowPolicy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // show loader
    setSubmitted(false);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("state", selectedState);
    formData.append("aadhaarNumber", aadhaarNumber);
    formData.append("interest", selectedInterest);

    if (selectedInterest === "partners") {
      formData.append("partnerType", selectedPartnership);
      formData.append("organizationName", organizationName);
      formData.append("organizationLocation", organizationLocation);
    } else {
      formData.append("roleAppliedFor", selectedRole);
      if (cvFile) formData.append("cv", cvFile);
      if (imageFile) formData.append("image", imageFile);
      if (aadhaarFile) formData.append("aadhaar", aadhaarFile);
    }

    try {
      const response = await fetch("https://wecanvoiceforwomen.org/api/get-involved/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload(); // refresh after 2 seconds
        }, 2000);
      } else {
        alert("❌ Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Error submitting form.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const interest = location.state?.selectedInterest;
    if (interest) {
      setSelectedInterest(interest);
    }
  }, [location.state]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">
            <span className="text-pink-600">Join Our Mission</span>
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Be part of our impact movement at We Can Voice for Women Foundation. <br />
            Fill the form below and let’s make a difference together.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border border-pink-200">
            <CardHeader>
              <CardTitle className="text-xl text-pink-600 font-semibold">
                Get Involved Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <RequiredLabel>First Name</RequiredLabel>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div>
                    <RequiredLabel>Last Name</RequiredLabel>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <RequiredLabel>Email</RequiredLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <RequiredLabel>Phone</RequiredLabel>
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <RequiredLabel>State</RequiredLabel>
                    <Select required onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <RequiredLabel>Aadhaar Number</RequiredLabel>
                    <Input value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} maxLength={12} required />
                  </div>
                </div>

                <div>
                  <RequiredLabel>I'm interested in</RequiredLabel>
                  <Select
                    required
                    value={selectedInterest} // controlled component
                    onValueChange={(value) => {
                      setSelectedInterest(value);
                      setAgreed(false);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">Career</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="partners">Partners</SelectItem>
                    </SelectContent>
                  </Select>

                </div>

                {(selectedInterest === "career" || selectedInterest === "internship" || selectedInterest === "volunteer") && (
                  <>
                    <div>
                      <RequiredLabel>Role Applying For</RequiredLabel>
                      <Select required onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fundraising-executive">Fundraising Executive</SelectItem>
                          <SelectItem value="field-coordinator">Field Coordinator</SelectItem>
                          <SelectItem value="project-manager">Project Manager</SelectItem>
                          <SelectItem value="project-coordinator">Project Coordinator</SelectItem>
                          <SelectItem value="fundraising-manager">Fundraising Manager</SelectItem>
                          <SelectItem value="community-developer">Community Developer</SelectItem>
                          <SelectItem value="videographer">Videographer</SelectItem>
                          <SelectItem value="photographer">Photographer</SelectItem>
                          <SelectItem value="content-writer">Content Writer</SelectItem>
                          <SelectItem value="reporter">Reporter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      <div>
                        <RequiredLabel>Upload Your CV</RequiredLabel>
                        <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} required />
                      </div>
                      <div>
                        <RequiredLabel>Upload Your Image</RequiredLabel>
                        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required />
                      </div>
                    </div>

                    <div className="pt-4">
                      <RequiredLabel>Upload Your Aadhaar</RequiredLabel>
                      <Input type="file" accept="application/pdf,image/*" onChange={(e) => setAadhaarFile(e.target.files?.[0] || null)} required />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openPolicy(selectedInterest)}
                      className="gap-2 text-pink-600 border-pink-400"
                    >
                      <FileText className="w-4 h-4" />
                      Read {selectedInterest} Policy
                    </Button>
                  </>
                )}

                {selectedInterest === "partners" && (
                  <>
                    <div>
                      <RequiredLabel>Type of Partners</RequiredLabel>
                      <Select required onValueChange={setSelectedPartnership}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csr-partners">CSR Partners</SelectItem>
                          <SelectItem value="event-partners">Event Partners</SelectItem>
                          <SelectItem value="ngo-partners">NGO Partners</SelectItem>
                          <SelectItem value="education-partners">Education Partners</SelectItem>
                          <SelectItem value="entrepreneurship-partners">Entrepreneurship Partners</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-4">
                      <RequiredLabel>Organization Name</RequiredLabel>
                      <input
                        type="text"
                        name="organizationName"
                        required
                        // placeholder="Enter organization name"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={organizationName} onChange={(e) => setOrganizationName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <RequiredLabel>Location</RequiredLabel>
                      <input
                        type="text"
                        name="organizationLocation"
                        required
                        // placeholder="Enter location"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={organizationLocation} onChange={(e) => setOrganizationLocation(e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openPolicy(selectedInterest)}
                      className="gap-2 text-pink-600 border-pink-400 mt-4"
                    >
                      <FileText className="w-4 h-4" />
                      Read {selectedInterest} Policy
                    </Button>
                  </>
                )}


                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedInterest || !agreed || loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : submitted ? "Submitted Successfully!" : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Transition show={showPolicy} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowPolicy(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl relative">
                <Dialog.Title className="text-lg font-bold text-pink-600">
                  {policyTitle}
                </Dialog.Title>
                <button
                  onClick={() => setShowPolicy(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="mt-4 max-h-64 overflow-y-auto text-sm text-gray-700 whitespace-pre-line">
                  {policyContent}
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="readAgree"
                    className="mt-1 accent-pink-600"
                    checked={confirmRead}
                    onChange={(e) => setConfirmRead(e.target.checked)}
                  />
                  <label htmlFor="readAgree" className="text-sm text-gray-700">
                    I have read and agree to this policy.
                  </label>
                </div>
                <div className="mt-6 text-right">
                  <Button onClick={handleAgree} disabled={!confirmRead}>
                    Agree & Close
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
