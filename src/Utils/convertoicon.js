import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline,
          mdiMinus,
          mdiClose,
          mdiFlowerOutline,
        } from '@mdi/js'

export function convertToIcon(i)
{
  if (i.type === 'event' && i.status === "0")
  {
    return mdiCircleOutline
  }

  if (i.type === 'event' && i.status === "1")
  {
    return mdiCircle
  }

  if (i.type === 'task' && i.status === "0")
  {
    return mdiSquareOutline
  }

  if (i.type === 'task' && i.status === "1")
  {
    return mdiSquare
  }

  if (i.type === 'appointment' && i.status === "0")
  {
    return mdiTriangleOutline
  }

  if (i.type === 'appointment' && i.status === "1")
  {
    return mdiTriangle
  }

  if (i.type === 'note')
  {
    return mdiMinus
  }

  if (i.type === 'habit')
  {
    return mdiFlowerOutline
  }

  return null
}
