import { DateValue } from "@heroui/react";

interface IRegency {
  id: string;
  name: string;
}

interface IEvent {
  banner?: string | FileList;
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  isFeatured?: boolean;
  isOnline?: boolean;
  isPublish?: boolean;
  startDate?: string;
  endDate?: string;
  location?: {
    region?: string;
    coordinates?: number[];
  };
}

interface IEventForm extends IEvent {
  region?: number;
  startDate?: DateValue;
  endDate?: DateValue;
  latitude?: string;
  longitude?: string;
}

export type { IRegency, IEvent, IEventForm };
