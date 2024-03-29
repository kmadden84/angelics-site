import { client } from "./client"

export async function fetchEntries(contentType) {
  const entries = await client?.getEntries({ order: '-sys.updatedAt', content_type: contentType })
  if (entries?.items) return entries?.items;
  console.log(`Error getting Entries for ${contentType.name}.`)
}

// export default fetchEntries;