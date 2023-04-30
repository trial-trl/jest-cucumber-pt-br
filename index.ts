import { loadFeature, defineFeature } from 'jest-cucumber';
import { DefineStepFunction } from 'jest-cucumber/dist/src/feature-definition-creation';
import { ParsedFeature } from 'jest-cucumber/dist/src/models';

export type DefinicaoDeEtapaCallbackOptions = {
  DefinirPasso: DefineStepFunction;
  Dado: DefineStepFunction;
  Dada: DefineStepFunction;
  Dados: DefineStepFunction;
  Dadas: DefineStepFunction;
  Quando: DefineStepFunction;
  Então: DefineStepFunction;
  E: DefineStepFunction;
  Mas: DefineStepFunction;
  Pendente: () => void;
};

type StepDefinitionCallback = (
  cenário: string,
  definiçãoDePassosCallback: (passos: DefinicaoDeEtapaCallbackOptions) => void,
  timeout?: number,
) => void;

function definirFuncionalidade(
  funcionalidadeDoArquivo: ParsedFeature,
  definiçõesDeCenárioCallback: (
    test: StepDefinitionCallback,
    contexto: (
      contexto: (passos: DefinicaoDeEtapaCallbackOptions) => void,
    ) => void,
  ) => void,
) {
  let contexto: (passos: DefinicaoDeEtapaCallbackOptions) => void;

  defineFeature(funcionalidadeDoArquivo, test => {
    definiçõesDeCenárioCallback(
      (
        cenário: string,
        definiçãoDePassosCallback: (
          passos: DefinicaoDeEtapaCallbackOptions,
        ) => void,
        timeout?: number,
      ) =>
        test(
          cenário,
          ({ given, when, then, and, but, defineStep, pending }) => {
            const apelidos = {
              Dado: given,
              Dada: given,
              Dados: given,
              Dadas: given,
              Quando: when,
              Então: then,
              E: and,
              Mas: but,
              DefinirPasso: defineStep,
              Pendente: pending,
            };

            if (contexto) {
              contexto(apelidos);
            }

            definiçãoDePassosCallback(apelidos);
          },
          timeout,
        ),
      callback => (contexto = callback),
    );
  });
}

const carregarFuncionalidade = loadFeature;

export { definirFuncionalidade, carregarFuncionalidade };
