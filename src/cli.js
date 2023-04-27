import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from "./index.js";

const caminho = process.argv;

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  
  try {
    fs.lstatSync(caminho);
  } catch(erro) {
    if(erro.code === 'ENOENT') {
      console.log(chalk.red('Arquivos ou diretório não existe'));
      return
    }
  }

  if(fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeLista(resultado);
  } 
  else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimeLista(lista, nomeDoArquivo);
    })
  }
}

function imprimeLista(resultado, identificador = "") {
  console.log(
    chalk.yellow('LINKS ENCONTRADOS'),
    chalk.black.bgGreen(identificador), 
    resultado
  );
}

processaTexto(caminho)