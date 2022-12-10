import { client } from "./client"

export function fetchEntry(entryId) {
  try {
    return client.getEntry(entryId);
  } catch (err) {
    console.error(err)
  }
}

// export default fetchEntries;