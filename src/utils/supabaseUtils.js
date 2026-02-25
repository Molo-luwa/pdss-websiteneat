import supabase from './supabase'

export const getDesigns = async () => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const addDesign = async (designData) => {
  let finalImageUrl = designData.imageUrl

  if (designData.imageFile) {
    const file = designData.imageFile
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('design-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('design-images')
      .getPublicUrl(filePath)

    finalImageUrl = urlData.publicUrl
  }

  const { data, error } = await supabase
    .from('designs')
    .insert([
      {
        name: designData.name,
        category: designData.category,
        gender: designData.gender,
        imageUrl: finalImageUrl,
        altText: designData.altText
      },
    ])
    .select()

  if (error) throw error
  return data[0].id
}

export const updateDesign = async (id, updateData) => {
  const { data, error } = await supabase
    .from('designs')
    .update({
      name: updateData.name,
      category: updateData.category,
      gender: updateData.gender,
      imageUrl: updateData.imageUrl,
      altText: updateData.altText
    })
    .eq('id', id)

  if (error) throw error
  return data
}

export const deleteDesign = async (id) => {
  const { data: design, error: fetchError } = await supabase
    .from('designs')
    .select('imageUrl')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  if (design?.imageUrl) {
    const url = design.imageUrl;
    const bucketName = 'design-images';

    const baseUrl = url.split('?')[0];
    const publicUrlPrefix = `/public/${bucketName}/`;
    const index = baseUrl.indexOf(publicUrlPrefix);

    if (index !== -1) {
      const filePath = baseUrl.substring(index + publicUrlPrefix.length);

      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (storageError) {
        console.error('Failed to delete image from storage:', storageError);
      }
    } else {
      console.warn('Could not extract file path from imageUrl:', url);
    }
  }

  const { error: deleteError } = await supabase
    .from('designs')
    .delete()
    .eq('id', id);

  if (deleteError) throw deleteError;
};