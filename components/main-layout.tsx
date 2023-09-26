import { Navbar } from "./navbar/navbar";
import { RightSection } from "./right-section/right-section";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="p-0 container h-full mx-auto max-w-6xl">
            <div className="h-full flex">
                <Navbar />
                <div className="border-x-[1px] border-slate-200 ml-16 md:ml-[240px] w-full flex-1">
                    {children}
                </div>
                <RightSection />
            </div>
        </div>
    );
};
