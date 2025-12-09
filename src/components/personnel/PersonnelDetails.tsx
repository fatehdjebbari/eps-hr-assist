import { Personnel } from '@/types/hr';
import { mockDepartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, MapPin, Briefcase, Building2, Award, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonnelDetailsProps {
  open: boolean;
  onClose: () => void;
  personnel: Personnel | null;
}

const categoryLabels: Record<string, string> = {
  specialist_doctor: 'Specialist Doctor',
  occupational_doctor: 'Occupational Doctor',
  pharmacist: 'Pharmacist',
  dentist: 'Dentist',
  paramedical: 'Paramedical',
};

export function PersonnelDetails({ open, onClose, personnel }: PersonnelDetailsProps) {
  if (!personnel) return null;

  const department = mockDepartments.find(d => d.id === personnel.departmentId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Personnel Details</DialogTitle>
          <DialogDescription>Complete information for {personnel.firstName} {personnel.lastName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
              {personnel.firstName[0]}{personnel.lastName[0]}
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {personnel.firstName} {personnel.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{personnel.specialty}</p>
              <Badge 
                variant="outline" 
                className={cn(
                  "mt-1",
                  personnel.status === 'active' && "bg-success/10 text-success border-success/20"
                )}
              >
                {personnel.status}
              </Badge>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Reference</p>
                <p className="font-mono text-sm font-medium text-foreground">{personnel.reference}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="text-sm font-medium text-foreground">{categoryLabels[personnel.category]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium text-foreground">{department?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Rank & Step</p>
                <p className="text-sm font-medium text-foreground">{personnel.currentRank} - Step {personnel.step}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium text-foreground">{new Date(personnel.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hire Date</p>
                  <p className="text-sm font-medium text-foreground">{new Date(personnel.hireDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">{personnel.address}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
