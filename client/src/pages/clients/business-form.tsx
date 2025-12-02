import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useRoute } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { businessClientSchema, type BusinessClient } from "@/lib/types";
import { mockBusinessClients } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { AddressLookup } from "@/components/common/AddressLookup";
import { CompaniesHouseLookup } from "@/components/common/CompaniesHouseLookup";

export default function BusinessClientForm() {
  const [, params] = useRoute("/business-clients/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = params?.id && params.id !== "new";

  const form = useForm<BusinessClient>({
    resolver: zodResolver(businessClientSchema),
    defaultValues: {
      companyName: "",
      companyNumber: "",
      utrNumber: "",
      vatNumber: "",
      payeReference: "",
      responsiblePersonName: "",
      responsiblePersonEmail: "",
      responsiblePersonPhone: "",
      registeredAddressLine1: "",
      registeredAddressLine2: "",
      registeredCity: "",
      registeredPostcode: "",
      tradingAddressSame: true,
      tradingAddressLine1: "",
      tradingAddressLine2: "",
      tradingCity: "",
      tradingPostcode: "",
      clientStatus: "active",
      specialNotes: "",
    },
  });

  // Load data if editing (mock data)
  useEffect(() => {
    if (isEdit && params.id) {
      // In a real app, fetch from API
      const client = mockBusinessClients.find(c => c.id === params.id);
      if (client) {
        form.reset(client);
      }
    }
  }, [isEdit, params?.id, form]);

  function onSubmit(data: BusinessClient) {
    // In a real app, API call here
    console.log(data);
    toast({
      title: isEdit ? "Client Updated" : "Client Created",
      description: `${data.companyName} has been successfully saved.`,
    });
    setLocation("/business-clients");
  }

  const handleCompanyImport = (company: any) => {
    form.setValue("companyName", company.company_name, { shouldDirty: true });
    form.setValue("companyNumber", company.company_number, { shouldDirty: true });
    form.setValue("registeredAddressLine1", company.registered_office_address.address_line_1, { shouldDirty: true });
    form.setValue("registeredAddressLine2", company.registered_office_address.address_line_2 || "", { shouldDirty: true });
    form.setValue("registeredCity", company.registered_office_address.locality, { shouldDirty: true });
    form.setValue("registeredPostcode", company.registered_office_address.postal_code, { shouldDirty: true });
    
    toast({
      title: "Company Data Imported",
      description: "Details fetched from Companies House successfully.",
    });
  };

  const tradingAddressSame = form.watch("tradingAddressSame");

  const handleRegisteredAddressSelect = (address: { line1: string; line2: string; city: string; postcode: string }) => {
    form.setValue("registeredAddressLine1", address.line1, { shouldDirty: true });
    form.setValue("registeredAddressLine2", address.line2, { shouldDirty: true });
    form.setValue("registeredCity", address.city, { shouldDirty: true });
    form.setValue("registeredPostcode", address.postcode, { shouldDirty: true });
  };

  const handleTradingAddressSelect = (address: { line1: string; line2: string; city: string; postcode: string }) => {
    form.setValue("tradingAddressLine1", address.line1, { shouldDirty: true });
    form.setValue("tradingAddressLine2", address.line2, { shouldDirty: true });
    form.setValue("tradingCity", address.city, { shouldDirty: true });
    form.setValue("tradingPostcode", address.postcode, { shouldDirty: true });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setLocation("/business-clients")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEdit ? "Edit Business Client" : "Add New Business Client"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Fill in the company details below. All fields marked with * are required.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Legal entity details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEdit && <CompaniesHouseLookup onCompanySelect={handleCompanyImport} />}
                
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Solutions Ltd" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" maxLength={8} className="font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="utrNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTR Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" maxLength={10} className="font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Number</FormLabel>
                        <FormControl>
                          <Input placeholder="GB123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payeReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAYE Reference</FormLabel>
                        <FormControl>
                          <Input placeholder="123/AB456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Responsible Person */}
            <Card>
              <CardHeader>
                <CardTitle>Responsible Person</CardTitle>
                <CardDescription>Primary contact for this business.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="responsiblePersonName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsiblePersonEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsiblePersonPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="020 7123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Registered Address */}
            <Card>
              <CardHeader>
                <CardTitle>Registered Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AddressLookup onAddressSelect={handleRegisteredAddressSelect} />
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="registeredAddressLine1"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address Line 1 *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Business Park" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredAddressLine2"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Suite 101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="London" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredPostcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postcode *</FormLabel>
                        <FormControl>
                          <Input placeholder="EC1A 1BB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trading Address */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="tradingAddressSame"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Same as Registered Address?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {!tradingAddressSame && (
                  <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <AddressLookup onAddressSelect={handleTradingAddressSelect} />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="tradingAddressLine1"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="Trading Unit 5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tradingAddressLine2"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tradingCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tradingPostcode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="clientStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">🟢 Active</SelectItem>
                          <SelectItem value="inactive">⚪ Inactive</SelectItem>
                          <SelectItem value="left">🔴 Left</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any internal notes about this client..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => setLocation("/business-clients")}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? "Save Changes" : "Create Client"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
