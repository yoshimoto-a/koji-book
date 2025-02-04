export const supabaseImageUrl = (ImageKey: string | null) =>
  ImageKey
    ? `https://lhiahzuspsaubdpkugvb.supabase.co/storage/v1/object/public/recipe_image/${ImageKey}`
    : null;
