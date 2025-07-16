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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { policies } from "@/pages/GetInvolvedpolices";

export default function GetInvolved() {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyTitle, setPolicyTitle] = useState("");
  const [policyContent, setPolicyContent] = useState("");
  const [confirmRead, setConfirmRead] = useState(false);
  const [indianStates, setIndianStates] = useState<string[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">
            <span className="text-pink-600">Join Our Mission</span>
          </h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
            Be part of our impact movement at We Can Voice for Women Foundation.
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>First Name</Label>
                    <Input placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input placeholder="Enter last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>State</Label>
                    <Select onValueChange={setSelectedState}>
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
                    <Label>Aadhaar Number</Label>
                    <Input maxLength={12} placeholder="Enter Aadhaar number" />
                  </div>
                </div>

                <div>
                  <Label>I'm interested in</Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedInterest(value);
                      setAgreed(false); // reset agreement on change
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">Career</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedInterest && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openPolicy(selectedInterest)}
                    className="gap-2 text-pink-600 border-pink-400"
                  >
                    <FileText className="w-4 h-4" />
                    Read {selectedInterest} Policy
                  </Button>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={!selectedInterest || !agreed}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal Popup for Policy */}
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
