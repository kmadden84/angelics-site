
import { client } from "./client";

export async function fetchSocial() {
  // const entries = await client?.getContentType('socialLinaks')
  const entries = client?.getEntries({ content_type: 'socialLinaks' })
  if (entries) return entries;
  console.log(`Error getting Entries for ${contentType.name}.`)
}