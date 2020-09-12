const fs = require('fs');
const path = require('path');

const caminho = path.join(__dirname, 'files');

const data = fs.readFileSync(caminho + '/sped.txt', {}, exibirConteudo).toString();

function exibirConteudo(err, conteudo) {
  return conteudo;
}

const lines = data.split("\n");

function newFile(matriz) {
  const dados = matriz.join('\n'); // 
  fs.writeFileSync(caminho + "/newFile.txt", dados);
}

const newData = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].split('|');
  if (line[1] !== "C190") {
    newData.push(lines[i]);
  } else if (parseInt(line[3]) === 5125) {
    newData.push(lines[i]);
  } else if (parseInt(line[3]) < 5000) {
    newData.push(lines[i]);
  } else if (parseInt(line[7]) <= 0) {
    newData.push(line[i])
  } else {
    const valor = calculoICMS(line)
    newData.push(lines[i]); //insere o registro C190
    //insere o registro C195
    newData.push("|C195|6|ESTORNO DE CRÉDITO PARA EMPRESAS DO CRÉDITO PRESUMIDO|")
    //insere o registro C197
    newData.push(`|C197|MG50000100|ESTORNO DE CRÉDITO PARA AJUSTE DE APURAÇÃO|||||${valor}|`);
  }
}

function calculoICMS(data) {
  //calcula o valor que será estornado com base no crédito presumido
  const value = parseFloat(data[7]) - (parseFloat(data[5]) / 100);
  return value.toFixed(2).toString().replace(".", ",");
}

newFile(newData);