import { useState } from 'react';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Personnel } from '@/types/hr';
import { mockDepartments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface PersonnelTableProps {
  personnel: Personnel[];
  onEdit: (person: Personnel) => void;
  onDelete: (id: string) => void;
  onView: (person: Personnel) => void;
}

const categoryLabels: Record<string, string> = {
  specialist_doctor: 'Specialist Doctor',
  occupational_doctor: 'Occupational Doctor',
  pharmacist: 'Pharmacist',
  dentist: 'Dentist',
  paramedical: 'Paramedical',
};

const categoryColors: Record<string, string> = {
  specialist_doctor: 'bg-primary/10 text-primary border-primary/20',
  occupational_doctor: 'bg-accent/10 text-accent border-accent/20',
  pharmacist: 'bg-success/10 text-success border-success/20',
  dentist: 'bg-warning/10 text-warning border-warning/20',
  paramedical: 'bg-secondary text-secondary-foreground border-secondary',
};

export function PersonnelTable({ personnel, onEdit, onDelete, onView }: PersonnelTableProps) {
  const getDepartmentName = (id: string) => {
    return mockDepartments.find(d => d.id === id)?.name || 'Unknown';
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Department</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {personnel.map((person, index) => (
              <tr 
                key={person.id} 
                className="group transition-colors hover:bg-muted/30"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-card-foreground">{person.firstName} {person.lastName}</span>
                    <span className="text-sm text-muted-foreground">{person.specialty}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-muted-foreground">{person.reference}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={cn("font-medium", categoryColors[person.category])}>
                    {categoryLabels[person.category]}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-card-foreground">{getDepartmentName(person.departmentId)}</td>
                <td className="px-6 py-4 text-card-foreground">{person.currentRank}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {person.step}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      person.status === 'active' && "bg-success/10 text-success border-success/20",
                      person.status === 'retired' && "bg-muted text-muted-foreground border-muted",
                      person.status === 'transferred' && "bg-accent/10 text-accent border-accent/20"
                    )}
                  >
                    {person.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(person)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(person)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(person.id)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
