import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
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
  Download,
  ArrowLeft,
  GitCompareArrows,
  Shield,
  AlertTriangle
} from 'lucide-react';

const DocumentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

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
      sensitiveDataFound: ['SSN', 'Phone Numbers', 'Email Addresses'],
      redactedAreas: 8,
      aiConfidence: 92,
      pages: 12,
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
      sensitiveDataFound: ['Names', 'Case Numbers'],
      redactedAreas: 5,
      aiConfidence: 95,
      pages: 8,
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
      sensitiveDataFound: ['SSN', 'Bank Account', 'Personal ID'],
      redactedAreas: 12,
      aiConfidence: 78,
      pages: 15,
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
      sensitiveDataFound: ['Email', 'Phone'],
      redactedAreas: 3,
      aiConfidence: 88,
      pages: 6,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
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

  const handleDocumentReview = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleApprove = () => {
    // Handle approval logic
    console.log('Document approved:', selectedDocument?.id);
    setSelectedDocument(null);
  };

  const handleReject = () => {
    // Handle rejection logic
    console.log('Document rejected:', selectedDocument?.id);
    setSelectedDocument(null);
  };

  const handleRequestChanges = () => {
    // Handle request changes logic
    console.log('Changes requested:', selectedDocument?.id);
    setSelectedDocument(null);
  };

  if (selectedDocument) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button 
              variant="outline" 
              onClick={() => setSelectedDocument(null)}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Documents</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Document Review: {selectedDocument.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Case {selectedDocument.caseNumber} • AI Confidence: {selectedDocument.aiConfidence}%
              </p>
            </div>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            {getStatusBadge(selectedDocument.status)}
          </div>
        </div>

        {/* Document Information */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sensitive Data Found</h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedDocument.sensitiveDataFound.map((item: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Redacted Areas</h3>
                <p className="mt-2 text-2xl font-bold text-maroon-600">
                  {selectedDocument.redactedAreas}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">AI Confidence</h3>
                <p className={`mt-2 text-2xl font-bold ${getScoreColor(selectedDocument.aiConfidence)}`}>
                  {selectedDocument.aiConfidence}%
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {selectedDocument.pages}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side-by-side document comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Document */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <FileText className="h-5 w-5" />
                <span>Original Document</span>
              </CardTitle>
              <CardDescription>
                Source document as uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                <div>
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Original Document Preview</p>
                  <p className="text-sm text-gray-500">{selectedDocument.name}</p>
                  <p className="text-sm text-gray-500">{selectedDocument.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redacted Document */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Shield className="h-5 w-5" />
                <span>Redacted Document</span>
              </CardTitle>
              <CardDescription>
                AI-processed document with sensitive data masked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg p-8 text-center min-h-[500px] flex items-center justify-center">
                <div>
                  <Shield className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                  <p className="text-yellow-800 mb-2">Redacted Document Preview</p>
                  <p className="text-sm text-yellow-700">
                    {selectedDocument.redactedAreas} areas redacted
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="bg-black h-4 w-24 mx-auto rounded"></div>
                    <div className="bg-black h-4 w-16 mx-auto rounded"></div>
                    <div className="bg-black h-4 w-20 mx-auto rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <GitCompareArrows className="h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="font-medium">Review Decision</h3>
                  <p className="text-sm text-gray-600">
                    Compare both documents and decide on the redaction quality
                  </p>
                </div>
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <Button 
                  variant="outline" 
                  onClick={handleRequestChanges}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Request Changes</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReject}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject</span>
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve & Publish</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents for Review</CardTitle>
          <CardDescription>
            Click on a document to view side-by-side comparison and make review decisions
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
                <TableHead>AI Confidence</TableHead>
                <TableHead>Redacted Areas</TableHead>
                <TableHead>{t('documents.language')}</TableHead>
                <TableHead className="text-right rtl:text-left">{t('documents.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="cursor-pointer hover:bg-gray-50">
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
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className={`font-medium ${getScoreColor(doc.aiConfidence)}`}>
                        {doc.aiConfidence}%
                      </span>
                      {doc.aiConfidence < 80 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-maroon-600">
                      {doc.redactedAreas}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase">
                      {doc.language}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right rtl:text-left">
                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDocumentReview(doc)}
                        className="flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <GitCompareArrows className="h-4 w-4" />
                        <span>Review</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDocumentReview(doc)}>
                            <Eye className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            Download Original
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                            Reprocess
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
    </div>
  );
};

export default DocumentsPage;