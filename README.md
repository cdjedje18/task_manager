# Task Manager

Esta é uma API construida usando a tecnologia node.js que tem como principal funcionalidade a gestão de tarefas.

### Principais funcionalidades
- Criar uma tarefa ou multiplas tarefas
- Listar tarefas usando diferentes parâmetros
- Remover uma ou multiplas tarefas
- Actualizar os dados da tarefa


## Instalação
Basta clonar o projecto no repositório e executar o comando:

```sh
npm install
```

Após a execução do comando acima terá todas as dependências instaladas e pode inicializar o servidor com o comando

```sh
npm start
```

Terá o servidor a correr no endereço:
```sh
127.0.0.1:8080
```


## API
De seguida são apresentados os recursos necessários para fazer uso da API

### Criação de tarefas
Para fazer a criação de uma tarefa basta usar o seguinte recurso
> POST
> /api/tasks

Exemplo do corpo da requisição:
```json
{
    "name": "Task 1",
    "description": "Demo description"
}
```

Este recurso permite a criação de várias tarefas em uma requisição, abaixo um exemplo do corpo da requisição para esta funcionalidade:

```json
{
    "tasks": [
        {
            "name": "Task 1",
            "description": "Demo description"
        },
        {
            "name": "Task 2",
            "description": "Demo description"
        },
        {
            "name": "Task 3",
            "description": "Demo description"
        }
    ]
}
```

### Lista de tarefas
Para listar as tarefas criadas basta fazer uso do seguinte endpoint:
> GET
> /api/tasks


| Parâmentro | Descrição |
| ------ | ------ |
| page | Número da página a ser visualizada|
| pageSize | Esta opção permite definir a quantidade de dados que deseja visualizar por página |
| paging | Esta opção define que se deseja os dados paginados ou não |
| fields | Através deste parâmentro é possível escolher os atributos que deseja visualizar |
| filters | Com este parâmentro é possível aplicar filtros na lista a ser visualizada |

Lista de taferas
> /api/tasks

Lista de taferas defenindo um tamanho de 100
> /api/tasks?pageSize=100

Lista de taferas defenindo um tamanho de 100 e visualizando dados da segunda página
> /api/tasks?pageSize=100&page=2

Lista de taferas usando apenas os atributos nome e descrição
> /api/tasks?fields=name,description

Lista de taferas usando apenas os atributos nome e descrição e aplicando filtro pela descrição
> /api/tasks?fields=name,description&filters=description:like:urgente

### Actualização de Tarefa
Pra efectuar actualizações das tarefas usamos o seguinte recurso:
> PUT
> /api/tasks/{task-id}

Exemplo
> PUT
> /api/tasks/yxu1Ba3BTfz

```json
{
    "name": "Task updated",
    "description": "Demo description"
}
```

##### _NB: Opção de actualização_
