import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_API;


export const client = createClient({
  space: space,
  accessToken: accessToken
});



