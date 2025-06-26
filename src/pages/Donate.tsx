import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import DonateButton from '@/components/DonateButton';

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    
    const amount = donationAmount === 'custom' ? customAmount : donationAmount;
    
    // Here you would typically integrate with a payment processor
    console.log('Processing donation:', {
      amount,
      name,
      email,
      message,
      isMonthly
    });
    
    toast.success(`Thank you for your ₹{isMonthly ? 'monthly' : 'one-time'} donation of ₹₹{amount}!`, {
      description: 'Your generosity helps us empower more women.'
    });
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-12 md:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your donation helps us empower women through education, health initiatives, and economic opportunities.
          Together, we can create lasting change in the lives of women everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Your contribution makes a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonationSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label>Select Donation Type</Label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      type="button"
                      variant={isMonthly ? "outline" : "default"}
                      onClick={() => setIsMonthly(false)}
                    >
                      One-time
                    </Button>
                    <Button 
                      type="button"
                      variant={isMonthly ? "default" : "outline"}
                      onClick={() => setIsMonthly(true)}
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Select Amount</Label>
                  <RadioGroup 
                    value={donationAmount}
                    onValueChange={setDonationAmount}
                    className="grid grid-cols-3 gap-2"
                  >
                    {['25', '50', '100', '250', '500', 'custom'].map((amount) => (
                      <div key={amount} className="flex items-center">
                        <RadioGroupItem 
                          value={amount} 
                          id={`amount-₹{amount}`} 
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`amount-₹{amount}`}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          {amount === 'custom' ? (
                            'Custom'
                          ) : (
                            <span>₹{amount}</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {donationAmount === 'custom' && (
                    <div className="mt-2">
                      <Label htmlFor="custom-amount">Custom Amount (₹)</Label>
                      <Input
                        id="custom-amount"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share why you're supporting us"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">Complete Donation</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>See how your donation helps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">₹25 can provide</h3>
                <p>Educational materials for 5 women in our literacy programs</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">₹50 can provide</h3>
                <p>Health screening services for 10 women in underserved communities</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">₹100 can provide</h3>
                <p>Business skills training for a woman entrepreneur</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">₹250 can provide</h3>
                <p>A microloan to help a woman start her own business</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">₹500 can provide</h3>
                <p>A full scholarship for a woman to complete job skills training</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Give</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Volunteer Your Time</h3>
                <p className="text-gray-600 mt-1">Share your skills and expertise with women in our programs.</p>
                <Button variant="outline" className="mt-3">Learn About Volunteering</Button>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-semibold">Corporate Partnerships</h3>
                <p className="text-gray-600 mt-1">Explore partnership opportunities for your organization.</p>
                <Button variant="outline" className="mt-3">Become a Partner</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help With Your Donation?</h2>
        <p className="text-gray-600 mb-6">Our team is available to answer any questions you may have about donating to We Can Voice For Women.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">Contact Us</Button>
          <Button variant="outline">FAQ</Button>
        </div>
      </div>
    </div>
  );
}