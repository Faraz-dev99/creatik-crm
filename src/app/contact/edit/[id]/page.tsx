'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import DateSelector from "@/app/component/DateSelector";
import { getContact, getContactById, updateContact } from "@/store/contact";
import { contactAllDataInterface } from "@/store/contact.interface";
import { getCampaign } from "@/store/masters/campaign/campaign";
import { getContactType } from "@/store/masters/contacttype/contacttype";
import { getCity } from "@/store/masters/city/city";
import { getLocation } from "@/store/masters/location/location";
import { getIndustries } from "@/store/masters/industries/industries";
import { getFunctionalAreas } from "@/store/masters/functionalarea/functionalarea";
import { getReferences } from "@/store/masters/references/references";
import { handleFieldOptions } from "@/app/utils/handleFieldOptions";
import TextareaField from "@/app/component/datafields/TextareaField";
import { InputField } from "@/app/component/InputField";
import BackButton from "@/app/component/buttons/BackButton";
import SaveButton from "@/app/component/buttons/SaveButton";


interface ErrorInterface {
    [key: string]: string;
}

export default function ContactEdit() {
    const { id } = useParams();
    const router = useRouter();
    const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({});

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
    const [loading, setLoading] = useState(true);

    // Fetch contact by id
    useEffect(() => {
        const fetchContact = async () => {
            const data = await getContactById(id as string);
            console.log(data)
            if (data) {
                setContactData({
                        Campaign: data.Campaign,
                        Name: data.Name,
                        City: data.City,
                        ContactType: data.ContactType,
                        ContactNo: data.ContactNo,
                        Location: data.Location,
                        Email: data.Email,
                        CompanyName: data.CompanyName,
                        Website: data.Website,
                        Status: data.Status,
                        Address: data.Address,
                        ContactIndustry: data.ContactIndustry,
                        ContactFunctionalArea: data.ContactFunctionalArea,
                        ReferenceId: data.ReferenceId,
                        Notes: data.Notes,
                        date: data.date
                    });
    setLoading(false);
    return;
}
toast.error("Error fetching contact details");
setLoading(false);

        };

if (id) {

    fetchContact();
    fetchFields();
}
    }, []);

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
    if (!contactData.Email.trim()) {
        newErrors.Email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactData.Email)) {
        newErrors.Email = "Invalid email format";
    }
    return newErrors;
};

const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        console.log("errors")
        return;
    }

    const payload = { ...contactData };
    if (contactData.date == "") delete (payload as any).date;

    const data = await updateContact(id as string, payload)
    if (data) {
        toast.success("Contact updated successfully!");
        router.push("/contact");
        return;
    }
    toast.error("Failed to updated contact");


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

const campaign = ['Buyer', 'Seller', 'Rent Out', 'Rent In', 'Hostel/PG', 'Agents', 'Services', 'Others', 'Guest House', 'Happy Stay'];
const city = ['Jaipur', 'Ajmer'];
const contactType = ['Personal', 'Business'];
const location = ['Location 1', 'Location 2'];
const contactIndustry = ['IT', 'Finance', 'Real Estate'];
const contactFunctionalArea = ['HR', 'Sales', 'Tech'];
const referenceId = ['Ref001', 'Ref002'];
const status = ['Active', 'Inactive'];



return (
    <div className="min-h-screen flex justify-center">
        <Toaster position="top-right" />
        <div className="w-full">
            <div className="flex justify-end mb-4">
                
                <BackButton
                  url="/contact"
                  text="Back"
                  icon={<ArrowLeft size={18} />}
                 />
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-8 text-left border-b pb-4 border-gray-200">
                        <h1 className="text-2xl font-bold text-[var(--color-secondary-darker)] leading-tight tracking-tight">
                            Edit <span className="text-[var(--color-primary)]">Contact</span>
                        </h1>
                    </div>

                    <div className="flex flex-col space-y-6 w-full">
                        <div className="grid grid-cols-3 gap-6 w-full max-lg:grid-cols-2 max-md:grid-cols-1">

                            <SingleSelect options={Array.isArray(fieldOptions?.Campaign) ? fieldOptions.Campaign : []} value={contactData.Campaign} label="Campaign" onChange={(val) => handleSelectChange("Campaign", val)} />
                            <InputField label="Contact Name" name="Name" value={contactData.Name} onChange={handleInputChange} error={errors.Name} />
                            <SingleSelect options={Array.isArray(fieldOptions?.City) ? fieldOptions.City : []} value={contactData.City} label="City" onChange={(val) => handleSelectChange("City", val)} />
                            <SingleSelect options={Array.isArray(fieldOptions?.ContactType) ? fieldOptions.ContactType : []} value={contactData.ContactType} label="Contact Type" onChange={(val) => handleSelectChange("ContactType", val)} />
                            <InputField label="Contact No" name="ContactNo" value={contactData.ContactNo} onChange={handleInputChange} />
                            <SingleSelect options={Array.isArray(fieldOptions?.Location) ? fieldOptions.Location : []} value={contactData.Location} label="Location" onChange={(val) => handleSelectChange("Location", val)} />
                            <InputField label="Email" name="Email" value={contactData.Email} onChange={handleInputChange} error={errors.Email} />
                            <InputField label="Company Name" name="CompanyName" value={contactData.CompanyName} onChange={handleInputChange} />
                            <InputField label="Website" name="Website" value={contactData.Website} onChange={handleInputChange} />
                            <SingleSelect options={Array.isArray(fieldOptions?.Status) ? fieldOptions.Status : []} value={contactData.Status} label="Status" onChange={(val) => handleSelectChange("Status", val)} />
                            <InputField label="Address" name="Address" value={contactData.Address} onChange={handleInputChange} />
                            <DateSelector
                                label="Date"
                                value={contactData.date} // pass current state
                                onChange={(val) => handleSelectChange("date", val)} // update state on change
                            />
                            <SingleSelect options={Array.isArray(fieldOptions?.ContactIndustry) ? fieldOptions.ContactIndustry : []} value={contactData.ContactIndustry} label="Contact Industry" onChange={(val) => handleSelectChange("ContactIndustry", val)} />
                            <SingleSelect options={Array.isArray(fieldOptions?.ContactFunctionalArea) ? fieldOptions.ContactFunctionalArea : []} value={contactData.ContactFunctionalArea} label="Contact Functional Area" onChange={(val) => handleSelectChange("ContactFunctionalArea", val)} />
                            <SingleSelect options={Array.isArray(fieldOptions?.ReferenceId) ? fieldOptions.ReferenceId : []} value={contactData.ReferenceId} label="Reference Id" onChange={(val) => handleSelectChange("ReferenceId", val)} />
                            <TextareaField label="Notes" name="Notes" value={contactData.Notes} onChange={handleInputChange} />
                        </div>



                        <div className="flex justify-end mt-4">
                            
                            <SaveButton text="Update" onClick={handleSubmit} />

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}


