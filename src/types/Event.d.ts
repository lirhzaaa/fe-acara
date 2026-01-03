interface IRegency {
  id: string
  name: string
}

interface IEvent {
  banner: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  isFeatured: boolean;
  isPublish: boolean;
  startDate: string;
  endDate: string;
  location: {
    region: string;
    coordinate: {
      x: number;
      y: number;
    };
  };
}

export type { IRegency, IEvent };