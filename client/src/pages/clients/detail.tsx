import { useRoute, useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Phone, MapPin, Edit2, Plus } from "lucide-react";
import { mockIndividualClients } from "@/lib/mock-data";
import { mockCommunications, mockDocuments } from "@/lib/communications";
import { ActivityTimeline } from "@/components/common/ActivityTimeline";
import { DocumentList } from "@/components/common/DocumentList";

export default function ClientDetail() {
  const [, params] = useRoute("/individual-clients/:id");
  const [, setLocation] = useLocation();
  
  const client = mockIndividualClients.find(c => c.id === params?.id);
  const clientCommunications = mockCommunications.filter(c => c.clientId === params?.id);
  const clientDocuments = mockDocuments.filter(d => d.clientId === params?.id);

  if (!client) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-muted-foreground">Client not found</p>
          <Button onClick={() => setLocation("/individual-clients")}>Back to Clients</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setLocation("/individual-clients")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">
                  {client.firstName} {client.lastName}
                </h1>
                <Badge 
                  variant={client.clientStatus === 'active' ? 'default' : client.clientStatus === 'inactive' ? 'secondary' : 'destructive'}
                  className={client.clientStatus === 'active' ? 'bg-emerald-500/15 text-emerald-700' : ''}
                >
                  {client.clientStatus}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Personal Tax Client</p>
            </div>
          </div>
          <Button className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Client
          </Button>
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm truncate">{client.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm">{client.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-sm">{client.city}, {client.postcode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">
              Activity
              {clientCommunications.length > 0 && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {clientCommunications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents">
              Documents
              {clientDocuments.length > 0 && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {clientDocuments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Employment & Income</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{client.employmentStatus.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Income Sources</p>
                    <p className="font-medium">{client.incomeSources || 'Not specified'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">NI Number</p>
                    <p className="font-mono font-medium text-sm">{client.nationalInsuranceNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">UTR</p>
                    <p className="font-mono font-medium text-sm">{client.utrNumber || 'Not registered'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {client.specialNotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{client.specialNotes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>Recent communications and interactions</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Log Activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ActivityTimeline communications={clientCommunications} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Uploaded files and records</CardDescription>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DocumentList documents={clientDocuments} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Client History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">{client.createdAt}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{client.updatedAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
