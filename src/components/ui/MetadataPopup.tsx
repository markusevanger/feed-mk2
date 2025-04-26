import { Media } from '@/payload-types'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'
import { CalendarDays, Camera, Scan, LandPlot, Info } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'
import { DrawerTitle, DrawerContent, Drawer, DrawerHeader, DrawerTrigger } from './drawer'

interface MetadataPopupProps {
  media: Media
}

export function MetadataPopup({ media }: MetadataPopupProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  if (isMobile) return getDrawer({ media })
  return getDialogue({ media })
}

function getDrawer({ media }: MetadataPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-muted text-foreground text-mono">
          <Info className="h-4 w-4" />
          {media.exif?.dateTaken}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{getPopupTitle(media)}</DrawerTitle>
        </DrawerHeader>
        {getPopupContent(media)}
      </DrawerContent>
    </Drawer>
  )
}

function getDialogue({ media }: MetadataPopupProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-muted text-xs py-1 px-2 text-foreground cursor-pointer text-mono">
          {media.exif?.dateTaken}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getPopupTitle(media)}</DialogTitle>
        </DialogHeader>
        {getPopupContent(media)}
      </DialogContent>
    </Dialog>
  )
}
const getPopupTitle = (media: Media) => {
  return <h1>Metadata for {media.filename}</h1>
}

const getPopupContent = (media: Media) => {
  return (
    <div className="p-4">
      <ul className="flex flex-col gap-4 text-sm pb-32">
        <div>{metadataItem(<CalendarDays className="h-4 w-4" />, media.exif?.dateTaken)}</div>

        <div className="border-t border-border pt-4">
          <h2 className="flex items-center gap-2 mb-2 font-bold">Camera Details</h2>
          {metadataItem(<Camera className="h-4 w-4" />, media.exif?.camera)}
          {metadataItem(<Scan className="h-4 w-4" />, media.exif?.lens)}
          {metadataItem(<LandPlot className="h-4 w-4" />, 'ISO: ' + media.exif?.iso)}
        </div>

        {(media.exif?.location?.latitude || media.exif?.location?.longitude) && (
          <div className="border-t border-border pt-4">
            <h2 className="flex items-center gap-2 mb-2 font-bold">Location Details</h2>
            <p>Latitude: {media.exif?.location?.latitude}</p>
            <p>Longitude: {media.exif?.location?.longitude}</p>
          </div>
        )}
      </ul>
    </div>
  )
}

function metadataItem(icon: React.ReactNode, value: string | number | null | undefined) {
  if (!value) return null

  return (
    <li className="flex items-center gap-2">
      {icon}
      {value}
    </li>
  )
}
