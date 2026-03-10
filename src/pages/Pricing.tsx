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

const features = {
  base: [
    "500-1000 frases pré-gravadas",
    "Biblioteca categorizada completa",
    "Programação de sequências",
    "Suporte multilíngue básico",
    "Conexão Bluetooth",
  ],
  plus: [
    "Tudo do Plano Base",
    "Frases personalizadas com IA",
    "1000 tokens por mês",
    "Voz natural infantil premium",
    "Suporte multilíngue avançado",
    "Histórico ilimitado",
    "Suporte prioritário",
    "Sem anúncios",
  ]
};

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Planos e Preços</h1>
              <p className="text-xs text-muted-foreground">Escolha o melhor para você</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">7 dias grátis no Plano Plus</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Escolha seu plano ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comece grátis com centenas de frases ou desbloqueie o poder da IA com o Plano Plus
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Base Plan */}
          <Card className="p-8 border-2 hover-lift animate-fade-in-scale">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Heart className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Plano Base</h3>
                </div>
                <p className="text-muted-foreground">Perfeito para começar</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-bold">Grátis</div>
                <p className="text-sm text-muted-foreground">Para sempre</p>
              </div>

              <Button size="lg" variant="outline" className="w-full">
                Plano Atual
              </Button>

              <div className="space-y-3">
                {features.base.map((feature, index) => (
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
                  Recomendado
                </Badge>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Plano Plus</h3>
                </div>
                <p className="text-muted-foreground">IA ilimitada e recursos premium</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold">R$ 19,90</div>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="gap-1">
                    <Zap className="w-3 h-3" />
                    ou R$ 199,90/ano
                  </Badge>
                  <span className="text-success font-medium">Economize 17%</span>
                </div>
              </div>

              <Button size="lg" variant="premium" className="w-full">
                <Crown className="w-5 h-5" />
                Experimentar 7 dias grátis
              </Button>

              <div className="space-y-3">
                {features.plus.map((feature, index) => (
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
          <h3 className="text-xl font-bold mb-6">Comparação Detalhada</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border font-semibold text-sm">
              <div>Recurso</div>
              <div className="text-center">Base</div>
              <div className="text-center">Plus</div>
            </div>
            
            {[
              { name: "Frases pré-gravadas", base: "500-1000", plus: "Ilimitado" },
              { name: "Biblioteca categorizada", base: "✓", plus: "✓" },
              { name: "Programação de sequências", base: "✓", plus: "✓" },
              { name: "Frases personalizadas com IA", base: "✗", plus: "✓" },
              { name: "Tokens mensais", base: "-", plus: "1000" },
              { name: "Voz natural premium", base: "✗", plus: "✓" },
              { name: "Suporte multilíngue", base: "Básico", plus: "Premium" },
              { name: "Histórico", base: "Limitado", plus: "Ilimitado" },
              { name: "Suporte", base: "Padrão", plus: "Prioritário" },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-3 text-sm">
                <div className="font-medium">{row.name}</div>
                <div className="text-center text-muted-foreground">{row.base}</div>
                <div className="text-center font-semibold text-accent">{row.plus}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ / Benefits */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            {
              icon: Crown,
              title: "7 dias grátis",
              description: "Teste todas as funcionalidades sem compromisso"
            },
            {
              icon: Zap,
              title: "Cancele quando quiser",
              description: "Sem taxas de cancelamento ou multas"
            },
            {
              icon: Heart,
              title: "Suporte dedicado",
              description: "Equipe pronta para ajudar você"
            }
          ].map((benefit, index) => (
            <Card 
              key={index} 
              className="p-6 border-2 text-center hover-lift animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">{benefit.title}</h4>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="h-20" />
      </main>
    </div>
  );
};

export default Pricing;
