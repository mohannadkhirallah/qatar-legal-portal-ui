
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  MoreHorizontal,
  Upload,
  Download
} from 'lucide-react';

const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('original');

  const documents = [
    {
      id: 1,
      name: 'قضية_رقم_2024_045.pdf',
      caseNumber: '2024/045',
      uploadDate: '2024-01-15',
      status: 'pending',
      score: 85,
      language: 'ar',
      source: 'manual',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'case_2024_046.pdf',
      caseNumber: '2024/046',
      uploadDate: '2024-01-14',
      status: 'approved',
      score: 92,
      language: 'en',
      source: 'integration',
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'قضية_رقم_2024_047.pdf',
      caseNumber: '2024/047',
      uploadDate: '2024-01-13',
      status: 'rejected',
      score: 65,
      language: 'ar',
      source: 'manual',
      size: '3.2 MB',
    },
    {
      id: 4,
      name: 'case_2024_048.pdf',
      caseNumber: '2024/048',
      uploadDate: '2024-01-12',
      status: 'processing',
      score: 78,
      language: 'en',
      source: 'integration',
      size: '2.1 MB',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.caseNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('common.documents')}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and review legal documents
          </p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="bg-maroon-600 hover:bg-maroon-700 text-white">
            <Upload className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
            {t('dashboard.uploadDocument')}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <div className="flex-1 relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pl-4 rtl:pr-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-4 w-4" />
              <span>{t('common.filter')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="original" className="flex items-center space-x-2 rtl:space-x-reverse">
            <FileText className="h-4 w-4" />
            <span>{t('dashboard.originalDocuments')}</span>
          </TabsTrigger>
          <TabsTrigger value="redacted" className="flex items-center space-x-2 rtl:space-x-reverse">
            <FileText className="h-4 w-4" />
            <span>{t('dashboard.redactedDocuments')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="original" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Documents</CardTitle>
              <CardDescription>
                Source documents uploaded for processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('documents.name')}</TableHead>
                    <TableHead>{t('documents.caseNumber')}</TableHead>
                    <TableHead>{t('documents.uploadDate')}</TableHead>
                    <TableHead>{t('documents.status')}</TableHead>
                    <TableHead>{t('documents.score')}</TableHead>
                    <TableHead>{t('documents.language')}</TableHead>
                    <TableHead className="text-right rtl:text-left">{t('documents.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.caseNumber}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getScoreColor(doc.score)}`}>
                          {doc.score}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="uppercase">
                          {doc.language}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right rtl:text-left">
                        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                {t('documents.approvePublish')}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                {t('common.reject')}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                                {t('documents.requestReprocess')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redacted" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Redacted Documents</CardTitle>
              <CardDescription>
                AI-processed documents with sensitive information masked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No redacted documents yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Documents will appear here after AI processing is complete
                </p>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
