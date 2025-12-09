import { useState } from 'react';
import { Plus, Award, FileText, Printer } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockPromotions, mockPersonnel } from '@/data/mockData';
import { Promotion, PromotionDuration } from '@/types/hr';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const durationLabels: Record<PromotionDuration, { label: string; years: string }> = {
  minimum: { label: 'Minimum', years: '2.5 years' },
  average: { label: 'Average', years: '3 years' },
  maximum: { label: 'Maximum', years: '3.5 years' },
};

const durationColors: Record<PromotionDuration, string> = {
  minimum: 'bg-success/10 text-success border-success/20',
  average: 'bg-primary/10 text-primary border-primary/20',
  maximum: 'bg-warning/10 text-warning border-warning/20',
};

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    personnelId: '',
    newRank: '',
    newStep: 1,
    duration: 'average' as PromotionDuration,
    decisionNumber: '',
    effectiveDate: '',
  });

  const getPersonnelName = (id: string) => {
    const person = mockPersonnel.find(p => p.id === id);
    return person ? `${person.firstName} ${person.lastName}` : 'Unknown';
  };

  const getPersonnelInfo = (id: string) => {
    return mockPersonnel.find(p => p.id === id);
  };

  const handleSubmit = () => {
    const person = getPersonnelInfo(formData.personnelId);
    if (!person) return;

    const newPromotion: Promotion = {
      id: String(Date.now()),
      personnelId: formData.personnelId,
      previousRank: person.currentRank,
      newRank: formData.newRank,
      previousStep: person.step,
      newStep: formData.newStep,
      duration: formData.duration,
      effectiveDate: formData.effectiveDate,
      decisionNumber: formData.decisionNumber,
    };

    setPromotions([...promotions, newPromotion]);
    setIsFormOpen(false);
    toast({
      title: 'Promotion recorded',
      description: `${getPersonnelName(formData.personnelId)} has been promoted successfully.`,
    });
  };

  const handlePrintDecision = (promotion: Promotion) => {
    toast({
      title: 'Printing decision',
      description: `Decision ${promotion.decisionNumber} is being prepared for printing.`,
    });
  };

  return (
    <MainLayout title="Promotions" subtitle="Manage personnel promotions">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Promotion
          </Button>
        </div>

        {/* Promotion Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promotion, index) => {
            const person = getPersonnelInfo(promotion.personnelId);
            return (
              <div
                key={promotion.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-card-foreground">
                        {getPersonnelName(promotion.personnelId)}
                      </h3>
                      <p className="text-sm text-muted-foreground">{person?.specialty}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(durationColors[promotion.duration])}>
                    {durationLabels[promotion.duration].label}
                  </Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Previous Rank</span>
                    <span className="font-medium text-card-foreground">{promotion.previousRank}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">New Rank</span>
                    <span className="font-medium text-primary">{promotion.newRank}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Step Change</span>
                    <span className="font-medium text-card-foreground">
                      {promotion.previousStep} → {promotion.newStep}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Effective Date</span>
                    <span className="font-medium text-card-foreground">
                      {new Date(promotion.effectiveDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    {promotion.decisionNumber}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handlePrintDecision(promotion)}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                </div>

                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
              </div>
            );
          })}
        </div>

        {/* Promotion Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">New Promotion</DialogTitle>
              <DialogDescription>
                Record a new promotion for a staff member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Personnel</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, personnelId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select personnel" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPersonnel.filter(p => p.status === 'active').map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.firstName} {person.lastName} - {person.currentRank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newRank">New Rank</Label>
                  <Input
                    id="newRank"
                    value={formData.newRank}
                    onChange={(e) => setFormData({ ...formData, newRank: e.target.value })}
                    placeholder="e.g., Médecin Chef"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newStep">New Step</Label>
                  <Input
                    id="newStep"
                    type="number"
                    min={1}
                    max={12}
                    value={formData.newStep}
                    onChange={(e) => setFormData({ ...formData, newStep: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Promotion Duration</Label>
                <Select 
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value as PromotionDuration })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(durationLabels).map(([key, { label, years }]) => (
                      <SelectItem key={key} value={key}>
                        {label} ({years})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="decisionNumber">Decision Number</Label>
                  <Input
                    id="decisionNumber"
                    value={formData.decisionNumber}
                    onChange={(e) => setFormData({ ...formData, decisionNumber: e.target.value })}
                    placeholder="e.g., DEC-2024-0001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Record Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
