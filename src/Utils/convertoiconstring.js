// Images and Icons
export function convertToIconString(i)
{
  if (i.type === 'event' && i.status === "0")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlankCircleOutline"
    }
    else
    {
      return "checkboxMultipleBlankCircleOutline"
    }
  }

  if (i.type === 'event' && i.status === "1")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlankCircle"
    }
    else
    {
      return "checkboxMultipleBlankCircle"
    }
  }

  if (i.type === 'task' && i.status === "0")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlankOutline"
    }
    else
    {
      return "checkboxMultipleBlankOutline"
    }
  }

  if (i.type === 'task' && i.status === "1")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlank"
    }
    else
    {
      return "checkboxMultipleBlank"
    }
  }

  if (i.type === 'appointment' && i.status === "0")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlankTriangleOutline"
    }
    else
    {
      return "checkboxMultipleBlankTriangleOutline"
    }
  }

  if (i.type === 'appointment' && i.status === "1")
  {
    if (i.multi_day === false)
    {
      return "checkboxBlankTriangle"
    }
    else
    {
      return "checkboxMultipleBlankTriangle"
    }
  }

  if (i.type === 'note')
  {
    return "minus"
  }

  if (i.type === 'habit')
  {
    return "flowerOutline"
  }

  return null
}
