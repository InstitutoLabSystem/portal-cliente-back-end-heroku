const date = new Date()
const dataHora = date.toISOString().split('T')
const data = dataHora[0] + 'T'
const hora = dataHora[1].split(':')[0] - 3
const minutos = dataHora[1].split(':')[1]
const segundo = dataHora[1].split(':')[2]
const horario = hora + ':' + minutos + ':' + segundo
const dateTime = {
  time: date.getHours() - 3 + ':' + date.getMinutes() + ':' + date.getSeconds(),
  date_time: data + horario,
}
module.exports = dateTime
