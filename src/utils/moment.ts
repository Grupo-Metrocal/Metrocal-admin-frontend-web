import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export const momentDate = (date: string) => {
  return moment(date, 'YYYYMMDD').fromNow()
}
