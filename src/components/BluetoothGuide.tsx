import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { 
  Bluetooth, 
  Power, 
  Settings, 
  Search, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTranslations } from "@/translations";
import type { Language } from "@/contexts/LanguageContext";

interface BluetoothGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dollName: string;
  language: Language;
  onConfirmConnection: () => void;
}

interface Step {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const steps: Step[] = [
  { 
    icon: Power, 
    iconColor: "text-green-500",
    iconBg: "bg-green-500/20"
  },
  { 
    icon: Settings, 
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/20"
  },
  { 
    icon: Search, 
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/20"
  },
  { 
    icon: CheckCircle, 
    iconColor: "text-primary",
    iconBg: "bg-primary/20"
  },
];

// Default translations fallback
const defaultBt = {
  title: "Conectar ao Speaker",
  subtitle: "Siga os passos para conectar",
  step1Title: "Ligue o Speaker",
  step1Desc: "Pressione o botão de energia do speaker da boneca até ouvir o som de confirmação",
  step2Title: "Abra o Bluetooth",
  step2Desc: "Acesse Configurações > Bluetooth no seu celular",
  step3Title: "Encontre o Dispositivo",
  step3Desc: "Procure por '{dollName} Speaker' na lista de dispositivos",
  step4Title: "Conecte!",
  step4Desc: "Toque no nome do speaker para conectar",
  next: "Próximo",
  back: "Voltar",
  done: "Pronto, conectei!",
  skip: "Pular",
  stepOf: "Passo {current} de {total}",
  troubleshooting: "Não encontrou o speaker?",
  troubleshootingTip: "Certifique-se que o speaker está ligado e próximo do celular",
  disconnect: "Desconectar",
  connectedTo: "Conectado a {deviceName}",
  soundConfirmation: "Você ouvirá um som de confirmação",
};

export const BluetoothGuide = ({
  open,
  onOpenChange,
  dollName,
  language,
  onConfirmConnection,
}: BluetoothGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const t = getTranslations(language);
  const bt = (t as any).bluetooth || defaultBt;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onConfirmConnection();
    // Reset step for next time
    setTimeout(() => setCurrentStep(0), 300);
  };

  const handleSkip = () => {
    onOpenChange(false);
    setTimeout(() => setCurrentStep(0), 300);
  };

  const getStepContent = (step: number) => {
    const titles = [bt.step1Title, bt.step2Title, bt.step3Title, bt.step4Title];
    const descriptions = [
      bt.step1Desc,
      bt.step2Desc,
      bt.step3Desc.replace('{dollName}', dollName),
      bt.step4Desc,
    ];
    return { title: titles[step], description: descriptions[step] };
  };

  const stepContent = getStepContent(currentStep);
  const StepIcon = steps[currentStep].icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] glass border-t-2">
        <DrawerHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Bluetooth className="w-5 h-5 text-primary" />
            </div>
          </div>
          <DrawerTitle className="text-xl">{bt.title}</DrawerTitle>
          <DrawerDescription>{bt.subtitle}</DrawerDescription>
        </DrawerHeader>

        <div className="px-6 pb-4">
          {/* Step Content */}
          <div 
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 mb-6",
              "transition-all duration-300 ease-out"
            )}
          >
            {/* Animated Icon */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500",
                  steps[currentStep].iconBg,
                  currentStep === 2 && "animate-pulse" // Pulse on search step
                )}
              >
                <StepIcon 
                  className={cn(
                    "w-10 h-10 transition-all duration-300",
                    steps[currentStep].iconColor,
                    isLastStep && "animate-bounce"
                  )} 
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{stepContent.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {stepContent.description}
                </p>
              </div>

              {/* Sound indicator for last step */}
              {isLastStep && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
                  <Volume2 className="w-4 h-4" />
                  <span>{bt.soundConfirmation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "bg-primary w-6" 
                    : index < currentStep
                    ? "bg-primary/60"
                    : "bg-muted"
                )}
                aria-label={`Step ${index + 1}`}
              />
            ))}
          </div>

          {/* Step Counter */}
          <p className="text-center text-sm text-muted-foreground mb-4">
            {bt.stepOf.replace('{current}', String(currentStep + 1)).replace('{total}', String(steps.length))}
          </p>

          {/* Troubleshooting */}
          {currentStep >= 2 && (
            <button
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-full mb-2"
            >
              <HelpCircle className="w-4 h-4" />
              {bt.troubleshooting}
            </button>
          )}

          {showTroubleshooting && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground animate-fade-in mb-4">
              {bt.troubleshootingTip}
            </div>
          )}
        </div>

        <DrawerFooter className="pt-0">
          <div className="flex gap-3">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {bt.back}
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleSkip} className="flex-1">
                {bt.skip}
              </Button>
            )}

            {isLastStep ? (
              <Button 
                onClick={handleComplete} 
                className="flex-1" 
                variant="gradient"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                {bt.done}
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1" variant="gradient">
                {bt.next}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
