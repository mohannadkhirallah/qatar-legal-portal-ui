import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon, 
  User, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Upload,
  Edit,
  Trash2,
  Settings,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  documentId?: string;
  documentName?: string;
  details: string;
  ipAddress: string;
  sessionId: string;
  actionType: 'view' | 'approve' | 'reject' | 'upload' | 'edit' | 'delete' | 'login' | 'settings';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-10T15:30:00Z',
    user: 'أحمد محمد',
    userRole: 'Admin',
    action: 'Document Approved',
    documentId: 'DOC-2024-001',
    documentName: 'قرار_محكمة_عليا_2024_001.pdf',
    details: 'Document approved and published to target system',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_abc123',
    actionType: 'approve'
  },
  {
    id: '2',
    timestamp: '2024-01-10T14:45:00Z',
    user: 'فاطمة علي',
    userRole: 'Reviewer',
    action: 'Document Viewed',
    documentId: 'DOC-2024-002',
    documentName: 'commercial_dispute_resolution.pdf',
    details: 'Opened document in PDF viewer for review',
    ipAddress: '192.168.1.101',
    sessionId: 'sess_def456',
    actionType: 'view'
  },
  {
    id: '3',
    timestamp: '2024-01-10T14:15:00Z',
    user: 'محمد خالد',
    userRole: 'Publisher',
    action: 'Document Rejected',
    documentId: 'DOC-2024-003',
    documentName: 'قضية_الأحوال_الشخصية_234.pdf',
    details: 'Document rejected due to insufficient redaction quality',
    ipAddress: '192.168.1.102',
    sessionId: 'sess_ghi789',
    actionType: 'reject'
  },
  {
    id: '4',
    timestamp: '2024-01-10T13:30:00Z',
    user: 'Sarah Johnson',
    userRole: 'Reviewer',
    action: 'User Login',
    details: 'Successful authentication via Azure AD',
    ipAddress: '192.168.1.103',
    sessionId: 'sess_jkl012',
    actionType: 'login'
  },
  {
    id: '5',
    timestamp: '2024-01-10T12:20:00Z',
    user: 'أحمد محمد',
    userRole: 'Admin',
    action: 'Document Uploaded',
    documentId: 'DOC-2024-004',
    documentName: 'new_case_file_123.pdf',
    details: 'Manual document upload via admin interface',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_mno345',
    actionType: 'upload'
  },
  {
    id: '6',
    timestamp: '2024-01-10T11:15:00Z',
    user: 'فاطمة علي',
    userRole: 'Reviewer',
    action: 'Settings Modified',
    details: 'Updated AI score threshold from 65% to 70%',
    ipAddress: '192.168.1.101',
    sessionId: 'sess_pqr678',
    actionType: 'settings'
  }
];

const AuditPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'view': return <Eye className="h-4 w-4 text-primary" />;
      case 'approve': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'reject': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'upload': return <Upload className="h-4 w-4 text-primary" />;
      case 'edit': return <Edit className="h-4 w-4 text-warning" />;
      case 'delete': return <Trash2 className="h-4 w-4 text-destructive" />;
      case 'login': return <User className="h-4 w-4 text-success" />;
      case 'settings': return <Settings className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'approve': return 'bg-success text-success-foreground';
      case 'reject': return 'bg-destructive text-destructive-foreground';
      case 'login': return 'bg-primary text-primary-foreground';
      case 'upload': return 'bg-secondary text-secondary-foreground';
      case 'settings': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-destructive text-destructive-foreground';
      case 'Reviewer': return 'bg-primary text-primary-foreground';
      case 'Publisher': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.documentName && log.documentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    const matchesAction = selectedAction === 'all' || log.actionType === selectedAction;
    
    let matchesDate = true;
    if (selectedDate) {
      const logDate = new Date(log.timestamp).toDateString();
      const filterDate = selectedDate.toDateString();
      matchesDate = logDate === filterDate;
    }

    return matchesSearch && matchesUser && matchesAction && matchesDate;
  });

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const uniqueUsers = Array.from(new Set(mockAuditLogs.map(log => log.user)));
  const uniqueActions = Array.from(new Set(mockAuditLogs.map(log => log.actionType)));

  const exportLogs = () => {
    console.log('Exporting audit logs to CSV...');
    // Implementation for CSV export
  };

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.auditLogs')}</h1>
          <p className="text-muted-foreground mt-2">
            System activity and user action tracking
          </p>
        </div>
        <Button onClick={exportLogs}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Actions Today</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Documents Approved</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Security Events</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users, actions, or documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  User: {selectedUser === 'all' ? 'All' : selectedUser}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedUser('all')}>
                  All Users
                </DropdownMenuItem>
                {uniqueUsers.map(user => (
                  <DropdownMenuItem key={user} onClick={() => setSelectedUser(user)}>
                    {user}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Action: {selectedAction === 'all' ? 'All' : selectedAction}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedAction('all')}>
                  All Actions
                </DropdownMenuItem>
                {uniqueActions.map(action => (
                  <DropdownMenuItem key={action} onClick={() => setSelectedAction(action)}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {(selectedUser !== 'all' || selectedAction !== 'all' || selectedDate) && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedUser('all');
                  setSelectedAction('all');
                  setSelectedDate(undefined);
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Audit Log Entries</CardTitle>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {formatTimestamp(log.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{log.user}</span>
                      <Badge className={getRoleColor(log.userRole)}>
                        {log.userRole}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.actionType)}
                      <Badge className={getActionColor(log.actionType)}>
                        {log.action}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.documentName ? (
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{log.documentName}</p>
                        <p className="text-xs text-muted-foreground">{log.documentId}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate" title={log.details}>
                      {log.details}
                    </p>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.sessionId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditPage;