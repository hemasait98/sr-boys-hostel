import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Room {
    id: string;
    features: Array<string>;
    name: string;
    isAvailable: boolean;
    price: bigint;
}
export interface Inquiry {
    id: string;
    name: string;
    createdAt: bigint;
    phone: string;
    moveInDate: bigint;
    roomType: string;
}
export interface Testimonial {
    id: string;
    review: string;
    studentName: string;
    rating: bigint;
    course: string;
}
export interface backendInterface {
    getInquiries(): Promise<Array<Inquiry>>;
    getRooms(): Promise<Array<Room>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    submitInquiry(name: string, phone: string, roomType: string, moveInDate: bigint): Promise<string>;
}
