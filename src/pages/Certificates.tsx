import { useState } from 'react';
import { Search, FileText, Printer, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockPersonnel, mockDepartments } from '@/data/mockData';
import { Personnel } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);

  const filteredPersonnel = mockPersonnel.filter(p =>
    p.status === 'active' &&
    (p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDepartmentName = (id: string) => {
    return mockDepartments.find(d => d.id === id)?.name || 'Unknown';
  };

  const handleGenerateCertificate = () => {
    if (!selectedPersonnel) return;
    toast({
      title: 'Certificate generated',
      description: `Work certificate for ${selectedPersonnel.firstName} ${selectedPersonnel.lastName} is ready for printing.`,
    });
  };

  const calculateYearsOfService = (hireDate: string) => {
    const hire = new Date(hireDate);
    const now = new Date();
    return Math.floor((now.getTime() - hire.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  return (
    <MainLayout title="Work Certificates" subtitle="Generate and print work certificates">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Search and Select */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="font-display">Select Personnel</CardTitle>
            <CardDescription>
              Search by name or reference number to generate a work certificate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2">
              <Label>Personnel</Label>
              <Select onValueChange={(value) => {
                const person = mockPersonnel.find(p => p.id === value);
                setSelectedPersonnel(person || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a staff member" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPersonnel.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      <div className="flex items-center gap-2">
                        <span>{person.firstName} {person.lastName}</span>
                        <span className="text-xs text-muted-foreground">({person.reference})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPersonnel && (
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                    {selectedPersonnel.firstName[0]}{selectedPersonnel.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold">
                      {selectedPersonnel.firstName} {selectedPersonnel.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground">{selectedPersonnel.currentRank}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Department: </span>
                    <span className="font-medium">{getDepartmentName(selectedPersonnel.departmentId)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Years of Service: </span>
                    <span className="font-medium">{calculateYearsOfService(selectedPersonnel.hireDate)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                onClick={handleGenerateCertificate}
                disabled={!selectedPersonnel}
              >
                <Printer className="mr-2 h-4 w-4" />
                Generate & Print
              </Button>
              <Button 
                variant="outline" 
                disabled={!selectedPersonnel}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Preview */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="font-display">Certificate Preview</CardTitle>
            <CardDescription>
              Preview of the work certificate that will be generated
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedPersonnel ? (
              <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                <div className="text-center border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    ÉTABLISSEMENT PUBLIC DE SANTÉ DE PROXIMITÉ
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Direction des Ressources Humaines
                  </p>
                </div>

                <div className="text-center">
                  <h4 className="font-display text-xl font-bold text-primary uppercase tracking-wide">
                    Attestation de Travail
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Work Certificate</p>
                </div>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Le Directeur de l'Établissement Public de Santé de Proximité atteste que:
                  </p>
                  <p className="font-medium text-foreground">
                    <strong>M. / Mme {selectedPersonnel.firstName} {selectedPersonnel.lastName}</strong>
                  </p>
                  <p>
                    Né(e) le {new Date(selectedPersonnel.dateOfBirth).toLocaleDateString('fr-FR')}
                  </p>
                  <p>
                    Occupe le poste de <strong>{selectedPersonnel.currentRank}</strong> au sein du service{' '}
                    <strong>{getDepartmentName(selectedPersonnel.departmentId)}</strong> depuis le{' '}
                    {new Date(selectedPersonnel.hireDate).toLocaleDateString('fr-FR')}.
                  </p>
                  <p>
                    Référence: <span className="font-mono">{selectedPersonnel.reference}</span>
                  </p>
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Fait le {new Date().toLocaleDateString('fr-FR')}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Le Directeur</p>
                    <div className="h-12" />
                    <p className="text-xs text-muted-foreground">Signature et cachet</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Select a staff member to preview the certificate
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
