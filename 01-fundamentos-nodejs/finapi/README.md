# FinApi - Financeira

API financeira que possui funcionalidades de: fazer saques e depósitos, fazer login, cadastrar, visualizar informações do usuário e deleter a conta.

## :rocket: Techs

<ul>
  <li> Javascript </li>
  <li> Node.js </li>
  <li> Express </li>
  <li> uuid </li>
</ul>

## Desenvolvimento

---

### Pré-requisitos

- Instalar [Node.js](https://nodejs.org)

- Instalar [Yarn](https://yarnpkg.com/)

### Clone o repositório

```bash
$ git clone https://github.com/vitorgaletti/rocketseat-ignite-nodejs.git
```

### Executar Projeto

```bash
# Mudar para directório
$ cd 01-fundamentos-nodejs/finapi/
```

- Instalar dependências

```bash
$ yarn install
```

- Execute

```bash
$ yarn dev
```

- Executar scripts

|        Ação        | Utilização |
| :----------------: | :--------: |
| Iniciar o servidor | `yarn dev` |

URL da API = http://localhost:3333

### ✅️ Requisitos

- ✔️ Deve ser possível criar uma conta
- ✔️ Deve ser possível buscar o extrato bancário do cliente
- ✔️ Deve ser possível realizar um depósito
- ✔️ Deve ser possível realizar um saque
- ✔️ Deve ser possível buscar o extrato bancário do cliente por data
- ✔️ Deve ser possível atualizar os dados da conta do cliente
- ✔️ Deve ser possível obter dados da conta do cliente
- ✔️ Deve ser possível deletar uma conta
- ✔️ Deve ser possível retornar o balanço

---

### 🛠️ Regras de Negócio

- ❌️ Não deve ser possível cadastrar uma conta com CPF ja existente
- ❌️ Não deve ser possível fazer depósito em uma conta não existente
- ❌️ Não deve ser possível buscar extrato em uma conta não existente
- ❌️ Não deve ser possível fazer saque em uma conta não existente
- ❌️ Não deve ser possível excluir uma conta não existente
- ❌️ Não deve ser possível fazer o saque quando o saldo for insuficiente

<br>

## API Reference

#### Criar uma conta

```http
POST /account
```

| Request Field | Type     | Parameter | Description |
| :------------ | :------- | :-------- | :---------- |
| `cpf`         | `string` |           |             |
| `name`        | `string` |           |             |

| Status code | Description                           |
| :---------- | :------------------------------------ |
| `201`       | Conta criada com sucesso              |
| `400`       | Usuário já possui uma conta existente |

```json
{
  "cpf": "123456789",
  "name": "Vitor"
}
```

#### Visualizar transações

```http
GET /statement
```

| Header Field | Type     | Parameter | Description                         |
| :----------- | :------- | :-------- | :---------------------------------- |
| `cpf`        | `string` |           | Informar o cpf cadastrado no header |

| Response Field | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `description`  | `string` | Descrição da transferência              |
| `amount`       | `number` | Quantia da transferência                |
| `created_at`   | `string` | Data que foi feito a transferência      |
| `type`         | `string` | Tipo de transferência débito ou crédito |

| Status code | Description                                     |
| :---------- | :---------------------------------------------- |
| `200`       | Visualizar todas as transações do cpf informado |
| `400`       | Usuário não encontrado                          |

```json
{
 [
	{
		"description": "Trânsferência Vitor",
		"amount": 3600,
		"created_at": "2022-06-15T19:54:18.533Z",
		"type": "credit"
	}
  ]
}
```

#### Depositar

```http
POST /deposit
```

| Request Field | Type     | Parameter | Description           |
| :------------ | :------- | :-------- | :-------------------- |
| `description` | `string` |           | Descrição do depósito |
| `amount`      | `number` |           | Quantia do depósito   |

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Status code | Description            |
| :---------- | :--------------------- |
| `201`       | Depositada com sucesso |
| `400`       | Usuário não encontrado |

```json
{
  "description": "Trânsferência Vitor",
  "amount": 3600.0
}
```

#### Sacar um valor

```http
POST /withdraw
```

| Request Field | Type     | Parameter | Description             |
| :------------ | :------- | :-------- | :---------------------- |
| `amount`      | `number` |           | Quantia para ser sacada |

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Status code | Description                |
| :---------- | :------------------------- |
| `201`       | Quantia sacada com sucesso |
| `400`       | Usuário não encontrado     |
| `400`       | Fundos insuficientes       |

```json
{
  "amount": 100.0
}
```

#### Alterar o nome da conta

```http
PUT /account
```

| Request Field | Type     | Parameter | Description                   |
| :------------ | :------- | :-------- | :---------------------------- |
| `name`        | `string` |           | Nome para substituir da conta |

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Status code | Description               |
| :---------- | :------------------------ |
| `201`       | Nome alterado com sucesso |
| `400`       | Usuário não encontrado    |

```json
{
  "name": "Vitor"
}
```

#### Visualizar dados da conta

```http
GET /account
```

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Response Field | Type     | Description                                              |
| :------------- | :------- | :------------------------------------------------------- |
| `id`           | `number` | Identificador da conta                                   |
| `cpf`          | `string` | CPF do usuário                                           |
| `name`         | `string` | Nome do usuário                                          |
| `statement`    | `array`  | Conjunto contendo toda as informações das transferências |

| Status code | Description                          |
| :---------- | :----------------------------------- |
| `200`       | Exibido toda as informações da conta |
| `400`       | Usuário não encontrado               |

```json
{
  "id": "534fa77c-463e-4dc1-b7a8-47056866cbf6",
  "cpf": "123456789",
  "name": "Vitor",
  "statement": [
    {
      "description": "Trânsferência Vitor",
      "amount": 3600,
      "created_at": "2022-06-15T20:39:05.639Z",
      "type": "credit"
    },
    {
      "description": "Trânsferência Vitor",
      "amount": 3600,
      "created_at": "2022-06-15T20:47:21.761Z",
      "type": "credit"
    },
    {
      "amount": 100,
      "created_at": "2022-06-15T20:48:03.477Z",
      "type": "debit"
    }
  ]
}
```

#### Excluir uma conta

```http
DELETE /account
```

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Status code | Description                |
| :---------- | :------------------------- |
| `200`       | Conta excluida com sucesso |
| `400`       | Usuário não encontrado     |

#### Saldo da conta

```http
GET /balance
```

| Header Field | Type     | Description                         |
| :----------- | :------- | :---------------------------------- |
| `cpf`        | `string` | Informar o cpf cadastrado no header |

| Status code | Description            |
| :---------- | :--------------------- |
| `200`       | Exibido o saldo        |
| `400`       | Usuário não encontrado |

## Autor

- [@vitorgaletti](https://github.com/vitorgaletti)
