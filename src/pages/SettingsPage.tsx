import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Settings, 
  Database, 
  Shield, 
  Key,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface MaskingKeyword {
  id: string;
  keyword: string;
  language: 'ar' | 'en' | 'both';
  isRegex: boolean;
  category: 'personal' | 'financial' | 'legal' | 'custom';
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

const mockKeywords: MaskingKeyword[] = [
  {
    id: '1',
    keyword: 'رقم الهوية',
    language: 'ar',
    isRegex: false,
    category: 'personal',
    createdBy: 'أحمد محمد',
    createdAt: '2024-01-01',
    lastModified: '2024-01-05'
  },
  {
    id: '2',
    keyword: '\\d{2,8}\\-\\d{4}\\-\\d{7}',
    language: 'both',
    isRegex: true,
    category: 'personal',
    createdBy: 'System',
    createdAt: '2024-01-01',
    lastModified: '2024-01-01'
  },
  {
    id: '3',
    keyword: 'Social Security',
    language: 'en',
    isRegex: false,
    category: 'personal',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-03',
    lastModified: '2024-01-03'
  },
  {
    id: '4',
    keyword: 'رقم الحساب المصرفي',
    language: 'ar',
    isRegex: false,
    category: 'financial',
    createdBy: 'فاطمة علي',
    createdAt: '2024-01-04',
    lastModified: '2024-01-08'
  }
];

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('keywords');
  const [isAddKeywordOpen, setIsAddKeywordOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<MaskingKeyword | null>(null);
  const [aiThreshold, setAiThreshold] = useState([70]);
  const [autoPublish, setAutoPublish] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  
  // Form states
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    language: 'en' as 'ar' | 'en' | 'both',
    isRegex: false,
    category: 'custom' as 'personal' | 'financial' | 'legal' | 'custom'
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-primary text-primary-foreground';
      case 'financial': return 'bg-warning text-warning-foreground';
      case 'legal': return 'bg-success text-success-foreground';
      case 'custom': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'ar': return '🇶🇦';
      case 'en': return '🇺🇸';
      case 'both': return '🌐';
      default: return '❓';
    }
  };

  const handleAddKeyword = () => {
    console.log('Adding new keyword:', newKeyword);
    setIsAddKeywordOpen(false);
    setNewKeyword({
      keyword: '',
      language: 'en',
      isRegex: false,
      category: 'custom'
    });
  };

  const handleEditKeyword = (keyword: MaskingKeyword) => {
    setEditingKeyword(keyword);
  };

  const handleDeleteKeyword = (id: string) => {
    console.log('Deleting keyword:', id);
  };

  const handleSaveSystemSettings = () => {
    console.log('Saving system settings:', {
      aiThreshold: aiThreshold[0],
      autoPublish,
      strictMode
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.systemSettings')}</h1>
          <p className="text-muted-foreground mt-2">
            Manage masking keywords, AI settings, and system configuration
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="keywords">{t('admin.maskingKeywords')}</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="keywords" className="space-y-6">
          {/* Keywords Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  Masking Keywords Management
                </CardTitle>
                <Dialog open={isAddKeywordOpen} onOpenChange={setIsAddKeywordOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Keyword
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Masking Keyword</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="keyword">Keyword/Pattern</Label>
                        <Input
                          id="keyword"
                          value={newKeyword.keyword}
                          onChange={(e) => setNewKeyword({...newKeyword, keyword: e.target.value})}
                          placeholder="Enter keyword or regex pattern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={newKeyword.language} onValueChange={(value: any) => setNewKeyword({...newKeyword, language: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="both">Both Languages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={newKeyword.category} onValueChange={(value: any) => setNewKeyword({...newKeyword, category: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Information</SelectItem>
                            <SelectItem value="financial">Financial Data</SelectItem>
                            <SelectItem value="legal">Legal Information</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="regex"
                          checked={newKeyword.isRegex}
                          onCheckedChange={(checked) => setNewKeyword({...newKeyword, isRegex: checked})}
                        />
                        <Label htmlFor="regex">Regular Expression Pattern</Label>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddKeywordOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddKeyword}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Keyword
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword/Pattern</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockKeywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-mono max-w-xs">
                        <div className="flex items-center space-x-2">
                          {keyword.isRegex ? <EyeOff className="h-4 w-4 text-warning" /> : <Eye className="h-4 w-4 text-primary" />}
                          <span className="truncate">{keyword.keyword}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span>{getLanguageFlag(keyword.language)}</span>
                          <span>{keyword.language === 'both' ? 'Both' : keyword.language.toUpperCase()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(keyword.category)}>
                          {keyword.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={keyword.isRegex ? 'destructive' : 'outline'}>
                          {keyword.isRegex ? 'Regex' : 'Text'}
                        </Badge>
                      </TableCell>
                      <TableCell>{keyword.createdBy}</TableCell>
                      <TableCell>{keyword.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditKeyword(keyword)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteKeyword(keyword.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  AI Processing Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>AI Confidence Threshold: {aiThreshold[0]}%</Label>
                    <Slider
                      value={aiThreshold}
                      onValueChange={setAiThreshold}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      Documents with AI confidence below this threshold will require manual review
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto-Publish High Confidence Documents</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically publish documents with confidence above 90%
                      </p>
                    </div>
                    <Switch checked={autoPublish} onCheckedChange={setAutoPublish} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Strict Redaction Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Apply more aggressive masking patterns
                      </p>
                    </div>
                    <Switch checked={strictMode} onCheckedChange={setStrictMode} />
                  </div>
                </div>

                <Button onClick={handleSaveSystemSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save AI Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="text-sm font-medium">2.3 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="text-sm font-medium">94.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Average Confidence Score</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Documents Processed Today</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recent Performance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">High confidence batch completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm">3 documents need manual review</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          {/* Storage Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Storage Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Source Documents Container</Label>
                  <Input value="sjc-source-documents" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Target Documents Container</Label>
                  <Input value="sjc-target-documents" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div className="space-y-2">
                  <Label>Retention Period (Days)</Label>
                  <Input type="number" defaultValue="365" />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Storage Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Source Container</span>
                    <span className="text-sm font-medium">2.1 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-primary h-2 rounded w-1/5"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Container</span>
                    <span className="text-sm font-medium">1.8 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-success h-2 rounded w-1/6"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">System Logs</span>
                    <span className="text-sm font-medium">324 MB / 1 GB</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded">
                    <div className="bg-warning h-2 rounded w-1/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all user actions and system events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Require MFA for Admin Actions</Label>
                    <p className="text-sm text-muted-foreground">
                      Additional authentication for sensitive operations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Session Timeout (Minutes)</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatic logout after inactivity
                    </p>
                  </div>
                  <Input type="number" defaultValue="60" className="w-20" />
                </div>

                <div className="space-y-2">
                  <Label>Allowed IP Ranges</Label>
                  <Textarea
                    placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                    className="h-20"
                  />
                </div>

                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Valid</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Azure AD Integration</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Encryption</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Firewall Status</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recent Security Events</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Certificate renewed successfully</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm">Unusual login attempt detected</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;