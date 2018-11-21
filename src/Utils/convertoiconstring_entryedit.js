// Images and Icons
var minus = require('.././Images/Icons/minus.svg')
var checkboxBlankCircleOutline = require('.././Images/Icons/checkbox-blank-circle-outline.svg')
var checkboxBlankCircle = require('.././Images/Icons/checkbox-blank-circle.svg')
var checkboxBlankOutline = require('.././Images/Icons/checkbox-blank-outline.svg')
var checkboxBlankTriangleOutline = require('.././Images/Icons/checkbox-blank-triangle-outline.svg')
var checkboxBlankTriangle = require('.././Images/Icons/checkbox-blank-triangle.svg')
var checkboxBlank = require('.././Images/Icons/checkbox-blank.svg')
var checkboxMultipleBlankCircleOutline = require('.././Images/Icons/checkbox-multiple-blank-circle-outline.svg')
var checkboxMultipleBlankCircle = require('.././Images/Icons/checkbox-multiple-blank-circle.svg')
var checkboxMultipleBlankOutline = require('.././Images/Icons/checkbox-multiple-blank-outline.svg')
var checkboxMultipleBlankTriangleOutline = require('.././Images/Icons/checkbox-multiple-blank-triangle-outline.svg')
var checkboxMultipleBlankTriangle = require('.././Images/Icons/checkbox-multiple-blank-triangle.svg')
var checkboxMultipleBlank = require('.././Images/Icons/checkbox-multiple-blank.svg')
var flowerOutline = require('.././Images/Icons/flower-outline.svg')
var flower = require('.././Images/Icons/flower.svg')

export function convertToIconStringNoMult(i)
{
  if (i.type === 'event' && i.status === "0")
  {
      return "checkboxBlankCircleOutline"
  }

  if (i.type === 'event' && i.status === "1")
  {
      return "checkboxBlankCircle"
  }

  if (i.type === 'task' && i.status === "0")
  {
      return "checkboxBlankOutline"
  }

  if (i.type === 'task' && i.status === "1")
  {
      return "checkboxBlank"
  }

  if (i.type === 'appointment' && i.status === "0")
  {
      return "checkboxBlankTriangleOutline"
  }

  if (i.type === 'appointment' && i.status === "1")
  {
      return "checkboxBlankTriangle"
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
