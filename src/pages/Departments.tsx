import { useState } from 'react';
import { Plus, Building2, Users, Edit, Trash2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDepartments, mockPersonnel } from '@/data/mockData';
import { Department } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '' });

  const getStaffCount = (deptId: string) => {
    return mockPersonnel.filter(p => p.departmentId === deptId).length;
  };

  const handleAdd = () => {
    setSelectedDepartment(null);
    setFormData({ name: '', code: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDepartment(dept);
    setFormData({ name: dept.name, code: dept.code });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
    toast({
      title: 'Department deleted',
      description: 'The department has been removed.',
    });
  };

  const handleSubmit = () => {
    if (selectedDepartment) {
      setDepartments(departments.map(d =>
        d.id === selectedDepartment.id
          ? { ...d, name: formData.name, code: formData.code }
          : d
      ));
      toast({
        title: 'Department updated',
        description: 'The department information has been updated.',
      });
    } else {
      const newDept: Department = {
        id: String(Date.now()),
        name: formData.name,
        code: formData.code,
        headCount: 0,
      };
      setDepartments([...departments, newDept]);
      toast({
        title: 'Department created',
        description: 'New department has been added successfully.',
      });
    }
    setIsFormOpen(false);
  };

  return (
    <MainLayout title="Departments" subtitle="Manage hospital departments">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-card-foreground">{dept.name}</h3>
                    <p className="text-sm font-mono text-muted-foreground">{dept.code}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(dept)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{getStaffCount(dept.id)} staff members</span>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
            </div>
          ))}
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">
                {selectedDepartment ? 'Edit Department' : 'Add Department'}
              </DialogTitle>
              <DialogDescription>
                {selectedDepartment ? 'Update department information.' : 'Create a new department.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Cardiology"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Department Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., CARD"
                  maxLength={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {selectedDepartment ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
