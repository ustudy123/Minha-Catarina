import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Crown,
  Check,
  Sparkles,
  Zap,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";

const Pricing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const p = (t as any).pricing || pricingFallback;

  const baseFeatures = p.baseFeatures as string[];
  const plusFeatures = p.plusFeatures as string[];
  const comparisonRows = p.comparisonRows as { name: string; base: string; plus: string }[];
  const benefits = p.benefits as { title: string; description: string }[];
  const benefitIcons = [Crown, Zap, Heart];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/5">
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{p.title}</h1>
              <p className="text-xs text-muted-foreground">{p.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{p.trialBadge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">{p.heroTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{p.heroDescription}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Base Plan */}
          <Card className="p-8 border-2 hover-lift animate-fade-in-scale">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Heart className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">{p.basePlanName}</h3>
                </div>
                <p className="text-muted-foreground">{p.basePlanDesc}</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-bold">{p.freeLabel}</div>
                <p className="text-sm text-muted-foreground">{p.foreverLabel}</p>
              </div>

              <Button size="lg" variant="outline" className="w-full">
                {p.currentPlan}
              </Button>

              <div className="space-y-3">
                {baseFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Plus Plan */}
          <Card className="p-8 border-2 border-accent relative overflow-hidden hover-lift animate-fade-in-scale" style={{ animationDelay: "0.1s" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-highlight/20 rounded-full blur-3xl" />
            
            <div className="relative space-y-6">
              <div>
                <Badge className="mb-3 gap-1 bg-gradient-to-r from-accent to-secondary">
                  <Crown className="w-3 h-3" />
                  {p.recommended}
                </Badge>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">{p.plusPlanName}</h3>
                </div>
                <p className="text-muted-foreground">{p.plusPlanDesc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold">{p.plusPrice}</div>
                  <span className="text-muted-foreground">{p.perMonth}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="gap-1">
                    <Zap className="w-3 h-3" />
                    {p.yearlyPrice}
                  </Badge>
                  <span className="text-success font-medium">{p.savings}</span>
                </div>
              </div>

              <Button size="lg" variant="premium" className="w-full">
                <Crown className="w-5 h-5" />
                {p.trialButton}
              </Button>

              <div className="space-y-3">
                {plusFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      index === 0 ? "bg-muted" : "bg-accent/20"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        index === 0 ? "text-muted-foreground" : "text-accent"
                      )} />
                    </div>
                    <span className={cn(
                      "text-sm",
                      index === 0 && "text-muted-foreground"
                    )}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Comparison Table */}
        <Card className="p-8 border-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-xl font-bold mb-6">{p.comparisonTitle}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border font-semibold text-sm">
              <div>{p.featureLabel}</div>
              <div className="text-center">{p.basePlanName}</div>
              <div className="text-center">{p.plusPlanName}</div>
            </div>
            
            {comparisonRows.map((row: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-3 text-sm">
                <div className="font-medium">{row.name}</div>
                <div className="text-center text-muted-foreground">{row.base}</div>
                <div className="text-center font-semibold text-accent">{row.plus}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {benefits.map((benefit: any, index: number) => {
            const Icon = benefitIcons[index] || Heart;
            return (
              <Card 
                key={index} 
                className="p-6 border-2 text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="h-20" />
      </main>
    </div>
  );
};

// Fallback used if translations don't have pricing yet (shouldn't happen)
const pricingFallback = {
  title: "Planos e Preços",
  subtitle: "Escolha o melhor para você",
  trialBadge: "7 dias grátis no Plano Plus",
  heroTitle: "Escolha seu plano ideal",
  heroDescription: "Comece grátis com centenas de frases ou desbloqueie o poder da IA com o Plano Plus",
  basePlanName: "Base",
  basePlanDesc: "Perfeito para começar",
  freeLabel: "Grátis",
  foreverLabel: "Para sempre",
  currentPlan: "Plano Atual",
  baseFeatures: [] as string[],
  plusPlanName: "Plus",
  plusPlanDesc: "IA ilimitada e recursos premium",
  plusPrice: "R$ 19,90",
  perMonth: "/mês",
  yearlyPrice: "ou R$ 199,90/ano",
  savings: "Economize 17%",
  recommended: "Recomendado",
  trialButton: "Experimentar 7 dias grátis",
  plusFeatures: [] as string[],
  comparisonTitle: "Comparação Detalhada",
  featureLabel: "Recurso",
  comparisonRows: [] as any[],
  benefits: [] as any[],
};

export default Pricing;
