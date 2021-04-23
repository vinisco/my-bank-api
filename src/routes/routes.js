import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const routes = express();
routes.post("/", async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    if (!account.name || !account.balance) {
      throw "Name e balance são obrigatórios";
    }

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);
  } catch (err) {
    next(err);
  }
});
routes.put("/deposit/:id", async (req, res) => {
  try {
    if (!req.body.value) {
      throw new Error("Value obrigatório!");
    }
    const id = parseInt(req.params.id);
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((account) => account.id === id);

    if (index === -1) {
      throw new Error("Conta não encontrada");
    }

    data.accounts[index].balance =
      data.accounts[index].balance + req.body.value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    res.send(err.message);
  }
});
routes.put("/withdraw/:id", async (req, res) => {
  try {
    if (!req.body.value) {
      throw new Error("Valor(value) obrigatório!");
    }
    const id = parseInt(req.params.id);
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((account) => account.id === id);

    if (index === -1) {
      throw new Error("Conta não encontrada");
    }

    if (data.accounts[index].balance - req.body.value < 0) {
      throw new Error("Saldo insuficiente para essa transação");
    }

    data.accounts[index].balance =
      data.accounts[index].balance - req.body.value;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    res.send(err.message);
  }
});
routes.get("/balance/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((account) => account.id === id);

    if (index === -1) {
      throw new Error("Conta não encontrada");
    }

    const balance = data.accounts[index].balance;

    res.send({ balance: balance });
  } catch (err) {
    res.send(err.message);
  }
});
routes.delete("/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((account) => account.id === id);

    if (index === -1) {
      throw new Error("Conta não encontrada");
    }

    data.accounts.splice(index, 1);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send({ message: "Conta deletada com sucesso" });
  } catch (err) {
    res.send(err.message);
  }
});

export { routes };
