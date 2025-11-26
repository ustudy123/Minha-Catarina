import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Play, 
  Star,
  ArrowLeft,
  Sunrise,
  Moon,
  Utensils,
  Bath,
  BookOpen,
  Music,
  Heart,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phrase {
  id: string;
  text: string;
  category: string;
  isFavorite?: boolean;
}

const categories = [
  { id: "routine", name: "Rotina Diária", icon: Sunrise, color: "from-primary to-highlight" },
  { id: "education", name: "Educação", icon: BookOpen, color: "from-accent to-secondary" },
  { id: "songs", name: "Músicas", icon: Music, color: "from-secondary to-primary" },
  { id: "affection", name: "Carinho", icon: Heart, color: "from-highlight to-accent" },
  { id: "bedtime", name: "Hora de Dormir", icon: Moon, color: "from-secondary to-accent" },
  { id: "meals", name: "Refeições", icon: Utensils, color: "from-primary to-accent" },
  { id: "bath", name: "Banho", icon: Bath, color: "from-accent to-highlight" },
  { id: "languages", name: "Idiomas", icon: Globe, color: "from-secondary to-highlight" },
];

const samplePhrases: Phrase[] = [
  { id: "1", text: "Bom dia, meu amor! Hora de acordar!", category: "routine" },
  { id: "2", text: "Você é muito especial para mim!", category: "affection", isFavorite: true },
  { id: "3", text: "Vamos tomar café da manhã?", category: "meals" },
  { id: "4", text: "Hora do banho! Vai ser divertido!", category: "bath" },
  { id: "5", text: "A é de amor, B é de bola, C é de casa!", category: "education" },
  { id: "6", text: "Boa noite! Tenha sonhos lindos!", category: "bedtime", isFavorite: true },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>(["2", "6"]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredPhrases = samplePhrases.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Biblioteca de Frases</h1>
              <p className="text-xs text-muted-foreground">500+ frases pré-gravadas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar frases..." 
            className="pl-10 h-12 rounded-xl border-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full h-auto grid grid-cols-4 gap-2 bg-transparent p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Todas
            </TabsTrigger>
            {categories.slice(0, 3).map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <cat.icon className="w-4 h-4 mr-1" />
                {cat.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className={cn(
                  "relative overflow-hidden border-2 cursor-pointer group hover-lift",
                  selectedCategory === category.id && "ring-2 ring-primary",
                  "animate-fade-in-scale"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                  category.color
                )} />
                <div className="relative p-4 flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    category.color
                  )}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {samplePhrases.filter(p => p.category === category.id).length} frases
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Phrases List */}
          <TabsContent value={selectedCategory} className="space-y-3 mt-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-muted-foreground">
                {filteredPhrases.length} frases encontradas
              </h3>
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSearchQuery("")}
                >
                  Limpar
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {filteredPhrases.map((phrase, index) => (
                <Card 
                  key={phrase.id}
                  className="p-4 border-2 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="flex-shrink-0 rounded-xl"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1 break-words">
                        {phrase.text}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === phrase.category)?.name}
                      </Badge>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0"
                      onClick={() => toggleFavorite(phrase.id)}
                    >
                      <Star 
                        className={cn(
                          "w-5 h-5",
                          favorites.includes(phrase.id) && "fill-highlight text-highlight"
                        )}
                      />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="h-20" />
      </main>
    </div>
  );
};

export default Library;
