import { IDescriptionPattern } from "../../interface/d_01";
import { ReportMethodActivity } from "@/components/ReportMethodActivity";

interface DescriptionPatternProps {
    description_pattern: IDescriptionPattern;
    id: number;
    method_name: string;
    report_status: boolean;
    report_messages: string[];
}

export const DescriptionPattern = ({
    description_pattern,
    id,
    method_name,
    report_status,
    report_messages,
}: DescriptionPatternProps) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {description_pattern.descriptionPatterns.map((pattern, index) => (
                    <Item key={index} title={`Pattern ${index + 1}`} value={pattern} />
                ))}
            </div>
            <ReportMethodActivity
                method_name={method_name}
                zone={'Description Pattern'}
                method_id={id}
                report_messages={report_messages}
                report_status={report_status}
            />
        </div>
    );
};

interface Props {
    title: string;
    value: string;
}

export const Item = ({ title, value }: Props) => {
    return (
        <div>
            <p className="text-sm font-semibold text-gray-500">{title}</p>
            <span className="text-sm font-semibold text-gray-800">
                {value || '---'}
            </span>
        </div>
    );
};
