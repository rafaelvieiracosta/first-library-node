import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';
  
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
    imprimeLista(valida, resultado);
  } 
  else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDoArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
      imprimeLista(valida, lista, nomeDoArquivo);
    })
  }
}

 async function imprimeLista(valida, resultado, identificador = "") {
  if(valida) {
    console.log(
      chalk.yellow('LINKS VALIDADOS'),
      chalk.black.bgGreen(identificador), 
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow('LINKS ENCONTRADOS'),
      chalk.black.bgGreen(identificador), 
      resultado
    );
  }
}

processaTexto(caminho)