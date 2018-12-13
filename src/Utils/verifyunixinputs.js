import moment from 'moment'

export function verifyUnixInputs(start, end) {
  if (start > end )
  {
    return false
  }
  else
  {
    return true
  }
}
