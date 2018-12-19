// redux
import store from '.././Store/store'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

export function missingTitle()
{
  store.dispatch(getSnackBarState({
    snack_bar_state: true
  }))

  store.dispatch(getSnackBarMessage({
    snack_bar_message: "Entry must have a description"
  }))
}
