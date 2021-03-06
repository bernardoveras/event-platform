import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation, useGetSubscriberByEmailQuery } from "../graphql/generated";
import codeMockup from '../../src/assets/code-mockup.png'
import { toast } from "react-toastify";


export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '') {
      toast.error('Preencha todos os campos');
      return;
    }

    createSubscriber({
      variables: {
        name,
        email
      },
      onError() {
        toast.error('Ocorreu um erro inesperado, tente novamente.');
        return;
      },

      onCompleted(data) {
        console.log(data?.createSubscriber?.id);
        if (data?.createSubscriber?.id) {
          toast.success('Bem-vindo ao Ignite Lab!');

          navigate('/event');
        }
      },
    });
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border rounded border-gray-500">
          <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={event => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={event => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:bg-green700 overflow-hidden flex items-center justify-center"
            >
              {loading ?
                <BounceLoader
                  size={24}
                  color="white"
                />
                :
                'Garantir minha vaga'
              }
            </button>
          </form>
        </div>
      </div>

      <img src={codeMockup} className="mt-10" alt="" />
    </div>
  );
}