import { Navbar } from "./navbar/navbar";
import { RightSection } from "./right-section/right-section";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="h-screen container px-0 mx-auto max-w-6xl">
            <div className="flex h-full">
                <Navbar />

                <div className="flex-1">
                    {children}
                </div>

                <RightSection />
            </div>
        </div>
    );
};
