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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { individualClientSchema, type IndividualClient } from "@/lib/types";
import { mockIndividualClients } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import { AddressLookup } from "@/components/common/AddressLookup";

export default function IndividualClientForm() {
  const [, params] = useRoute("/individual-clients/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = params?.id && params.id !== "new";

  const form = useForm<IndividualClient>({
    resolver: zodResolver(individualClientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      nationalInsuranceNumber: "",
      hasUtr: false,
      utrNumber: "",
      employmentStatus: "employed",
      incomeSources: "",
      clientStatus: "active",
      specialNotes: "",
    },
  });

  // Load data if editing (mock data)
  useEffect(() => {
    if (isEdit && params.id) {
      // In a real app, fetch from API
      const client = mockIndividualClients.find(c => c.id === params.id);
      if (client) {
        form.reset(client);
      }
    }
  }, [isEdit, params?.id, form]);

  function onSubmit(data: IndividualClient) {
    // In a real app, API call here
    console.log(data);
    toast({
      title: isEdit ? "Client Updated" : "Client Created",
      description: `${data.firstName} ${data.lastName} has been successfully saved.`,
    });
    setLocation("/individual-clients");
  }

  const handleAddressSelect = (address: { line1: string; line2: string; city: string; postcode: string }) => {
    form.setValue("addressLine1", address.line1, { shouldDirty: true });
    form.setValue("addressLine2", address.line2, { shouldDirty: true });
    form.setValue("city", address.city, { shouldDirty: true });
    form.setValue("postcode", address.postcode, { shouldDirty: true });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setLocation("/individual-clients")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEdit ? "Edit Individual Client" : "Add New Individual Client"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Fill in the details below. All fields marked with * are required.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic contact details for the client.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="07700 900123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle>Address Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AddressLookup onAddressSelect={handleAddressSelect} />
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Address Line 1 *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 High Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
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
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode *</FormLabel>
                      <FormControl>
                        <Input placeholder="SW1A 1AA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle>Tax & Employment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nationalInsuranceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National Insurance Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="QQ123456C" className="uppercase font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self_employed">Self Employed</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                            <SelectItem value="pensioner">Pensioner</SelectItem>
                            <SelectItem value="multiple_income">Multiple Income Sources</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="hasUtr"
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
                          Registered for Self Assessment?
                        </FormLabel>
                        <FormDescription>
                          Check this if the client has a UTR number.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("hasUtr") && (
                  <FormField
                    control={form.control}
                    name="utrNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTR Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" maxLength={10} className="font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="incomeSources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Income Sources</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe income sources (e.g., Salary, Rental Income, Dividends)" 
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
              <Button variant="outline" type="button" onClick={() => setLocation("/individual-clients")}>
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
