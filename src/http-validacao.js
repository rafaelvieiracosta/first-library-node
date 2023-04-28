import chalk from "chalk";

export default async function listaValidada(listaDeLinks) {
  const links = extrairLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, i) => {
    return {
      ...objeto,
      status: status[i]
    }
  });
}

function extrairLinks(arrLinks) {
  const arrayFormatada = arrLinks.map((e) => {
    return Object.values(e).join();
  });
  return arrayFormatada;
}

async function checaStatus(listaURLs) {
  const arrStatus = await Promise.all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  )
  return arrStatus;
}

function manejaErros(erro) {
  if (erro.code === 'ENOTFOUND') {
    return 'Link não encontrado';
  } else {
    return 'Ocorreu algum erro';
  }
}