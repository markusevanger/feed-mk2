import { CollectionConfig } from "payload";


export const Posts: CollectionConfig = {
    slug: 'posts',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'date',
            type: 'date',
        },

        {
            name: 'media',
            type: 'array',
            fields: [
                {
                    name: 'mediaItem',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ]
        }
    ],
}
