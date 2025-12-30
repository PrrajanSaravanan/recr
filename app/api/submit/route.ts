import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { fullName, role, phoneNumber, yearOfStudy, reason, experience } = body;

        if (!fullName || !role || !phoneNumber || !yearOfStudy || !reason || !experience) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Store in Firestore
        const docRef = await addDoc(collection(db, "applicants"), {
            fullName,
            role,
            phoneNumber,
            yearOfStudy,
            reason,
            experience,
            submittedAt: serverTimestamp(),
            status: "pending",
        });

        return NextResponse.json(
            { message: "Application submitted successfully", id: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 }
        );
    }
}
