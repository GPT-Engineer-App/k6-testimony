import { useState, useEffect, useRef } from "react";
import { Cat, Heart, Info, Paw, Camera, Music, Moon, Sun, Zap, ChevronDown, Star, Gift, PawPrint } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const catBreeds = [
  { name: "Siamese", description: "Vocal and social cats known for their distinctive color points.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Long-haired cats with a sweet, gentle nature and round faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "Large, friendly cats with tufted ears and long, fluffy tails.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", description: "Active, playful cats with a wild appearance resembling leopards.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", description: "Known for their unique folded ears and owl-like appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats can rotate their ears 180 degrees.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
];

const catPersonalities = [
  { trait: "Independent", description: "Cats are known for their self-reliance and ability to entertain themselves." },
  { trait: "Curious", description: "Felines have a natural curiosity that often leads them to explore their surroundings." },
  { trait: "Affectionate", description: "Many cats form strong bonds with their owners and show affection through purring and cuddling." },
  { trait: "Playful", description: "Cats, especially kittens, love to play and can be quite energetic and acrobatic." },
  { trait: "Territorial", description: "Cats are territorial animals and may mark their space to feel secure." },
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [selectedBreed, setSelectedBreed] = useState(null);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

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
      <div className="max-w-7xl mx-auto p-8">
        <motion.div 
          ref={heroRef}
          className="relative h-[80vh] mb-12 overflow-hidden rounded-xl shadow-2xl"
          style={{ y }}
        >
          <img 
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Cat Hero" 
            className="object-cover w-full h-full"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.h1 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-white text-center shadow-text"
            initial={{ opacity: 0, y: -50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Cat className="inline-block mr-2 text-pink-500 h-16 w-16" /> Feline Fascination
          </motion.h1>
          <motion.p
            className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-2xl text-white text-center max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the enchanting world of cats and their mesmerizing charm
          </motion.p>
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1, y: [0, 10, 0] } : {}}
            transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, repeatType: "loop" }}
          >
            <ChevronDown className="h-12 w-12 text-white" />
          </motion.div>
        </motion.div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch id="theme-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg"
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <motion.div 
                    className="p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={src}
                      alt={`Cute cat ${index + 1}`}
                      className="mx-auto object-cover w-full h-[600px] rounded-lg shadow-2xl"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <motion.div
            className="absolute bottom-4 right-4 flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
          >
            <Button 
              className="bg-pink-500 hover:bg-pink-600"
              onClick={handleLike}
            >
              <Heart className="mr-2 h-4 w-4" /> Like
            </Button>
            <Badge variant="secondary" className="text-lg font-bold">
              {likes}
            </Badge>
          </motion.div>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                <Info className="mr-2 h-4 w-4" /> Learn More About Cats
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cat Personalities</DialogTitle>
                <DialogDescription>Discover the diverse personalities of our feline friends.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Accordion type="single" collapsible className="w-full">
                  {catPersonalities.map((personality, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{personality.trait}</AccordionTrigger>
                      <AccordionContent>
                        {personality.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Cat Breed Spotlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catBreeds.map((breed, index) => (
              <motion.div
                key={breed.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{breed.name}</h3>
                  <p className="text-gray-600 mb-4">{breed.description}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <PawPrint className="mr-2 h-4 w-4" /> Learn More
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{breed.name}</h4>
                          <p className="text-sm">
                            The {breed.name} is a fascinating breed with unique characteristics.
                            Click to explore more about their history, care needs, and personality traits.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mb-12 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardTitle className="flex items-center text-2xl"><Zap className="mr-2 text-white" /> Cat Quiz Challenge</CardTitle>
              <CardDescription className="text-white/80">Put your feline knowledge to the test!</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <motion.p 
                className="mb-4 text-lg font-semibold"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                What sound does a cat make?
              </motion.p>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Input
                  type="text"
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your answer"
                />
                <Button 
                  onClick={handleQuizSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Submit Answer
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-12 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <CardTitle className="flex items-center text-2xl"><Heart className="mr-2 text-white" /> Cat Adoption Center</CardTitle>
              <CardDescription className="text-white/80">Find your purr-fect feline companion</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Whiskers", age: 2, image: "https://placekitten.com/300/300", personality: "Playful" },
                  { name: "Luna", age: 1, image: "https://placekitten.com/301/301", personality: "Cuddly" },
                  { name: "Oliver", age: 3, image: "https://placekitten.com/302/302", personality: "Independent" },
                ].map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                      <p className="text-gray-600 mb-2">Age: {cat.age} years</p>
                      <p className="text-gray-600 mb-4">Personality: {cat.personality}</p>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        Adopt {cat.name}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
