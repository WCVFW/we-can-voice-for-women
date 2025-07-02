import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Briefcase,
  GraduationCap,
  Heart,
  ArrowRight,
  Users,
  Globe,
  Award,
  Calendar,
  MapPin,
  Mail,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Other"
];

export default function GetInvolved() {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [, setSelectedState] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2" />
            Join Our Mission
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-pink-900 mb-6">
            Get{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Involved
            </span>
          </h1>
          <p className="text-xl text-pink-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the We Can Voice for Women Foundation and be part of a movement
            that empowers women worldwide. Whether through your career, learning
            journey, or volunteer spirit, there's a place for you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-4">
              <Send className="w-4 h-4 mr-2" />
              Get Started
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll connect you with the right
              opportunities. Whether you're interested in careers, internships,
              or volunteering, we'd love to hear from you.
            </p>
          </div>

          <Card className="shadow-xl border-0 border-pink-200">
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-pink-900 text-lg">
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-pink-800">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-pink-800">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-pink-800">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-pink-800">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={setSelectedState}>
                        <SelectTrigger id="state" className="w-full">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar" className="text-pink-800">
                        Aadhaar Number *
                      </Label>
                      <Input
                        id="aadhaar"
                        placeholder="Enter your 12-digit Aadhaar number"
                        maxLength={12}
                        className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Interest Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="interest"
                    className="text-pink-800 font-semibold"
                  >
                    I'm interested in *
                  </Label>
                  <Select onValueChange={setSelectedInterest}>
                    <SelectTrigger className="h-12 border-pink-300 focus:border-pink-500 focus:ring-pink-200">
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">
                        Career Opportunities
                      </SelectItem>
                      <SelectItem value="internship">
                        Internship Programs
                      </SelectItem>
                      <SelectItem value="volunteer">
                        Volunteer Opportunities
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional Fields Based on Interest */}
                {selectedInterest === "career" && (
                  <div className="space-y-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
                    <h3 className="font-semibold text-rose-900">
                      Career Application
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-rose-800">
                        Position of Interest
                      </Label>
                      <Select>
                        <SelectTrigger className="h-12 border-rose-300 focus:border-rose-500">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="program-manager">
                            Program Manager
                          </SelectItem>
                          <SelectItem value="communications-director">
                            Communications Director
                          </SelectItem>
                          <SelectItem value="community-outreach">
                            Community Outreach Specialist
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-rose-800">
                        Professional Experience
                      </Label>
                      <Textarea
                        id="experience"
                        placeholder="Briefly describe your relevant work experience..."
                        className="min-h-[80px] resize-none border-rose-300 focus:border-rose-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-rose-800">
                        Resume/CV
                      </Label>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="h-12 border-rose-300 focus:border-rose-500"
                      />
                    </div>
                  </div>
                )}

                {selectedInterest === "internship" && (
                  <div className="space-y-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-900">
                      Internship Application
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-pink-800">
                        Program Type
                      </Label>
                      <Select>
                        <SelectTrigger className="h-12 border-pink-300 focus:border-pink-500">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summer">
                            Summer Impact Internship
                          </SelectItem>
                          <SelectItem value="fellowship">
                            Year-Round Fellowship
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education" className="text-pink-800">
                        Current Education Level
                      </Label>
                      <Select>
                        <SelectTrigger className="h-12 border-pink-300 focus:border-pink-500">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="undergraduate">
                            Undergraduate Student
                          </SelectItem>
                          <SelectItem value="graduate">
                            Graduate Student
                          </SelectItem>
                          <SelectItem value="recent-graduate">
                            Recent Graduate
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-pink-800">
                        Areas of Interest
                      </Label>
                      <Textarea
                        id="interests"
                        placeholder="What aspects of women's empowerment are you most passionate about?"
                        className="min-h-[80px] resize-none border-pink-300 focus:border-pink-500"
                      />
                    </div>
                  </div>
                )}

                {selectedInterest === "volunteer" && (
                  <div className="space-y-6 p-4 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
                    <h3 className="font-semibold text-fuchsia-900">
                      Volunteer Application
                    </h3>

                    <div className="space-y-2">
                      <Label
                        htmlFor="volunteer-type"
                        className="text-fuchsia-800"
                      >
                        Volunteer Interest
                      </Label>
                      <Select>
                        <SelectTrigger className="h-12 border-fuchsia-300 focus:border-fuchsia-500">
                          <SelectValue placeholder="Select volunteer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="events">Event Support</SelectItem>
                          <SelectItem value="mentorship">Mentorship</SelectItem>
                          <SelectItem value="digital">
                            Digital Advocacy
                          </SelectItem>
                          <SelectItem value="all">All of the above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="availability"
                        className="text-fuchsia-800"
                      >
                        Time Availability
                      </Label>
                      <Select>
                        <SelectTrigger className="h-12 border-fuchsia-300 focus:border-fuchsia-500">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">
                            Few hours per week
                          </SelectItem>
                          <SelectItem value="monthly">
                            Few hours per month
                          </SelectItem>
                          <SelectItem value="events-only">
                            Events only
                          </SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-fuchsia-800">
                        Special Skills or Interests
                      </Label>
                      <Textarea
                        id="skills"
                        placeholder="Any special skills, experience, or areas you'd like to help with?"
                        className="min-h-[80px] resize-none border-fuchsia-300 focus:border-fuchsia-500"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-12"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>
                    We'll review your application and get back to you within 5-7
                    business days.
                  </p>
                  <p className="mt-2 text-pink-600">
                    All information provided will be kept confidential and
                    secure.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
