import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Checkbox } from '../components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { AlertTriangle, Clock, FileText, Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ReviewDocument {
  id: string;
  name: string;
  caseNumber: string;
  uploadDate: string;
  language: 'ar' | 'en';
  aiScore: number;
  status: 'pending' | 'low_confidence' | 'requires_attention';
  uploadSource: 'manual' | 'integration';
  priority: 'high' | 'medium' | 'low';
}

const mockDocuments: ReviewDocument[] = [
  {
    id: '1',
    name: 'قرار_محكمة_عليا_2024_001.pdf',
    caseNumber: 'SC-2024-001',
    uploadDate: '2024-01-10',
    language: 'ar',
    aiScore: 45,
    status: 'low_confidence',
    uploadSource: 'manual',
    priority: 'high'
  },
  {
    id: '2',
    name: 'commercial_dispute_resolution.pdf',
    caseNumber: 'CC-2024-089',
    uploadDate: '2024-01-09',
    language: 'en',
    aiScore: 72,
    status: 'pending',
    uploadSource: 'integration',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'قضية_الأحوال_الشخصية_234.pdf',
    caseNumber: 'FC-2024-234',
    uploadDate: '2024-01-08',
    language: 'ar',
    aiScore: 38,
    status: 'requires_attention',
    uploadSource: 'manual',
    priority: 'high'
  }
];

const ReviewPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'priority'>('score');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low_confidence': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'requires_attention': return <Clock className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 50) return 'text-destructive';
    if (score < 70) return 'text-warning';
    return 'text-success';
  };

  const handleSelectDocument = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, docId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(mockDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving documents:', selectedDocuments);
    setSelectedDocuments([]);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejecting documents:', selectedDocuments);
    setSelectedDocuments([]);
  };

  const filteredDocuments = mockDocuments
    .filter(doc => 
      (filterStatus === 'all' || doc.status === filterStatus) &&
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doc.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score': return a.aiScore - b.aiScore;
        case 'date': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'priority': 
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default: return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('review.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('review.priorityQueue')} - {filteredDocuments.length} {t('documents.name').toLowerCase()}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('review.lowConfidence')}</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('review.requiresAttention')}</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.pendingReview')}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Today Reviewed</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('common.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {t('common.filter')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('low_confidence')}>
                    Low Confidence
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('requires_attention')}>
                    Requires Attention
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
                    Pending Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {selectedDocuments.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedDocuments.length} selected
                </span>
                <Button onClick={handleBulkApprove} size="sm" variant="default">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t('review.bulkApprove')}
                </Button>
                <Button onClick={handleBulkReject} size="sm" variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Bulk Reject
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedDocuments.length === mockDocuments.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>{t('documents.name')}</TableHead>
                <TableHead>{t('documents.caseNumber')}</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>{t('documents.score')}</TableHead>
                <TableHead>{t('documents.language')}</TableHead>
                <TableHead>{t('documents.uploadDate')}</TableHead>
                <TableHead>{t('documents.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedDocuments.includes(doc.id)}
                      onCheckedChange={(checked) => handleSelectDocument(doc.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getStatusIcon(doc.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.caseNumber}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(doc.priority)}>
                      {doc.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(doc.aiScore)}`}>
                      {doc.aiScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {doc.language.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          {t('documents.viewDocument')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t('documents.approvePublish')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          {t('documents.requestReprocess')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;