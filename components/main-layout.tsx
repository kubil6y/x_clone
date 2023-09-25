import { Navbar } from "./navbar/navbar";
import { RightSection } from "./right-section/right-section";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="h-screen">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Navbar />
                    <div className="col-span-3 lg:col-span-2 border-x-[1px] border-slate-200">
                        {children}
                    </div>
                    <RightSection />
                </div>
            </div>
        </div>
    );
};
