import { useMutation, useQuery } from "@tanstack/react-query";
import type { Room, Testimonial } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useRooms() {
  const { actor, isFetching } = useActor();
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRooms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      roomType: string;
      moveInDate: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const ts = BigInt(Date.parse(data.moveInDate));
      return actor.submitInquiry(data.name, data.phone, data.roomType, ts);
    },
  });
}
