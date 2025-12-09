import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PersonnelTable } from '@/components/personnel/PersonnelTable';
import { PersonnelForm } from '@/components/personnel/PersonnelForm';
import { PersonnelDetails } from '@/components/personnel/PersonnelDetails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockPersonnel } from '@/data/mockData';
import { Personnel } from '@/types/hr';
import { toast } from '@/hooks/use-toast';

export default function PersonnelPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);

  const filteredPersonnel = personnel.filter((p) => {
    const matchesSearch = 
      p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setSelectedPersonnel(null);
    setIsFormOpen(true);
  };

  const handleEdit = (person: Personnel) => {
    setSelectedPersonnel(person);
    setIsFormOpen(true);
  };

  const handleView = (person: Personnel) => {
    setSelectedPersonnel(person);
    setIsDetailsOpen(true);
  };

  const handleDelete = (id: string) => {
    setPersonnel(personnel.filter(p => p.id !== id));
    toast({
      title: 'Personnel deleted',
      description: 'The personnel record has been removed.',
    });
  };

  const handleSubmit = (data: Partial<Personnel>) => {
    if (selectedPersonnel) {
      setPersonnel(personnel.map(p => 
        p.id === selectedPersonnel.id ? { ...p, ...data } : p
      ));
      toast({
        title: 'Personnel updated',
        description: 'The personnel information has been updated successfully.',
      });
    } else {
      const newPersonnel: Personnel = {
        id: String(Date.now()),
        ...data as Personnel,
      };
      setPersonnel([...personnel, newPersonnel]);
      toast({
        title: 'Personnel added',
        description: 'New personnel has been added successfully.',
      });
    }
  };

  return (
    <MainLayout title="Personnel Management" subtitle="Manage all staff members">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="specialist_doctor">Specialist Doctor</SelectItem>
                <SelectItem value="occupational_doctor">Occupational Doctor</SelectItem>
                <SelectItem value="pharmacist">Pharmacist</SelectItem>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="paramedical">Paramedical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Personnel
          </Button>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredPersonnel.length} of {personnel.length} personnel
        </p>

        {/* Table */}
        <PersonnelTable
          personnel={filteredPersonnel}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        {/* Form Dialog */}
        <PersonnelForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedPersonnel}
        />

        {/* Details Dialog */}
        <PersonnelDetails
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          personnel={selectedPersonnel}
        />
      </div>
    </MainLayout>
  );
}
