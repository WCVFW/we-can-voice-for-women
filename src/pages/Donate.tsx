'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'onetime' | 'monthly'>('onetime');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const renderForm = () => (
    <form className="space-y-6">
      <div>
        <Label className="block mb-2 font-semibold">Choose Amount</Label>
        <RadioGroup
          value={amount}
          onValueChange={setAmount}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {['500', '1000', '2000', '5000', '10000'].map((a) => (
            <div key={a}>
              <RadioGroupItem value={a} id={`amt-${a}`} className="peer sr-only" />
              <Label
                htmlFor={`amt-${a}`}
                className="block text-center border rounded-md p-2 cursor-pointer 
                  hover:bg-pink-100 peer-checked:bg-pink-600 
                  peer-checked:text-white peer-checked:border-pink-600 transition"
              >
                ₹{a}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Input
          placeholder="Other Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
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
        "YOUR CONTRIBUTIONS ARE ELIGIBLE FOR UPTO 50% TAX BENEFIT UNDER SECTION 80G AS WE CAN VOICE FOR WOMEN FOUNDATION IS REGISTERED AS NON PROFIT ORGANIZATION"
        <br /> <br />
        PAN: ACT579736J | BOG: ACT579736F2010
      </p>

      <div className="flex items-start space-x-2 text-sm">
        <input type="checkbox" className="mt-1" />
        <span>
          I agree to receive updates from We Can Voice For Women Foundation via WhatsApp,
          SMS, email, and phone.
        </span>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Submit Donation
      </Button>
    </form>
  );

  return (
    <div className="font-serif">
      {/* Top Banner Image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/assets/images/Hero_Banner1.png"
          alt="Donate"
          className="w-full h-[550px] object-cover rounded-b-lg shadow-lg"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Donation + Info */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <Card className="rounded-xl shadow-2xl border border-gray-200 p-6 bg-white">
              <CardHeader className="text-center space-y-3">
                <div className="flex justify-center border-b pb-3">
                  <Button
                    variant={donationType === 'onetime' ? 'default' : 'outline'}
                    onClick={() => setDonationType('onetime')}
                    className="rounded-none w-1/2"
                  >
                    ONE TIME DONATION
                  </Button>
                  <Button
                    variant={donationType === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setDonationType('monthly')}
                    className="rounded-none w-1/2"
                  >
                    MONTHLY DONATION
                  </Button>
                </div>
                <CardTitle className="text-2xl">Support the Cause</CardTitle>
                <CardDescription>
                  Make a difference with your {donationType} donation
                </CardDescription>
              </CardHeader>
              <CardContent>{renderForm()}</CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-6 text-gray-800"
          >
            <h2 className="text-3xl font-bold">Why Your Help Matters</h2>
            <p>
              Your donation supports essential programs including education, healthcare,
              and skill development for women and children in need.
            </p>
            <p>
              Each contribution brings us closer to breaking the cycle of poverty and
              empowering communities through sustainable impact.
            </p>
            <p>
              We value transparency and ensure your donation reaches those who need it
              most. Thank you for being a change-maker.
            </p>
          </motion.div>
        </div>

        {/* Contact & FAQ */}
        {/* <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/contact'}
            className="border-pink-600 text-pink-600 hover:bg-pink-100"
          >
            Go to Contact Us
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/faq'}
            className="border-pink-600 text-pink-600 hover:bg-pink-100"
          >
            Go to FAQs
          </Button>
        </div> */}
      </div>
    </div>
  );
}
