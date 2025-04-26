import type { CollectionConfig } from 'payload'
import ExifReader from 'exifreader'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },

  upload: {
    withMetadata: true,
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },

    {
      name: 'videoOrientation',
      label: 'Video Orientation',
      admin: {
        description: 'Only applicable to videos (ignored for images)',
      },
      type: 'radio',
      options: ['Horizontal', 'Vertical'],
      defaultValue: 'vertical',
    },

    {
      name: 'exif',
      label: 'EXIF & other metadata',
      type: 'group',
      admin: {
        description: 'Fields are populated on save',
      },
      fields: [
        {
          name: 'hasExif',
          type: 'checkbox',
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'dateTaken',
          type: 'text',
        },
        {
          name: 'camera',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'lens',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'iso',
          label: 'ISO',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },

        {
          name: 'location',
          type: 'group',
          label: 'Location',
          fields: [
            {
              name: 'latitude',
              type: 'number',
            },
            {
              name: 'longitude',
              type: 'number',
            },
          ],
        },

        {
          name: 'flash',
          type: 'group',
          admin: {},
          fields: [
            {
              name: 'didFire',
              label: 'Flash fired',
              type: 'checkbox',
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.file && data && data.mimeType?.startsWith('image/')) {
          const exif = await ExifReader.load(req.file.data)

          console.log(exif)

          // Extract date and camera information
          if (exif.DateTimeOriginal?.description) {
            data.exif.dateTaken = exif.DateTimeOriginal.description
          }
          if (exif.Model?.description) {
            data.exif.camera = exif.Model.description
          }

          // Extract lens and exposure details
          if (exif.LensModel?.description) {
            data.exif.lens = exif.LensModel.description
          }
          if (exif.ISOSpeedRatings?.description) {
            data.exif.iso = exif.ISOSpeedRatings.description
          }

          // Extract flash information
          if (exif.Flash?.description) {
            data.exif.flash.description = exif.Flash.description
          }
          if (exif.Flash?.value && typeof exif.Flash.value === 'number') {
            data.exif.flash.didFire = (exif.Flash.value & 1) === 1
          }

          // Extract GPS coordinates
          if (exif.GPSLatitude?.description) {
            data.exif.location.latitude = exif.GPSLatitude.description
          }
          if (exif.GPSLongitude?.description) {
            data.exif.location.longitude = exif.GPSLongitude.description
          }

          data.exif.hasExif = true
        } else if (req.file && data && data.mimeType?.startsWith('video/')) {
        }
      },
    ],
  },
}
