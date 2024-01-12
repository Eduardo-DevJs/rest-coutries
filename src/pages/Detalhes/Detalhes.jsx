import { Link, useParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Detalhes = () => {
  const { name } = useParams();
  const [paisDetalhe, setPaisDetalhe] = useState([]);

  useEffect(() => {
    async function detalhePais() {
      try {
        const response = await api.get(`/name/${name}`);
        setPaisDetalhe(response.data);
      } catch (error) {
        console.log('Erro ao buscar dados');
      }
    }

    detalhePais();
  }, [name]);

  function formatarNumeroComPonto(populacao) {
    // Converte o número para string
    const numeroComoString = populacao.toString();
    const numeroFormatado = numeroComoString.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );

    return numeroFormatado;
  }


  return (
    <div className="mt-12 max-w-7xl m-auto">
      <Link
        className="border flex items-center gap-3 px-2 shadow-md max-w-28 max-md:ml-3"
        to={'/'}
      >
        <FaLongArrowAltLeft size={40} />
        Voltar
      </Link>

      <div className="py-5 px-3 mt-10 max-md:mt-5">
        {paisDetalhe.map((pais, index) => (
          <div className='flex gap-10 max-md:flex-col' key={index}>
            <img className='max-w-2xl max-md:max-w-96' src={pais.flags.svg} alt={pais.flags.alt} />
              <div>
                <h1 className='font-semibold text-4xl mb-9'>{pais.name.common}</h1>
                <ul className='flex flex-col gap-2'>
                  <li className='text-xl'><strong>Nome nativo: </strong>{pais.name.common}</li>
                  <li className='text-xl'><strong>População: </strong>{formatarNumeroComPonto(pais.population)}</li>
                  <li className='text-xl'><strong>Região: </strong>{pais.region}</li>
                  <li className='text-xl'><strong>Sub Região: </strong>{pais.subregion}</li>
                  <li className='text-xl'><strong>Capital: </strong>{pais.capital}</li>
                </ul>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detalhes;
