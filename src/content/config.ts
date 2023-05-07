import { defineCollection, z } from 'astro:content'

const productCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().optional(),
    image: z.string().optional(),
    buyUrl: z.string().url(),
  }),
})

export const collections = {
  products: productCollection,
}
