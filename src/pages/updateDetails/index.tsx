import { useState } from "react";
import { useSession } from "next-auth/react";
import updateStudent from "@/core/server/user/updateDetails"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
export default function DetailsPage() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        RollNumber: "",
        Branch: "",
        Year: "",
        Password: "",
        WAContact: "",
        ParentsContact: "",
        Address: "",
        City: "",
        Father: "",
        Mother: "",
        EmergencyContact: "",
        LocalName: "",
        LocalContact: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            console.error("User not authenticated");
            return;
        }

        const updatedData = {
            ...formData,
            Name : session.Student.Name,
            RollNumber: Number(formData.RollNumber),
            Year: Number(formData.Year),
            ParentsContact: Number(formData.ParentsContact),
            LocalContact: Number(formData.LocalContact),
            Email: session.Student.Email, // Adding Email to the formData
        };

        try {
            const response = await updateStudent(updatedData);
            console.log("Update Successful:", response);
            // Optionally redirect or show success message
        } catch (error) {
            console.error("Failed to update student details:", error);
            // You might want to set some error state to display to the user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="Name">Name</Label>
            <Input name="RollNumber" value={formData.RollNumber} onChange={handleChange} placeholder="Roll Number" required />
            <Label htmlFor="Branch">Branch</Label>
            <Input name="Branch" value={formData.Branch} onChange={handleChange} placeholder="Branch" required />
            <Label htmlFor="Year">Year</Label>
            <Input name="Year" value={formData.Year} onChange={handleChange} placeholder="Year" required />
            <Label htmlFor="WAContact">Whatsapp No.</Label>
            <Input name="WAContact" value={formData.WAContact} onChange={handleChange} placeholder="WhatsApp Contact" required />
            <Label htmlFor="ParentsContact">Parents Contact</Label>
            <Input name="ParentsContact" value={formData.ParentsContact} onChange={handleChange} placeholder="Parent's Contact" required />
            <Label htmlFor="Address">Address</Label>
            <Input name="Address" value={formData.Address} onChange={handleChange} placeholder="Address" required />
            <Label htmlFor="City">City</Label>
            <Input name="City" value={formData.City} onChange={handleChange} placeholder="City" required />
            <Label htmlFor="Father">Father Name</Label>

            <Input name="Father" value={formData.Father} onChange={handleChange} placeholder="Father's Name" required />
            <Label htmlFor="Mother">Mother Name</Label>
            <Input name="Mother" value={formData.Mother} onChange={handleChange} placeholder="Mother's Name" required />
            <Label htmlFor="EmergencyContact">Emergency Contact</Label>
            <Input name="EmergencyContact" value={formData.EmergencyContact} onChange={handleChange} placeholder="Emergency Contact" required />
            <Label htmlFor="LocalName">Local Contact Name</Label>
            <Input name="LocalName" value={formData.LocalName} onChange={handleChange} placeholder="Local Contact Name" required />
            <Label htmlFor="LocalContact">Local Contact Number</Label>
            <Input name="LocalContact" value={formData.LocalContact} onChange={handleChange} placeholder="Local Contact Number" required />
            <Button  type="submit">Submit</Button>
        </form>
    );
}
