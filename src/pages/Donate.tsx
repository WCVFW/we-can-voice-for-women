"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"onetime" | "monthly">("onetime");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);

  useEffect(() => {
    setAmount("");
    setCustomAmount("");
  }, [donationType]);

  useEffect(() => {
    if (amount) setCustomAmount(amount);
  }, [amount]);

  const donationAmounts =
    donationType === "monthly"
      ? ["500", "1000", "1500", "2000", "2500", "5000"]
      : ["1000", "2000", "3000", "5000", "10000", "20000"];

  const renderForm = () => (
    <form className="space-y-6">
      <div>
        <Label className="block mb-2 font-semibold">Choose Amount</Label>
        <RadioGroup
          value={amount}
          onValueChange={(val) => setAmount(val)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {donationAmounts.map((a) => (
            <div key={a}>
              <RadioGroupItem value={a} id={`amt-${a}`} className="peer sr-only" />
              <Label
                htmlFor={`amt-${a}`}
                className="block text-center border rounded-md p-2 cursor-pointer hover:bg-pink-100 peer-checked:bg-pink-600 peer-checked:text-white peer-checked:border-pink-600 transition"
              >
                ₹{Number(a).toLocaleString("en-IN")}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Input
          placeholder="Other Amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setAmount("");
          }}
          className="mt-3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="Full Name" required />
        <Input placeholder="Email ID" required />
        <Input placeholder="Mobile No" required />
        <Input type="date" placeholder="Date of Birth" required />
        <Input placeholder="PAN Number" />
        <Input placeholder="Country" value="India" readOnly />
        <Input placeholder="State" />
        <Input placeholder="City" />
      </div>

      <Textarea placeholder="Address" rows={3} />
      <Input placeholder="Pincode" />

      <p className="text-xs text-gray-500 leading-snug">
        "YOUR CONTRIBUTIONS ARE ELIGIBLE FOR UPTO 50% TAX BENEFIT UNDER SECTION 80G AS WE CAN
        VOICE FOR WOMEN FOUNDATION IS REGISTERED AS NON PROFIT ORGANIZATION"
      </p>

      <div className="flex items-start space-x-2 text-sm">
        <input
          type="checkbox"
          id="declaration"
          checked={isDeclarationChecked}
          onChange={(e) => setIsDeclarationChecked(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="declaration" className="leading-snug">
          I hereby declare that I am a citizen of India, making this donation out of my own
          funds. The information provided above is correct to the best of my knowledge. I know
          that all further communications will be done on contact details provided above.
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={!isDeclarationChecked}
      >
        Submit Donation
      </Button>
    </form>
  );

  return (
    <div className="font-serif pt-[94px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-6 text-gray-800"
          >
            <h2 className="text-3xl font-bold text-pink-600">Let's begin change</h2>
            <p>
              Like a small drop leading to a big flood, every small contribution you make can
              bring about significant change in our society. Your support will help women move
              forward.
            </p>
            <p>
              You can assist those sisters who are struggling to pursue higher education due to
              financial difficulties.
            </p>
            <p>
              Your donations will support mothers who are enduring illnesses without access to
              quality medical care.
            </p>
            <p>
              The financial help you provide will be invaluable to women striving to achieve
              success in life.
            </p>
            <p>
              Empowering women means empowering the entire country. Women are the backbone of
              families, and the education they receive can transform generations.
            </p>
            <p>
              We envision a future where women in every village and slum can pursue development.
              Every rupee you donate contributes to that vision.
            </p>
            <p>
              Donate generously and become a catalyst for equality for women in society. Let’s
              begin this change today.
            </p>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <Card className="rounded-xl shadow-2xl border border-gray-200 p-6 bg-white">
              <CardHeader className="text-center space-y-3">
                <div className="flex justify-center border-b pb-3">
                  <Button
                    variant={donationType === "onetime" ? "default" : "outline"}
                    onClick={() => setDonationType("onetime")}
                    className="rounded-none w-1/2"
                  >
                    Give Once
                  </Button>
                  <Button
                    variant={donationType === "monthly" ? "default" : "outline"}
                    onClick={() => setDonationType("monthly")}
                    className="rounded-none w-1/2"
                  >
                    Give Monthly
                  </Button>
                </div>
                <CardTitle className="text-2xl">Donate & Save Tax</CardTitle>
                <CardDescription>
                  Make a difference with your {donationType} donation
                </CardDescription>
              </CardHeader>
              <CardContent>{renderForm()}</CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
