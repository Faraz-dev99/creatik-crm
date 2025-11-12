'use client'

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { useRouter } from "next/navigation";
import { addContact } from "@/store/contact";
import { contactAllDataInterface } from "@/store/contact.interface";
import { handleFieldOptions } from "@/app/utils/handleFieldOptions";
import { getCampaign } from "@/store/masters/campaign/campaign";
import { getContactType } from "@/store/masters/contacttype/contacttype";
import { getCity } from "@/store/masters/city/city";
import { getLocation } from "@/store/masters/location/location";
import { getIndustries } from "@/store/masters/industries/industries";
import { getFunctionalAreas } from "@/store/masters/functionalarea/functionalarea";
import { getReferences } from "@/store/masters/references/references";
import { InputField } from "@/app/component/InputField";
import TextareaField from "@/app/component/datafields/TextareaField";
import BackButton from "@/app/component/buttons/BackButton";
import SaveButton from "@/app/component/buttons/SaveButton";

interface ErrorInterface {
  [key: string]: string; // dynamic key type for any field
}

export default function ContactAdd() {
  const [contactData, setContactData] = useState<contactAllDataInterface>({
    Campaign: "",
    Name: "",
    City: "",
    ContactType: "",
    ContactNo: "",
    Location: "",
    Email: "",
    CompanyName: "",
    Website: "",
    Status: "",
    Address: "",
    ContactIndustry: "",
    ContactFunctionalArea: "",
    ReferenceId: "",
    Notes: "",
    date: ""
  });

  const [errors, setErrors] = useState<ErrorInterface>({});
  const router = useRouter();
  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchFields();
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (label: string, selected: string) => {
      setContactData((prev) => ({ ...prev, [label]: selected }));
      setErrors((prev) => ({ ...prev, [label]: "" }));
    },
    []
  );

  const validateForm = () => {
    const newErrors: ErrorInterface = {};

    if (!contactData.Name.trim()) newErrors.Name = "Name is required";
    if (!contactData.Email.trim()) newErrors.Email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactData.Email)) newErrors.Email = "Invalid email format";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { ...contactData };
    if (contactData.date === "") delete (payload as any).date;

    const data = await addContact(payload);
    if (data) {
      toast.success("Contact added successfully!");
      setContactData({
        Campaign: "",
        Name: "",
        City: "",
        ContactType: "",
        ContactNo: "",
        Location: "",
        Email: "",
        CompanyName: "",
        Website: "",
        Status: "",
        Address: "",
        ContactIndustry: "",
        ContactFunctionalArea: "",
        ReferenceId: "",
        Notes: "",
        date: ""
      });
      setErrors({});
      router.push("/contact");
      return;
    }
    toast.error("Failed to add contact");
  };

  const fetchFields = async () => {
    await handleFieldOptions(
      [
        { key: "Status", staticData: ["Active", "Inactive"] },
        { key: "Campaign", fetchFn: getCampaign },
        { key: "ContactType", fetchFn: getContactType },
        { key: "City", fetchFn: getCity },
        { key: "Location", fetchFn: getLocation },
        { key: "ContactIndustry", fetchFn: getIndustries },
        { key: "ContactFunctionalArea", fetchFn: getFunctionalAreas },
        { key: "ReferenceId", fetchFn: getReferences },
      ],
      setFieldOptions
    );
  }

  // Dropdown data
  const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
  const city = ['Jaipur', 'Ajmer'];
  const contactType = ['Personal', 'Business'];
  const location = ['Location 1', 'Location 2'];
  const contactIndustry = ['IT', 'Finance', 'Real Estate'];
  const contactFunctionalArea = ['HR', 'Sales', 'Tech'];
  const referenceId = ['Ref001', 'Ref002'];
  const status = ['Active', 'Inactive'];

  return (
    <div className=" min-h-screen flex justify-center">
      <Toaster position="top-right" />
      <div className="w-full ">
        <div className="flex justify-end mb-4">
          
          <BackButton
            url="/contact"
            text="Back"
            icon={<ArrowLeft size={18} />}
          />
        </div>

        <div className="bg-white/90 backdrop-blur-lg w-full p-10 rounded-3xl shadow-2xl h-auto">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8 text-left border-b pb-4 border-gray-200">
              <h1 className="text-3xl font-extrabold text-[var(--color-secondary-darker)] leading-tight tracking-tight">
                Add <span className="text-[var(--color-primary)]">Contact</span>
              </h1>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">

                <SingleSelect options={Array.isArray(fieldOptions?.Campaign) ? fieldOptions.Campaign : []} label="Campaign" value={contactData.Campaign} onChange={(s) => handleSelectChange("Campaign", s)} />
                <InputField label="Contact Name" name="Name" value={contactData.Name} onChange={handleInputChange} error={errors.Name} />
                <SingleSelect options={Array.isArray(fieldOptions?.City) ? fieldOptions.City : []} label="City" value={contactData.City} onChange={(s) => handleSelectChange("City", s)} />
                <SingleSelect options={Array.isArray(fieldOptions?.ContactType) ? fieldOptions.ContactType : []} label="Contact Type" value={contactData.ContactType} onChange={(s) => handleSelectChange("ContactType", s)} />
                <InputField label="Contact No" name="ContactNo" value={contactData.ContactNo} onChange={handleInputChange} />
                <SingleSelect options={Array.isArray(fieldOptions?.Location) ? fieldOptions.Location : []} label="Location" value={contactData.Location} onChange={(s) => handleSelectChange("Location", s)} />
                <InputField label="Email" name="Email" value={contactData.Email} onChange={handleInputChange} error={errors.Email} />
                <InputField label="Company Name" name="CompanyName" value={contactData.CompanyName} onChange={handleInputChange} />
                <InputField label="Website" name="Website" value={contactData.Website} onChange={handleInputChange} />
                <SingleSelect options={Array.isArray(fieldOptions?.Status) ? fieldOptions.Status : []} label="Status" value={contactData.Status} onChange={(s) => handleSelectChange("Status", s)} />
                <InputField label="Address" name="Address" value={contactData.Address} onChange={handleInputChange} />
                <DateSelector label="Date" value={contactData.date} onChange={(val) => handleSelectChange("date", val)} />
                <SingleSelect options={Array.isArray(fieldOptions?.ContactIndustry) ? fieldOptions.ContactIndustry : []} label="Contact Industry" value={contactData.ContactIndustry} onChange={(s) => handleSelectChange("ContactIndustry", s)} />
                <SingleSelect options={Array.isArray(fieldOptions?.ContactFunctionalArea) ? fieldOptions.ContactFunctionalArea : []} label="Contact Functional Area" value={contactData.ContactFunctionalArea} onChange={(s) => handleSelectChange("ContactFunctionalArea", s)} />
                <SingleSelect options={Array.isArray(fieldOptions?.ReferenceId) ? fieldOptions.ReferenceId : []} label="Reference Id" value={contactData.ReferenceId} onChange={(s) => handleSelectChange("ReferenceId", s)} />
                <TextareaField label="Notes" name="Notes" value={contactData.Notes} onChange={handleInputChange} />
              </div>

              <div className="flex justify-end mt-4">
                
                <SaveButton text="Save" onClick={handleSubmit} />

              </div>
            </div>
          </form>
        </div>
      </div> 
    </div>
  );
}



