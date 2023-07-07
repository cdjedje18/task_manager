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
