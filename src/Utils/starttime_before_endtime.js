// redux
import store from '.././Store/store'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

export function startTimeBeforeEndTime()
{
  store.dispatch(getSnackBarState({
    snack_bar_state: true
  }))

  store.dispatch(getSnackBarMessage({
    snack_bar_message: "Start time must be before end time"
  }))
}
