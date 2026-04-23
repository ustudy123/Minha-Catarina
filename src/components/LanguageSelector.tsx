import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const languages = [
  { code: 'pt' as Language, flag: '🇧🇷', name: 'Português' },
  { code: 'en' as Language, flag: '🇺🇸', name: 'English' },
  { code: 'es' as Language, flag: '🇪🇸', name: 'Español' },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find(l => l.code === language);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-10 w-10"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 glass border-2" align="end">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 font-normal"
              onClick={() => setLanguage(lang.code)}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
