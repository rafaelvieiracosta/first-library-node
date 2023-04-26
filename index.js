import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivos no diretório'));
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
  
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(extraiLinks(texto));
  }
  catch (erro) {
    trataErro(erro);
  }
}

/* 
  REGEX PARA BUSCAR LINKS EM .md
  parte1 - \[[^[\]]*?\] para pegar `[textoDoLink]`
  parte2 - \(https?:\/\/[^\s?#.].[^\s]*\) para pegar `(urlDoLink)`

  juntando as duas e separando por grupos
  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
*/
function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((e) => ({[e[1]]: e[2]}))

  return resultados;
}

/* 
  PROMISES COM THEN()
function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';

  fs.promises.readFile(caminhoDoArquivo, encoding)
  .then((texto) => { console.log(chalk.green(texto))})
  .catch((erro) => { trataErro(erro) });
} 
*/

/* 
  SINCRONO
function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';

  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if (erro) {
      trataErro(erro)
    }
    console.log(chalk.red(texto));
  });
} 
*/

pegaArquivo('./arquivos/texto.md');