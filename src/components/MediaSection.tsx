import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Image, Mic, Youtube } from 'lucide-react';

const MediaSection = () => {
  return (
    <section className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-6 text-center mb-12">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
      Media & Resources
    </h2>
    <p className="text-gray-600 text-lg max-w-xl mx-auto">
      Discover curated media dedicated to women's empowerment, health, and education.
    </p>
  </div>

  <Tabs defaultValue="images" className="max-w-6xl mx-auto px-6 w-full">
    <TabsList className="flex justify-center space-x-8 border-b border-gray-200 mb-10">
      {[
        { value: "images", icon: <Image className="h-5 w-5" />, label: "Images" },
        { value: "youtube", icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
      ].map(({ value, icon, label }) => (
        <TabsTrigger
          key={value}
          value={value}
          className="flex items-center gap-2 pb-3 font-medium text-gray-600 border-b-2 border-transparent
                     data-[state=active]:border-primary data-[state=active]:text-primary cursor-pointer
                     hover:text-primary transition"
        >
          {icon}
          <span>{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>

    {/* Images */}
    <TabsContent value="images" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card
          key={item}
          className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="h-72 bg-gray-100 flex items-center justify-center text-gray-400 font-semibold text-lg">
            Image {item}
          </div>
          <CardContent className="p-5">
            <p className="text-gray-900 font-semibold text-base">
              Women's Empowerment Image {item}
            </p>
          </CardContent>
        </Card>
      ))}
      <div className="col-span-full flex justify-center mt-8">
        <Button variant="outline" className="px-8 py-2 font-semibold">
          View More Images
        </Button>
      </div>
    </TabsContent>

    {/* YouTube */}
    <TabsContent value="youtube" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="h-72 bg-red-50 flex items-center justify-center text-red-600 text-xl font-semibold">
            <Youtube className="h-10 w-10 mr-2" />
            YouTube Video {item}
          </div>
          <CardContent className="p-5">
            <h3 className="text-gray-900 font-semibold mb-2">
              Empowerment Story Video {item}
            </h3>
            <p className="text-gray-600 text-sm">
              Highlights from our community-driven impact and interviews.
            </p>
          </CardContent>
        </Card>
      ))}
      <div className="col-span-full flex justify-center mt-8">
        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold inline-flex items-center justify-center gap-2">
          <Youtube className="h-5 w-5" />
          Subscribe on YouTube
        </Button>
      </div>
    </TabsContent>
  </Tabs>
</section>


  );
};

export default MediaSection;