"use server";
import { defaultBackgroundColor, defaultPrimaryColor } from "@/constant";
import { db } from "@/database/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

/**
 * The function fetches data related to user engagement metrics from a database after verifying user
 * authentication.
 * @returns The `fetchFromStatts` function returns an object with the following properties:
 * - `success`: A boolean indicating whether the operation was successful.
 * - `views`: The total number of views across all forms.
 * - `totalResponses`: The total number of responses across all forms.
 * - `totalForms`: The total number of forms created by the user.
 * - `convertionRate`: The percentage of form responses converted to actual responses.
 * - `engagementRate`: The percentage of form views across all forms.
 */
export async function fetchFromStatts() {
    try {
        const session = await getKindeServerSession();
        const user = await session.getUser();
        if(!user) {
            return {
                success: false,
                message: "Unauthorized to use this resources",
                
            };
        }
        const {_sum, _count} = await db.form.aggregate({
            where: {
                userId: user.id
            },
                _sum: {
                    views: true,
                    responses: true
                },
                _count: {
                    id: true
                }
            
        });
        const views = _sum?.views || 0; 
        const totalResponses = _sum?.responses || 0;
        const totalForms = _count?.id || 0;
        const convertionRate = totalForms > 0 ? (totalResponses / totalForms) * 100 : 0;
        const engagementRate = totalForms > 0 ? (views / totalForms) * 100 : 0;
        return {
            success: true,
            views,
            totalResponses,
            totalForms,
            convertionRate,
            engagementRate
        }
        
    } catch (error) {
         return {
                success: false,
                message: error instanceof Error ? error.message : "Unauthorized to use this resources",
            };
    }
}

// Create form 

export async function createForm(data: { name: string; description:string}) {
    try {
        const session = await getKindeServerSession();
        const user = await session.getUser();
        if(!user) {
            return {
                success: false,
                message: "Unauthorized to use this resources",
                
            };
        }

        const formSettings = await db.formSettings.create({
            data: {
                primaryColor:defaultPrimaryColor,
                backgroundColor: defaultBackgroundColor,
                
            }
        });

        // create form
        const form = await db.form.create({
            data: {
                name: data.name,
                description: data.description,
                userId: user.id,
                creatorName: user?.given_name || "",
                settingsId: formSettings.id
            }
        });
        if(!form)   {
            return {
                success: false,
                message: "Something went wrong while creating your form. Please try again.",
                
            };
        }
        return {
            success: true,
            message: "Form created successfully",
            form
        }
       
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unauthorized to use this resources",
        };
    }
}