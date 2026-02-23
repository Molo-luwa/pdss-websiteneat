import supabase from './supabase'

// 1. Fetch all designs for the gallery
export const getDesigns = async () => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// 2. Add a new design (with image upload)
export const addDesign = async (designData) => {
  let finalImageUrl = designData.imageUrl

  // If a file was dragged in, upload it to the storage bucket
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

// 3. Update an existing design
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

// 4. Delete a design
export const deleteDesign = async (id) => {
  const { error } = await supabase
    .from('designs')
    .delete()
    .eq('id', id)

  if (error) throw error
}