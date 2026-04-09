import CrudPage from '../components/CrudPage.jsx';

const fields = [
  { name: 'titulo', label: 'Título', required: true, placeholder: 'Ex: Lista cap. 3' },
  { name: 'concluida', label: 'Concluída?', type: 'checkbox', checkLabel: 'Marcar como concluída' },

];

const columns = [
  { key: 'titulo', label: 'Título' },
  {
    key: 'concluida', label: 'Status',
    render: (item) => item.concluida
      ? <span className="badge badge-green">✅ Concluída</span>
      : <span className="badge badge-red">⏳ Pendente</span>
  },
  {
    key: 'aluno', label: 'Aluno',
    render: (item) => item.aluno?.nome || (item.aluno ? '(sem nome)' : '—')
  },
];

export default function Tarefas() {
  return (
    <CrudPage
      title="Tarefas"
      icon="✅"
      endpoint="/tarefa"
      fields={fields}
      columns={columns}
      emptyMessage="Nenhuma tarefa cadastrada ainda."
    />
  );
}
