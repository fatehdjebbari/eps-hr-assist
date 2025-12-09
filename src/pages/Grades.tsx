import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockGrades, mockBodies } from '@/data/mockData';
import { Grade, Body } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  const [bodies, setBodies] = useState<Body[]>(mockBodies);
  const [isGradeFormOpen, setIsGradeFormOpen] = useState(false);
  const [isBodyFormOpen, setIsBodyFormOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedBody, setSelectedBody] = useState<Body | null>(null);
  const [gradeForm, setGradeForm] = useState({ code: '', designationFr: '', designationAr: '' });
  const [bodyForm, setBodyForm] = useState({ code: '', designationFr: '', designationAr: '' });

  const handleAddGrade = () => {
    setSelectedGrade(null);
    setGradeForm({ code: '', designationFr: '', designationAr: '' });
    setIsGradeFormOpen(true);
  };

  const handleEditGrade = (grade: Grade) => {
    setSelectedGrade(grade);
    setGradeForm({ code: grade.code, designationFr: grade.designationFr, designationAr: grade.designationAr });
    setIsGradeFormOpen(true);
  };

  const handleDeleteGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
    toast({ title: 'Grade deleted' });
  };

  const handleSubmitGrade = () => {
    if (selectedGrade) {
      setGrades(grades.map(g =>
        g.id === selectedGrade.id ? { ...g, ...gradeForm } : g
      ));
      toast({ title: 'Grade updated' });
    } else {
      setGrades([...grades, { id: String(Date.now()), ...gradeForm }]);
      toast({ title: 'Grade created' });
    }
    setIsGradeFormOpen(false);
  };

  const handleAddBody = () => {
    setSelectedBody(null);
    setBodyForm({ code: '', designationFr: '', designationAr: '' });
    setIsBodyFormOpen(true);
  };

  const handleEditBody = (body: Body) => {
    setSelectedBody(body);
    setBodyForm({ code: body.code, designationFr: body.designationFr, designationAr: body.designationAr });
    setIsBodyFormOpen(true);
  };

  const handleDeleteBody = (id: string) => {
    setBodies(bodies.filter(b => b.id !== id));
    toast({ title: 'Body deleted' });
  };

  const handleSubmitBody = () => {
    if (selectedBody) {
      setBodies(bodies.map(b =>
        b.id === selectedBody.id ? { ...b, ...bodyForm } : b
      ));
      toast({ title: 'Body updated' });
    } else {
      setBodies([...bodies, { id: String(Date.now()), ...bodyForm }]);
      toast({ title: 'Body created' });
    }
    setIsBodyFormOpen(false);
  };

  return (
    <MainLayout title="Grades & Bodies" subtitle="Manage grades and professional bodies">
      <Tabs defaultValue="grades" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="bodies">Bodies</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleAddGrade}>
              <Plus className="mr-2 h-4 w-4" />
              Add Grade
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Designation (French)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Designation (Arabic)</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {grades.map((grade) => (
                  <tr key={grade.id} className="group transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4 font-mono text-sm">{grade.code}</td>
                    <td className="px-6 py-4">{grade.designationFr}</td>
                    <td className="px-6 py-4 text-right" dir="rtl">{grade.designationAr}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => handleEditGrade(grade)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteGrade(grade.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="bodies" className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleAddBody}>
              <Plus className="mr-2 h-4 w-4" />
              Add Body
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Designation (French)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Designation (Arabic)</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bodies.map((body) => (
                  <tr key={body.id} className="group transition-colors hover:bg-muted/30">
                    <td className="px-6 py-4 font-mono text-sm">{body.code}</td>
                    <td className="px-6 py-4">{body.designationFr}</td>
                    <td className="px-6 py-4 text-right" dir="rtl">{body.designationAr}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => handleEditBody(body)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteBody(body.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Grade Form Dialog */}
      <Dialog open={isGradeFormOpen} onOpenChange={setIsGradeFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {selectedGrade ? 'Edit Grade' : 'Add Grade'}
            </DialogTitle>
            <DialogDescription>
              Enter grade information in both French and Arabic.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gradeCode">Code</Label>
              <Input
                id="gradeCode"
                value={gradeForm.code}
                onChange={(e) => setGradeForm({ ...gradeForm, code: e.target.value.toUpperCase() })}
                placeholder="e.g., DOC-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeFr">Designation (French)</Label>
              <Input
                id="gradeFr"
                value={gradeForm.designationFr}
                onChange={(e) => setGradeForm({ ...gradeForm, designationFr: e.target.value })}
                placeholder="e.g., Médecin Résident"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeAr">Designation (Arabic)</Label>
              <Input
                id="gradeAr"
                value={gradeForm.designationAr}
                onChange={(e) => setGradeForm({ ...gradeForm, designationAr: e.target.value })}
                placeholder="e.g., طبيب مقيم"
                dir="rtl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGradeFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitGrade}>
              {selectedGrade ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Body Form Dialog */}
      <Dialog open={isBodyFormOpen} onOpenChange={setIsBodyFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              {selectedBody ? 'Edit Body' : 'Add Body'}
            </DialogTitle>
            <DialogDescription>
              Enter body information in both French and Arabic.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bodyCode">Code</Label>
              <Input
                id="bodyCode"
                value={bodyForm.code}
                onChange={(e) => setBodyForm({ ...bodyForm, code: e.target.value.toUpperCase() })}
                placeholder="e.g., MED"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bodyFr">Designation (French)</Label>
              <Input
                id="bodyFr"
                value={bodyForm.designationFr}
                onChange={(e) => setBodyForm({ ...bodyForm, designationFr: e.target.value })}
                placeholder="e.g., Corps Médical"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bodyAr">Designation (Arabic)</Label>
              <Input
                id="bodyAr"
                value={bodyForm.designationAr}
                onChange={(e) => setBodyForm({ ...bodyForm, designationAr: e.target.value })}
                placeholder="e.g., السلك الطبي"
                dir="rtl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBodyFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitBody}>
              {selectedBody ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
