import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Camera, Music, Moon, Sun, Zap } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleQuizSubmit = () => {
    if (quizAnswer.toLowerCase() === "meow") {
      toast({
        title: "Correct!",
        description: "You speak cat language fluently!",
      });
    } else {
      toast({
        title: "Not quite!",
        description: "Hint: It's the most common cat sound!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-purple-900 text-white' : 'bg-gradient-to-b from-purple-100 to-pink-100'} transition-colors duration-500`}>
      <div className="max-w-4xl mx-auto p-8">
        <motion.div 
          className="relative h-[50vh] mb-12 overflow-hidden rounded-xl shadow-2xl"
          style={{ y }}
        >
          <img 
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Cat Hero" 
            className="object-cover w-full h-full"
          />
          <motion.h1 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white text-center shadow-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="inline-block mr-2 text-pink-500 h-12 w-12" /> Feline Fascination
          </motion.h1>
        </motion.div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch id="theme-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        
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
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Whether you're a cat owner or just an admirer, these furry friends continue to 
            captivate us with their charm and personality.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
            <Info className="mr-2 h-4 w-4" /> Learn More About Cats
          </Button>
        </motion.div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center"><Zap className="mr-2 text-yellow-500" /> Cat Quiz</CardTitle>
            <CardDescription>Test your cat knowledge!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">What sound does a cat make?</p>
            <input
              type="text"
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Enter your answer"
            />
            <Button onClick={handleQuizSubmit}>Submit Answer</Button>
          </CardContent>
        </Card>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center"><Heart className="mr-2 text-red-500" /> Cat Adoption</CardTitle>
            <CardDescription>Find your purr-fect companion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Whiskers", age: 2, image: "https://placekitten.com/200/200" },
                { name: "Luna", age: 1, image: "https://placekitten.com/201/201" },
              ].map((cat) => (
                <motion.div
                  key={cat.name}
                  className="bg-white p-4 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-md mb-2" />
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p>Age: {cat.age} years</p>
                  <Button className="mt-2 w-full">Adopt {cat.name}</Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
