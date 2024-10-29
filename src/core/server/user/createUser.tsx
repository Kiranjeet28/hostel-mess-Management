import { db } from "@/core/prismaClient";

export default async function createUserIfNot({
    Email,
    Name,
    Image,
}: {
    Email: string;
    Name: string;
    Image?: string | null;
}) {
    try {
        const dbuser = await db.student.findUnique({ where: { Email } });
        if (dbuser) return dbuser;

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Create the student with the required placeholder values
        const user = await db.student.create({
            data: {
                Name,
                Email,
                RollNumber: 1, // Placeholder value; replace with actual logic if necessary
                Branch: "not given",
                Year: currentYear, // Set to a specific year or derive from context
                WAContact: "not given",
                ParentsContact: 33, // Placeholder value; replace with actual logic if necessary
                Address: "not given",
                City: "not given",
                Father: "not given",
                Mother: "not given",
                EmergencyContact: "not given",
                LocalName: "not given",
                LocalContact: 0, // Placeholder value; replace with actual logic if necessary
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

        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}
