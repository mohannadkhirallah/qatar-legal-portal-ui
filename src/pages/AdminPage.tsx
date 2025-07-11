import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Progress } from '../components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Database,
  Activity,
  RefreshCw,
  Download,
  Shield,
  Clock
} from 'lucide-react';

const documentStats = [
  { name: 'Jan', total: 120, approved: 95, rejected: 15 },
  { name: 'Feb', total: 135, approved: 110, rejected: 12 },
  { name: 'Mar', total: 145, approved: 125, rejected: 8 },
  { name: 'Apr', total: 160, approved: 140, rejected: 10 },
  { name: 'May', total: 175, approved: 155, rejected: 12 },
  { name: 'Jun', total: 190, approved: 170, rejected: 8 }
];

const aiScoreDistribution = [
  { range: '0-20%', count: 5, color: '#dc2626' },
  { range: '21-40%', count: 12, color: '#ea580c' },
  { range: '41-60%', count: 18, color: '#d97706' },
  { range: '61-80%', count: 45, color: '#65a30d' },
  { range: '81-100%', count: 120, color: '#16a34a' }
];

const reviewerPerformance = [
  { name: 'أحمد محمد', reviewed: 45, avgTime: '2.3h', approved: 40, rejected: 5 },
  { name: 'فاطمة علي', reviewed: 52, avgTime: '1.8h', approved: 48, rejected: 4 },
  { name: 'محمد خالد', reviewed: 38, avgTime: '2.7h', approved: 35, rejected: 3 },
  { name: 'Sarah Johnson', reviewed: 41, avgTime: '2.1h', approved: 37, rejected: 4 }
];

const systemErrors = [
  { 
    id: 1, 
    type: 'Integration Failure', 
    message: 'Failed to connect to external document system', 
    timestamp: '2024-01-10 14:30', 
    status: 'active' 
  },
  { 
    id: 2, 
    type: 'AI Processing Error', 
    message: 'Timeout during document redaction process', 
    timestamp: '2024-01-10 13:15', 
    status: 'resolved' 
  },
  { 
    id: 3, 
    type: 'Storage Warning', 
    message: 'Blob storage approaching capacity limit', 
    timestamp: '2024-01-10 12:00', 
    status: 'active' 
  }
];

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const retryOperation = (errorId: number) => {
    console.log('Retrying operation for error:', errorId);
  };

  const exportReport = () => {
    console.log('Exporting admin report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.title')}</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive system management and analytics
          </p>
        </div>
        <Button onClick={exportReport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">{t('admin.reports')}</TabsTrigger>
          <TabsTrigger value="users">{t('admin.userManagement')}</TabsTrigger>
          <TabsTrigger value="system">{t('admin.systemSettings')}</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalDocuments')}</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-success">↑ 12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">48</p>
                    <p className="text-xs text-success">↑ 3 new this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Avg AI Score</p>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-success">↑ 5% improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">System Alerts</p>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-warning">2 require attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-l-4 border-primary pl-4">
                  <div>
                    <p className="font-medium">Document batch processed successfully</p>
                    <p className="text-sm text-muted-foreground">15 documents redacted with avg score 85%</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between border-l-4 border-warning pl-4">
                  <div>
                    <p className="font-medium">Integration endpoint timeout</p>
                    <p className="text-sm text-muted-foreground">External document system connection failed</p>
                  </div>
                  <span className="text-sm text-muted-foreground">4 hours ago</span>
                </div>
                <div className="flex items-center justify-between border-l-4 border-success pl-4">
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-muted-foreground">Sarah Johnson added as Legal Reviewer</p>
                  </div>
                  <span className="text-sm text-muted-foreground">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Document Processing Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Document Processing Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={documentStats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="approved" stroke="hsl(var(--success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="rejected" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>AI Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aiScoreDistribution}
                        dataKey="count"
                        nameKey="range"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ range, count }) => `${range}: ${count}`}
                      >
                        {aiScoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Reviewer Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Reviewer Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewerPerformance.map((reviewer, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{reviewer.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {reviewer.reviewed} docs ({reviewer.avgTime} avg)
                        </span>
                      </div>
                      <Progress 
                        value={(reviewer.approved / reviewer.reviewed) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Approved: {reviewer.approved}</span>
                        <span>Rejected: {reviewer.rejected}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                User Management
                <Button>Add New User</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">أحمد محمد</TableCell>
                    <TableCell>ahmed.mohamed@sjc.gov.qa</TableCell>
                    <TableCell><Badge>Admin</Badge></TableCell>
                    <TableCell>2024-01-10 15:30</TableCell>
                    <TableCell><Badge variant="outline" className="text-success">Active</Badge></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">فاطمة علي</TableCell>
                    <TableCell>fatima.ali@sjc.gov.qa</TableCell>
                    <TableCell><Badge variant="secondary">Reviewer</Badge></TableCell>
                    <TableCell>2024-01-10 14:20</TableCell>
                    <TableCell><Badge variant="outline" className="text-success">Active</Badge></TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Score Threshold</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">50%</span>
                    <div className="flex-1 bg-secondary h-2 rounded">
                      <div className="bg-primary h-2 rounded w-3/5"></div>
                    </div>
                    <span className="text-sm">100%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max File Size</label>
                  <p className="text-sm text-muted-foreground">50 MB</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Retry Attempts</label>
                  <p className="text-sm text-muted-foreground">3 attempts</p>
                </div>
                <Button className="w-full">Update Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Storage Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Source Documents</span>
                    <span className="text-sm">2.1 GB / 10 GB</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Redacted Documents</span>
                    <span className="text-sm">1.8 GB / 10 GB</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">System Logs</span>
                    <span className="text-sm">324 MB / 1 GB</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                System Error Logs
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell className="font-medium">{error.type}</TableCell>
                      <TableCell>{error.message}</TableCell>
                      <TableCell>{error.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={error.status === 'active' ? 'destructive' : 'outline'}>
                          {error.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {error.status === 'active' && (
                          <Button
                            onClick={() => retryOperation(error.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;