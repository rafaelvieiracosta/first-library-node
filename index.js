import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivos no diretório'));
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
  
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(chalk.green(texto));
  }
  catch (erro) {
    trataErro(erro);
  }
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

pegaArquivo('./arquivos/tedxto.md');