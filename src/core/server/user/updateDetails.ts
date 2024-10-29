import { db } from "@/core/prismaClient";
import { getSession } from "next-auth/react";

export default async function updateStudent({
    Name,
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
}: {
    Name: string,
    RollNumber: number,
    Branch: string,
    Year: number, // Assuming Year is an integer
    Email: string,
    WAContact: string,
    ParentsContact: number,
    Address: string,
    City: string,
    Father: string,
    Mother: string,
    EmergencyContact: string,
    LocalName: string,
    LocalContact: number,
}) {
    // Get the session
    const session = await getSession();

    // Check if session exists and email is available
    if (!session || !session.user?.email) {
        throw new Error("User not authenticated");
    }
    const currentYear = new Date().getFullYear();
    try {
        // Update student details
        const updatedStudent = await db.student.update({
            where: { Email: session.user.email },
            data: {
                Name,
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
                Messperstd: {
                    create: {
                        Year: currentYear, // Set the Messperstd Year to the current year
                        january: false,
                        february: false,
                        march: false,
                        april: false,
                        may: false,
                        june: false,
                        july: false,
                        august: false,
                        september: false,
                        october: false,
                        november: false,
                        december: false,
                    },
                },
            },
        });

        return { message: "Student details updated successfully", student: updatedStudent };
    } catch (error) {
        console.error("Error updating student details:", error);
        throw new Error("Failed to update student details");
    }
}
