// redux
import store from '.././Store/store'
import { getSnackBarState, getSnackBarMessage } from '.././Actions/actions'

export function startDateBeforeEndDate()
{
  store.dispatch(getSnackBarState({
    snack_bar_state: true
  }))

  store.dispatch(getSnackBarMessage({
    snack_bar_message: "Start date must be before end date"
  }))
}
