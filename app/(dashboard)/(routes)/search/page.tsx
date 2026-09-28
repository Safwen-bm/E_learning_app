import { Suspense } from "react";
import { db } from "@/lib/db"; 
import { SearchInput } from "@/components/search-input"; 
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
import { getCourses } from "@/actions/get-courses"; 
import { CoursesList } from "@/components/courses-list"; 
import { Categories } from "./_components/categories"; 
 
interface SearchPageProps { 
    searchParams: Promise<{ 
        title?: string; 
        categoryId?: string; 
    }>; 
} 
 
const SearchPage = async ({ searchParams }: SearchPageProps) => { 
    const { userId } = await auth(); 
 
    if (!userId) { 
        return redirect("/"); 
    } 
 
    const resolvedSearchParams = await searchParams; 
 
    const categories = await db.category.findMany({ 
        orderBy: { name: "asc" } 
    }); 
 
    const courses = await getCourses({ 
        userId, 
        ...resolvedSearchParams, 
    }); 
 
    return ( 
        <div className="space-y-8"> 
            {/* Mobile search */} 
            <div className="px-6 pt-6 md:hidden"> 
                <Suspense fallback={null}>
                    <SearchInput /> 
                </Suspense>
            </div> 
 
            {/* Main content */} 
            <div className="px-6 md:px-12"> 
                <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1> 
                <p className="text-muted-foreground mt-2">Discover courses across all categories</p> 
 
                <div className="mt-8"> 
                    <Suspense fallback={null}>
                        <Categories items={categories} /> 
                    </Suspense>
                </div> 
 
                <div className="mt-10"> 
                    <CoursesList items={courses} /> 
                </div> 
            </div> 
        </div> 
    ); 
} 
 
export default SearchPage;