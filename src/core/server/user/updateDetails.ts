import { db } from "@/core/prismaClient";
import { getSession } from "next-auth/react";

export default async function updateStudent({
    RollNumber,
    Branch,
    Year,
    WAContact,
    ParentsContact,
    Address,
    City,
    Father,
    Mother,
    Email,
    EmergencyContact,
    LocalName,
    LocalContact,
}: {
    RollNumber: number;
    Branch: string;
    Year: number; // Assuming Year is an integer
    Email: string;
    WAContact: string; // Changed to string
    ParentsContact: number;
    Address: string;
    City: string;
    Father: string;
    Mother: string;
    EmergencyContact: string;
    LocalName: string;
    LocalContact: number;
}) {
    // Get the session
    const session = await getSession();

    // Check if session exists and email is available
    if (!session || !session.user?.email) {
        throw new Error("User not authenticated");
    }

    try {
        // Update student details
        const updatedStudent = await db.student.update({
            where: { Email: session.user.email }, // Assuming you're updating by email
            data: {
                RollNumber,
                Branch,
                Year,
                WAContact,
                ParentsContact,
                Address,
                City,
                Father,
                Mother,
                EmergencyContact,
                LocalName,
                LocalContact,
                // Add additional fields if required
            },
        });

        return { message: "Student details updated successfully", student: updatedStudent };
    } catch (error) {
        console.error("Error updating student details:", error);
        throw new Error("Failed to update student details");
    }
}
