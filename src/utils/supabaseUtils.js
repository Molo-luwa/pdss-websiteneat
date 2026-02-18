import supabase from './supabase'


export const uploadImage = async (file, bucket = 'designs') => {
  if (!file) throw new Error('No file provided')

  const fileExt = file.name?.split('.')?.pop() || 'jpg'
  const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`
  const filePath = uniqueName

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (uploadError) throw uploadError

  const { data: publicData, error: publicError } = await supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  if (publicError) throw publicError

  return { publicUrl: publicData.publicUrl, path: filePath }
}


export const addDesign = async (designData) => {
  const payload = { ...designData }

  if (payload.imageFile) {
    const { publicUrl, path } = await uploadImage(payload.imageFile)
    payload.imageUrl = publicUrl
    
    payload.imagePath = path
    delete payload.imageFile
  }

  const { data, error } = await supabase
    .from('designs')
    .insert([payload])
    .select()

  if (error) throw error
  return data[0].id
}


export const updateDesign = async (designId, updateData) => {
  const { error } = await supabase
    .from('designs')
    .update(updateData)
    .eq('id', designId)

  if (error) throw error
}


export const deleteDesign = async (designId) => {
  const { error } = await supabase
    .from('designs')
    .delete()
    .eq('id', designId)

  if (error) throw error
}


export const getDesigns = async () => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error
  return data || []
}


export const getDesignsByCategory = async (category) => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('category', category)
    .order('id', { ascending: false })

  if (error) throw error
  return data || []
}


export const getDesignsByGender = async (gender) => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('gender', gender)
    .order('id', { ascending: false })

  if (error) throw error
  return data || []
}


export const getDesignsByFilter = async (category, gender) => {
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('category', category)
    .eq('gender', gender)
    .order('id', { ascending: false })

  if (error) throw error
  return data || []
}
