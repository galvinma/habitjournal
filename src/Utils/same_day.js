// redux
import store from '.././Store/store'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

export function sameDay()
{
  store.dispatch(getSnackBarState({
    snack_bar_state: true
  }))

  store.dispatch(getSnackBarMessage({
    snack_bar_message: "Multi day item must have start and end on different days"
  }))
}
