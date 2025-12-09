import { Users, Building2, Award, TrendingUp } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { mockPersonnel, mockDepartments } from '@/data/mockData';

export default function Dashboard() {
  const totalPersonnel = mockPersonnel.length;
  const activePersonnel = mockPersonnel.filter(p => p.status === 'active').length;
  const totalDepartments = mockDepartments.length;
  const averageStep = Math.round(mockPersonnel.reduce((acc, p) => acc + p.step, 0) / totalPersonnel * 10) / 10;

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back to EPSP HR Management">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Personnel"
            value={totalPersonnel}
            change="+2 this month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Active Staff"
            value={activePersonnel}
            change={`${Math.round((activePersonnel / totalPersonnel) * 100)}% of total`}
            changeType="neutral"
            icon={TrendingUp}
          />
          <StatCard
            title="Departments"
            value={totalDepartments}
            change="All operational"
            changeType="positive"
            icon={Building2}
          />
          <StatCard
            title="Avg. Step"
            value={averageStep}
            change="Career progression"
            changeType="neutral"
            icon={Award}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <DepartmentChart />
          <RecentActivity />
        </div>
      </div>
    </MainLayout>
  );
}
