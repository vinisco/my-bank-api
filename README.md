# Trabalho prático API

## Descrição

#### 1. Crie um endpoint para criar uma “account”. Este endpoint deverá receber como parâmetros os campos “name” e “balance” conforme descritos acima. O “balance” recebido neste endpoint corresponderá ao saldo inicial da conta. Esta “account” deverá ser salva em um arquivo no formato json chamado “accounts.json”, e deverá ter um “id” único associado. A API deverá garantir o incremento automático deste identificador, de forma que ele não se repita entre os registros.

#### 2. Crie um endpoint para registrar um depósito em uma conta. Este endpoint deverá receber como parâmetros o id da conta e o valor do depósito. Ele deverá atualizar o “balance” da conta,incrementando-o com o valor recebido como parâmetro e realizar a atualização no “accounts.json”. O endpoint deverá validar se a conta informada existe, caso não exista deverá retornar um erro.

#### 3. Crie um endpoint para registrar um saque em uma conta. Este endpoint deverá receber como parâmetros o id da conta e o valor do saque. Ele deverá atualizar o “balance” da conta, decrementando-o com o valor recebido com parâmetro e realizar a atualização no “accounts.json”. O endpoint deverá validar se a conta informada existe. Caso não exista, deverá retornar um erro. Também deverá validar se a conta possui saldo suficiente para aquele saque, se não tiver deverá retornar um erro, não permitindo assim que o saque fique negativo.

#### 4. Crie um endpoint para consultar o saldo da conta. Este endpoint deverá receber como parâmetro o id da conta e deverá retornar seu “balance”. Caso a conta informada não exista, retornar um erro.

#### 5. Crie um endpoint para excluir uma conta. Este endpoint deverá receber como parâmetro o id da conta e realizar sua exclusão do arquivo “accounts.json”.

#### Começando

Para executar o projeto, será necessário:

- [Yarn: para usar como gerenciador de pacotes pro projeto](https://yarnpkg.com/lang/en/docs/install/)

## Instalando

Para iniciar a instalação é necessário clonar o projeto do GitHub num diretório de sua preferência:

```shell
cd "diretorio de sua preferencia"
git clone https://github.com/vinisco/my-bank-api
```

Depois utilizar o yarn install dentro do diretório para instalar as dependencias:

```shell
yarn install
```

## Executando

```shell
yarn start
```

## Testar os endPoints e consumir a API

## 1. Criar usuário e saldo da conta

POST http://localhost:3000/

```json
{
  "name": "Usuário da conta",
  "balance": 1233
}
```

## 2. Depositar valor na conta

PUT http://localhost:3000/deposit/:accountId

```json
{
  "value": 1233
}
```

## 3. Sacar valor na conta

PUT http://localhost:3000/withdraw/:accountId

```json
{
  "value": 1233
}
```

## 4. Visualizar saldo da conta

GET http://localhost:3000/balance/:accountId

## 5. Deletar conta

DELETE http://localhost:3000/delete/:accountId
