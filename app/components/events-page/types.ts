export interface CafeEvent {
  id: number;

  category_en: string;
  category_de: string;

  frametype_en: string | null;
  frametype_de: string | null;

  title_en: string | null;
  title_de: string | null;

  subtitle_en: string | null;
  subtitle_de: string | null;

  content_en: string | null;
  content_de: string | null;

  event_date: string | null;
  door_hours: string | null;
  salon_venue: string | null;

  image_url: string;
}
