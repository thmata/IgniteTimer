import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duranção</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa tal</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa tal</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa tal</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa tal</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa tal</td>
              <td>20 minutos</td>
              <td>Há cerca 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
