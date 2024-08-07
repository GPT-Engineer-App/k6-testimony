import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Camera, Music, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive color points." },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature and round faces." },
  { name: "Maine Coon", description: "Large, friendly cats with tufted ears and long, fluffy tails." },
  { name: "Bengal", description: "Active, playful cats with a wild appearance resembling leopards." },
  { name: "Scottish Fold", description: "Known for their unique folded ears and owl-like appearance." },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setProgress(0);
    }, 5000);

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You're pawsome! 🐾",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2 text-pink-500 h-12 w-12" /> Feline Fascination
        </motion.h1>
        
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg"
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      src={src}
                      alt={`Cute cat ${index + 1}`}
                      className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-2xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <Button 
            className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600"
            onClick={handleLike}
          >
            <Heart className="mr-2 h-4 w-4" /> Like ({likes})
          </Button>
        </motion.div>

        <motion.div
          className="mb-8 p-4 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-purple-700">Did You Know?</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFactIndex}
              className="text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {catFacts[currentFactIndex]}
            </motion.p>
          </AnimatePresence>
          <Progress value={progress} className="mt-2" />
        </motion.div>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2 text-purple-500" /> About Cats</CardTitle>
                <CardDescription>Fascinating feline facts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Cats are enigmatic creatures that have been domesticated for thousands of years. 
                  Known for their independence, agility, and affectionate nature, cats have become 
                  beloved companions in households around the world.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Paw className="mr-2 text-purple-500" /> Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none space-y-2">
                  {[
                    { icon: Camera, text: "Excellent hunters with sharp claws and teeth" },
                    { icon: Music, text: "Communicate through vocalizations, body language, and scent" },
                    { icon: Moon, text: "Keen senses, especially hearing and night vision" },
                    { icon: Paw, text: "Flexible bodies and quick reflexes" }
                  ].map((trait, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <trait.icon className="mr-2 h-5 w-5 text-pink-500" /> {trait.text}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2 text-purple-500" /> Popular Cat Breeds</CardTitle>
                <CardDescription>Discover different types of cats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <motion.div 
                      key={breed.name}
                      className="bg-white p-4 rounded-lg shadow-md border border-purple-200 hover:border-purple-400 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-purple-700">{breed.name}</h3>
                      <p className="text-sm text-gray-600">{breed.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xl text-gray-700 mb-4">
            Whether you're a cat owner or just an admirer, these furry friends continue to 
            captivate us with their charm and personality.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
            <Info className="mr-2 h-4 w-4" /> Learn More About Cats
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
