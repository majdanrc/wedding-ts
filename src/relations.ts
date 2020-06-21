import { ServiceType } from ".";

type ServiceRelations = Record<ServiceType, ServiceType[]>;

export const relation: ServiceRelations = {
    Photography: [],
    VideoRecording: [],
    BlurayPackage: ["VideoRecording"],
    TwoDayEvent: ["Photography", "VideoRecording"],
    WeddingSession: []
}
