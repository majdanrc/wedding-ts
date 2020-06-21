import { relation } from "./relations";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    var result = [...previouslySelectedServices];
    var prerequisites = relation[action.service];
    switch (action.type) {
        case "Select":
            if (result.includes(action.service)) {
                return result;
            }

            var prerequisites = relation[action.service];
            var prerequisitesMet = prerequisites.length == 0 || result.some(p => prerequisites.includes(p));

            return prerequisitesMet ? [...result, action.service] : result;
        case "Deselect":
            if (!result.includes(action.service)) {
                return result;
            }

            result = result.filter(a => a !== action.service);
            result = result.filter(i => relation[i].length == 0 || result.some(p => relation[i].includes(p)))

            return result;
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => ({ basePrice: 0, finalPrice: 0 });
