import { useState } from "react";
import { useSession } from "next-auth/react";
import updateStudent from "@/core/server/user/updateDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DetailsPage() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        RollNumber: 0,
        Branch: "",
        Year: 0,
        WAContact: "", // Changed to string
        ParentsContact: 0,
        Address: "",
        City: "",
        Father: "",
        Mother: "",
        EmergencyContact: "",
        LocalName: "",
        LocalContact: 0,
    });

    const [error, setError] = useState<string | null>(null); // Error state for handling submit errors
    const [success, setSuccess] = useState<boolean>(false); // State for tracking successful update

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
            Name: session.user?.name || "", // Provide a default value
            Email: session.user?.email || "", // Provide a default value
        };

        try {
            const response = await updateStudent(updatedData);
            console.log("Update Successful:", response);
            setSuccess(true);
            setError(null); // Reset error on success
        } catch (error) {
            console.error("Failed to update student details:", error);
            setError("Failed to update details. Please try again."); // Set error message
            setSuccess(false); // Reset success state on error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="Name">Name</Label>
            <Input
                id="Name"
                name="Name"
                value={session?.user?.name || ""}
                readOnly // Make the Name input read-only
            />
            <Label htmlFor="RollNumber">Roll Number</Label>
            <Input
                id="RollNumber"
                name="RollNumber"
                value={formData.RollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                required
            />
            <Label htmlFor="Branch">Branch</Label>
            <Input
                id="Branch"
                name="Branch"
                value={formData.Branch}
                onChange={handleChange}
                placeholder="Branch"
                required
            />
            <Label htmlFor="Year">Year</Label>
            <Input
                id="Year"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                placeholder="Year"
                required
            />
            <Label htmlFor="WAContact">Whatsapp No.</Label>
            <Input
                id="WAContact"
                name="WAContact"
                value={formData.WAContact}
                onChange={handleChange}
                placeholder="WhatsApp Contact"
                required
            />
            <Label htmlFor="ParentsContact">Parents Contact</Label>
            <Input
                id="ParentsContact"
                name="ParentsContact"
                value={formData.ParentsContact}
                onChange={handleChange}
                placeholder="Parent's Contact"
                required
            />
            <Label htmlFor="Address">Address</Label>
            <Input
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="Address"
                required
            />
            <Label htmlFor="City">City</Label>
            <Input
                id="City"
                name="City"
                value={formData.City}
                onChange={handleChange}
                placeholder="City"
                required
            />
            <Label htmlFor="Father">Father Name</Label>
            <Input
                id="Father"
                name="Father"
                value={formData.Father}
                onChange={handleChange}
                placeholder="Father's Name"
                required
            />
            <Label htmlFor="Mother">Mother Name</Label>
            <Input
                id="Mother"
                name="Mother"
                value={formData.Mother}
                onChange={handleChange}
                placeholder="Mother's Name"
                required
            />
            <Label htmlFor="EmergencyContact">Emergency Contact</Label>
            <Input
                id="EmergencyContact"
                name="EmergencyContact"
                value={formData.EmergencyContact}
                onChange={handleChange}
                placeholder="Emergency Contact"
                required
            />
            <Label htmlFor="LocalName">Local Contact Name</Label>
            <Input
                id="LocalName"
                name="LocalName"
                value={formData.LocalName}
                onChange={handleChange}
                placeholder="Local Contact Name"
                required
            />
            <Label htmlFor="LocalContact">Local Contact Number</Label>
            <Input
                id="LocalContact"
                name="LocalContact"
                value={formData.LocalContact}
                onChange={handleChange}
                placeholder="Local Contact Number"
                required
            />
            <Button type="submit">Submit</Button>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {success && <p style={{ color: 'green' }}>Update Successful!</p>} {/* Display success message */}
        </form>
    );
}
