interface RightSectionProps {
}

export const RightSection = ({
}: RightSectionProps) => {
    return (
        <div className="hidden p-2 md:flex flex-col">
            <div className="w-fit md:w-[240px] space-y-4">
                <p>RightSection</p>
                <p>RightSection</p>
                <p>RightSection</p>
            </div>
        </div>
    );
}
